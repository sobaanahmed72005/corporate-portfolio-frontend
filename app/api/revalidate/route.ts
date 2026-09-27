import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { SERVER_ENV } from "@/lib/server-env";
import { rateLimitGuard } from "@/lib/api-handler";

/**
 * On-demand revalidation endpoint. Allows Strapi webhooks to trigger instant
 * cache updates when content is published or updated, without waiting for the
 * background ISR window to expire.
 *
 * Usage:
 * POST /api/revalidate?secret=YOUR_SECRET&path=/
 * or
 * POST /api/revalidate?secret=YOUR_SECRET&tag=cms-data
 */
export async function POST(request: NextRequest) {
  const rateLimited = rateLimitGuard(request, "revalidate");
  if (rateLimited) return rateLimited;

  const secret = request.nextUrl.searchParams.get("secret");
  const expectedSecret = SERVER_ENV.REVALIDATION_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json({ ok: false, message: "Invalid revalidation secret" }, { status: 401 });
  }

  const path = request.nextUrl.searchParams.get("path");
  const tag = request.nextUrl.searchParams.get("tag");

  if (!path && !tag) {
    // Revalidate the entire home and layout by default
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, revalidated: true, scope: "layout" });
  }

  if (tag) {
    revalidateTag(tag, "page");
  }

  if (path) {
    revalidatePath(path);
  }

  return NextResponse.json({ ok: true, revalidated: true, path, tag });
}
