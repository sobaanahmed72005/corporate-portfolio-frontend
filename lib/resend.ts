import { Resend } from "resend";
import { SERVER_ENV } from "@/lib/server-env";

/**
 * Single shared Resend client. Node caches modules, so every importer gets
 * this same instance instead of constructing a new one per file.
 * Null when RESEND_API_KEY isn't set (local dev without email configured).
 */
export const resend = SERVER_ENV.EMAIL_CONFIG.RESEND_API_KEY
  ? new Resend(SERVER_ENV.EMAIL_CONFIG.RESEND_API_KEY)
  : null;
