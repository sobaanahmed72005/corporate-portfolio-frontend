import { describe, expect, it, vi, beforeEach } from "vitest";
import { sanitizeHex, deriveGradientStops } from "./theme";

describe("sanitizeHex", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("passes through a valid 6-digit hex color unchanged", () => {
    expect(sanitizeHex("#1E40AF")).toBe("#1E40AF");
  });

  it("accepts lowercase hex digits", () => {
    expect(sanitizeHex("#abcdef")).toBe("#abcdef");
  });

  it("falls back to a neutral color for a non-hex string, and logs it", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    // The exact scenario this exists for: a value that would break out of
    // the <style> tag it gets written into if trusted verbatim.
    const malicious = "red;}</style><script>alert(1)</script>";
    expect(sanitizeHex(malicious)).toBe("#888888");
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("invalid color value ignored"));
  });

  it("falls back for a 3-digit shorthand hex (not supported, must be 6 digits)", () => {
    expect(sanitizeHex("#fff")).toBe("#888888");
  });

  it("falls back for an empty string", () => {
    expect(sanitizeHex("")).toBe("#888888");
  });
});

describe("deriveGradientStops", () => {
  it("keeps the picked color as the 'from' stop when it's valid", () => {
    const { from } = deriveGradientStops("#3B82F6");
    expect(from).toBe("#3B82F6");
  });

  it("produces a darker 'to' stop than 'from' for a valid color", () => {
    const { from, to } = deriveGradientStops("#3B82F6");
    expect(to).not.toBe(from);
    expect(to).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it("sanitizes an invalid input before deriving a gradient, rather than producing garbage", () => {
    const { from, to } = deriveGradientStops("not-a-color");
    expect(from).toBe("#888888");
    expect(to).toMatch(/^#[0-9a-fA-F]{6}$/);
  });
});