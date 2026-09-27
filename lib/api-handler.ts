import { NextResponse } from "next/server";
import { corsHeaders } from "./cors";
import { getClientIp, isRateLimited } from "./rate-limit";
import { readBodyWithLimit, PayloadTooLargeError } from "./read-body";
import { SERVER_ENV } from "./server-env";

/**
 * Shared request-handling steps for the contact and newsletter routes
 * (rate limiting, body parsing, honeypot check, email-config lookup).
 */

export function rateLimitGuard(request: Request, scope: string): NextResponse | null {
  const ip = getClientIp(request);
  if (!isRateLimited(`${scope}:${ip}`)) return null;
  return NextResponse.json(
    { ok: false, error: { message: "Too many requests. Please wait a minute and try again." } },
    { status: 429, headers: { ...corsHeaders(), "Retry-After": "60" } },
  );
}

export async function parseJsonBody(
  request: Request,
  maxBytes: number,
): Promise<{ body: unknown; response?: undefined } | { body?: undefined; response: NextResponse }> {
  let raw: string;
  try {
    raw = await readBodyWithLimit(request, maxBytes);
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      return {
        response: NextResponse.json(
          { ok: false, error: { message: "Request body too large." } },
          { status: 413, headers: corsHeaders() },
        ),
      };
    }
    throw error;
  }

  try {
    return { body: JSON.parse(raw) };
  } catch {
    return {
      response: NextResponse.json(
        { ok: false, error: { message: "Invalid request body." } },
        { status: 400, headers: corsHeaders() },
      ),
    };
  }
}

// Hidden field real visitors never see or fill (the frontend form keeps it
// empty and visually hidden). Bots that fill every field trip this; callers
// return the same success response a real submission gets, without
// performing the side effect, so scrapers get no signal they were caught.
export function isHoneypotTripped(body: unknown): boolean {
  return typeof body === "object" && body !== null && Boolean((body as { website?: unknown }).website);
}

export function missingEmailConfig(): string[] {
  return [
    !SERVER_ENV.EMAIL_CONFIG.RESEND_API_KEY && "RESEND_API_KEY",
    !SERVER_ENV.EMAIL_CONFIG.CONTACT_TO_EMAIL && "CONTACT_TO_EMAIL",
  ].filter((name): name is string => Boolean(name));
}
