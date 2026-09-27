import { describe, expect, it, vi, beforeEach } from "vitest";
import { POST, OPTIONS } from "./route";

let ipCounter = 0;
function freshIp() {
  ipCounter += 1;
  return `203.0.113.${ipCounter}`;
}

function postRequest(body: unknown, ip: string, rawBody?: string) {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Forwarded-For": ip },
    body: rawBody ?? JSON.stringify(body),
  });
}

const validPayload = {
  name: "Ali Raza",
  email: "ali@example.com",
  message: "I'd like a quote for a CCTV installation at my shop.",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("accepts a valid submission (dev log-only path, no Resend configured)", async () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const res = await POST(postRequest(validPayload, freshIp()));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ ok: true });
    expect(infoSpy).toHaveBeenCalledWith(
      expect.stringContaining("submission logged only"),
      expect.objectContaining({ email: "ali@example.com" }),
    );
  });

  it("rejects an invalid submission with 400", async () => {
    const res = await POST(postRequest({ ...validPayload, email: "not-an-email" }, freshIp()));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.ok).toBe(false);
  });

  it("silently drops a honeypot-tripped submission without logging it", async () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const res = await POST(postRequest({ ...validPayload, website: "http://spam.example" }, freshIp()));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ ok: true });
    expect(infoSpy).not.toHaveBeenCalled();
  });

  it("returns a clean 400 on malformed JSON instead of throwing", async () => {
    const res = await POST(postRequest(null, freshIp(), "{ not valid json"));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.ok).toBe(false);
  });

  it("rejects an oversized body with 413", async () => {
    const giantMessage = "a".repeat(25_000);
    const res = await POST(postRequest({ ...validPayload, message: giantMessage }, freshIp()));
    expect(res.status).toBe(413);
  });

  it("rate limits rapid requests from the same IP", async () => {
    const ip = freshIp();
    for (let i = 0; i < 5; i++) {
      const res = await POST(postRequest(validPayload, ip));
      expect(res.status).toBe(200);
    }
    const blocked = await POST(postRequest(validPayload, ip));
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("Retry-After")).toBe("60");
  });
});

describe("OPTIONS /api/contact", () => {
  it("responds with 204 No Content and CORS headers", async () => {
    const res = await OPTIONS();
    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Methods")).toContain("POST");
  });
});
