import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("server-only", () => ({}));

import { withFallback } from "./cms";

describe("withFallback", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the real result when the function succeeds", async () => {
    const result = await withFallback("test", "fallback-value", async () => "real-value");
    expect(result).toBe("real-value");
  });

  it("returns the fallback and logs when the function throws", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const result = await withFallback("getProductCategories", [] as string[], async () => {
      throw new Error("CMS unreachable");
    });
    expect(result).toEqual([]);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("getProductCategories failed, using fallback"),
      expect.any(Error),
    );
  });

  it("does not let a rejected fetch crash the caller — this is the whole point", async () => {
    // Simulates the actual failure mode: a fetch() rejecting outright
    // (network down), not just a non-200 response.
    const fallback = { name: "IT Solutions Trade & Service" };
    const flakyFetch = async () => {
      throw new TypeError("fetch failed");
    };
    await expect(withFallback("getCompanyInfo", fallback, flakyFetch)).resolves.toEqual(fallback);
  });
});