import { NextResponse } from "next/server";
import { newsletterFormSchema } from "@/lib/validations/newsletter";
import { corsHeaders } from "@/lib/cors";
import { SERVER_ENV } from "@/lib/server-env";
import { CMS_CONFIG } from "@/lib/cms-env";
import { resend } from "@/lib/resend";
import { rateLimitGuard, parseJsonBody, isHoneypotTripped, missingEmailConfig } from "@/lib/api-handler";

// Generous for an email address plus the honeypot field.
const MAX_BODY_BYTES = 2_000;

// Best-effort storage in Strapi. Uses a token scoped to create-only on
// newsletter-subscriber (never the frontend's read-only or a full-access
// token) — see corporate-portfolio-cms's Newsletter Subscriber content type.
async function storeSubscriber(email: string): Promise<void> {
  const strapiUrl = CMS_CONFIG.URL;
  const token = SERVER_ENV.NEWSLETTER_CONFIG.STRAPI_NEWSLETTER_TOKEN;

  if (!strapiUrl || !token) {
    console.info("[newsletter] STRAPI_URL/STRAPI_NEWSLETTER_TOKEN not set — subscriber not stored:", email);
    return;
  }

  try {
    const res = await fetch(`${strapiUrl}/api/newsletter-subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: { email } }),
    });

    if (!res.ok) {
      console.error(`[newsletter] failed to store subscriber (${res.status}): ${await res.text()}`);
      return;
    }

    const body = (await res.json()) as { data?: { alreadySubscribed?: boolean } };
    if (body?.data?.alreadySubscribed) {
      console.info(`[newsletter] subscriber already exists: ${email}`);
    }
  } catch (error) {
    console.error("[newsletter] failed to reach CMS to store subscriber:", error);
  }
}

// Best-effort owner notification.
async function notifyOwner(email: string): Promise<void> {
  const toEmail = SERVER_ENV.EMAIL_CONFIG.CONTACT_TO_EMAIL;
  if (!resend || !toEmail) {
    if (SERVER_ENV.IS_PRODUCTION) {
      const missing = missingEmailConfig();
      console.error(`[newsletter] Missing required config in production: ${missing.join(", ")}`);
      return;
    }
    console.info("[newsletter] RESEND_API_KEY/CONTACT_TO_EMAIL not set — notification skipped:", { email });
    return;
  }

  try {
    await resend.emails.send({
      from: SERVER_ENV.EMAIL_CONFIG.FROM_ADDRESS,
      to: toEmail,
      replyTo: email,
      subject: "New newsletter subscriber",
      text: `New newsletter subscription:\n${email}`,
    });
  } catch (error) {
    console.error("[newsletter] Failed to send notification email:", error);
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function POST(request: Request) {
  const rateLimited = rateLimitGuard(request, "newsletter");
  if (rateLimited) return rateLimited;

  const parsedBody = await parseJsonBody(request, MAX_BODY_BYTES);
  if (parsedBody.response) return parsedBody.response;
  const { body } = parsedBody;

  if (isHoneypotTripped(body)) {
    return NextResponse.json({ ok: true }, { headers: corsHeaders() });
  }

  const parsed = newsletterFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.flatten() },
      { status: 400, headers: corsHeaders() },
    );
  }

  const { email } = parsed.data;

  // Both are independent, best-effort side effects — a visitor who submits
  // a valid email sees success even if one delivery channel is down.
  await Promise.allSettled([storeSubscriber(email), notifyOwner(email)]);

  return NextResponse.json({ ok: true }, { headers: corsHeaders() });
}
