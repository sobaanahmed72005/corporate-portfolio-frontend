import { describe, expect, it, vi, beforeEach } from "vitest";
import { POST, OPTIONS } from "./route";

let ipCounter = 0;
function freshIp() {
  ipCounter += 1;
  return `198.51.100.${ipCounter}`;
}

function postRequest(body: unknown, ip: string, rawBody?: string) {
  return new Request("http://localhost:3000/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Forwarded-For": ip },
    body: rawBody ?? JSON.stringify(body),
  });
}

describe("POST /api/newsletter", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("accepts a valid email (no Resend/Strapi configured — both skipped, still ok:true)", async () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const res = await POST(postRequest({ email: "subscriber@example.com" }, freshIp()));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(infoSpy).toHaveBeenCalledWith(
      expect.stringContaining("STRAPI_URL/STRAPI_NEWSLETTER_TOKEN not set"),
      "subscriber@example.com",
    );
  });

  it("rejects an invalid email with 400", async () => {
    const res = await POST(postRequest({ email: "not-an-email" }, freshIp()));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.ok).toBe(false);
  });

  it("silently drops a honeypot-tripped submission without attempting storage", async () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const res = await POST(
      postRequest({ email: "bot@example.com", website: "http://spam.example" }, freshIp()),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(infoSpy).not.toHaveBeenCalled();
  });

  it("returns a clean 400 on malformed JSON instead of throwing", async () => {
    const res = await POST(postRequest(undefined, freshIp(), "not valid json{{{"));
    expect(res.status).toBe(400);
  });

  it("rejects an oversized payload with 413", async () => {
    const huge = JSON.stringify({ email: "x".repeat(5000) + "@example.com" });
    const res = await POST(postRequest(undefined, freshIp(), huge));
    expect(res.status).toBe(413);
  });

  it("rate limits rapid signups from the same IP", async () => {
    const ip = freshIp();
    for (let i = 0; i < 5; i++) {
      const res = await POST(postRequest({ email: "subscriber@example.com" }, ip));
      expect(res.status).toBe(200);
    }
    const blocked = await POST(postRequest({ email: "subscriber@example.com" }, ip));
    expect(blocked.status).toBe(429);
  });
});

describe("OPTIONS /api/newsletter", () => {
  it("responds with 204 No Content and CORS headers", async () => {
    const res = await OPTIONS();
    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Methods")).toContain("POST");
  });
});
