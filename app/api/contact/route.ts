import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";
import { corsHeaders } from "@/lib/cors";
import { SERVER_ENV } from "@/lib/server-env";
import { resend } from "@/lib/resend";
import { rateLimitGuard, parseJsonBody, isHoneypotTripped, missingEmailConfig } from "@/lib/api-handler";

// Generous for name/email/phone/subject + a 2000-character message.
const MAX_BODY_BYTES = 20_000;

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function POST(request: Request) {
  const rateLimited = rateLimitGuard(request, "contact");
  if (rateLimited) return rateLimited;

  const parsedBody = await parseJsonBody(request, MAX_BODY_BYTES);
  if (parsedBody.response) return parsedBody.response;
  const { body } = parsedBody;

  if (isHoneypotTripped(body)) {
    return NextResponse.json({ ok: true }, { headers: corsHeaders() });
  }

  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.flatten() },
      { status: 400, headers: corsHeaders() },
    );
  }

  const { name, email, phone, subject, message } = parsed.data;
  // Strip line breaks before these reach an email subject line — defense-in-depth
  // against header injection.
  const safeName = name.replace(/[\r\n]+/g, " ").trim();
  const safeSubject = (subject ?? "").replace(/[\r\n]+/g, " ").trim();
  const safePhone = (phone ?? "").replace(/[\r\n]+/g, " ").trim();
  const toEmail = SERVER_ENV.EMAIL_CONFIG.CONTACT_TO_EMAIL;

  if (!resend || !toEmail) {
    if (SERVER_ENV.IS_PRODUCTION) {
      const missing = missingEmailConfig();
      console.error(`[contact] Missing required config in production: ${missing.join(", ")}`);
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "EMAIL_NOT_CONFIGURED",
            message: "Something went wrong. Please try again later.",
          },
        },
        { status: 500, headers: corsHeaders() },
      );
    }

    // Dev-only shortcut: without an API key/destination configured, log the
    // submission instead of failing — lets the API work locally.
    console.info("[contact] RESEND_API_KEY/CONTACT_TO_EMAIL not set — submission logged only:", {
      name: safeName,
      email,
      phone,
      subject: safeSubject,
      message,
    });
    return NextResponse.json({ ok: true }, { headers: corsHeaders() });
  }

  try {
    await resend.emails.send({
      from: SERVER_ENV.EMAIL_CONFIG.FROM_ADDRESS,
      to: toEmail,
      replyTo: email,
      subject: safeSubject
        ? `New contact form submission: ${safeSubject}`
        : `New contact form submission from ${safeName}`,
      text: `Name: ${safeName}\nEmail: ${email}\nPhone: ${safePhone || "Not provided"}\nSubject: ${safeSubject || "No subject"}\n\nMessage:\n${message}`,
    });
    return NextResponse.json({ ok: true }, { headers: corsHeaders() });
  } catch (error) {
    console.error("[contact] Failed to send email:", error);
    return NextResponse.json(
      { ok: false, error: { message: "Failed to send message." } },
      { status: 502, headers: corsHeaders() },
    );
  }
}
