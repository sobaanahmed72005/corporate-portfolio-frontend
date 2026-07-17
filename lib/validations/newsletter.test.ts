import { describe, expect, it } from "vitest";
import { newsletterFormSchema } from "./newsletter";

describe("newsletterFormSchema", () => {
  it("accepts a valid email", () => {
    const result = newsletterFormSchema.safeParse({ email: "ali@example.com" });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = newsletterFormSchema.safeParse({ email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a missing email", () => {
    const result = newsletterFormSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("accepts an empty honeypot field (what a real visitor submits)", () => {
    const result = newsletterFormSchema.safeParse({ email: "ali@example.com", website: "" });
    expect(result.success).toBe(true);
  });

  it("does not reject a filled honeypot at the schema level (the route handler decides what to do with it)", () => {
    const result = newsletterFormSchema.safeParse({ email: "ali@example.com", website: "http://spam.example" });
    expect(result.success).toBe(true);
  });
});