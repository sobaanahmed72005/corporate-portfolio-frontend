import { describe, expect, it } from "vitest";
import { contactFormSchema } from "./contact";

describe("contactFormSchema", () => {
  it("accepts a valid submission", () => {
    const result = contactFormSchema.safeParse({
      name: "Ali Raza",
      email: "ali@example.com",
      phone: "+92 300 1234567",
      message: "I'd like a quote for a CCTV installation at my shop.",
    });
    expect(result.success).toBe(true);
  });

  it("accepts a submission without a phone number", () => {
    const result = contactFormSchema.safeParse({
      name: "Ali Raza",
      email: "ali@example.com",
      phone: "",
      message: "I'd like a quote for a CCTV installation at my shop.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = contactFormSchema.safeParse({
      name: "Ali Raza",
      email: "not-an-email",
      message: "I'd like a quote for a CCTV installation at my shop.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a message that is too short", () => {
    const result = contactFormSchema.safeParse({
      name: "Ali Raza",
      email: "ali@example.com",
      message: "hi",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a missing name", () => {
    const result = contactFormSchema.safeParse({
      name: "A",
      email: "ali@example.com",
      message: "I'd like a quote for a CCTV installation at my shop.",
    });
    expect(result.success).toBe(false);
  });
});
