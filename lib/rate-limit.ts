import { SERVER_ENV } from "./server-env";

/**
 * Small in-memory fixed-window rate limiter, keyed by client IP. No
 * external dependency needed at this project's traffic scale — this runs
 * within the Node server runtime, so in-memory state survives between
 * requests. If this ever moves to a multi-instance or serverless deployment,
 * swap the Map for a shared store (e.g. Redis/Upstash) so counts stay
 * consistent across instances.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

const IPV4_RE = /^(\d{1,3}\.){3}\d{1,3}$/;
const IPV6_RE = /^[0-9a-fA-F:]+$/;

function isPlausibleIp(candidate: string): boolean {
  return IPV4_RE.test(candidate) || (candidate.includes(":") && IPV6_RE.test(candidate));
}

// Sweep expired buckets periodically so memory doesn't grow unbounded.
setInterval(() => {
  const now = Date.now();
  buckets.forEach((bucket, key) => {
    if (now > bucket.resetAt) buckets.delete(key);
  });
}, 5 * 60_000).unref();

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const hops = forwardedFor.split(",").map((ip) => ip.trim());
    const trustedIndex = hops.length - SERVER_ENV.RATE_LIMIT_TRUSTED_PROXY_HOPS;
    const candidate = hops[Math.max(trustedIndex, 0)];
    if (candidate && isPlausibleIp(candidate)) return candidate;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp && isPlausibleIp(realIp)) return realIp;
  return "unknown";
}

export function isRateLimited(key: string, maxRequests = MAX_REQUESTS, windowMs = WINDOW_MS): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (bucket.count >= maxRequests) {
    return true;
  }

  bucket.count += 1;
  return false;
}
