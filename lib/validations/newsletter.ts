import { z } from "zod";

/**
 * Client-side copy for instant form feedback. The authoritative copy lives
 * in corporate-portfolio-api (separate repo) — keep the two in sync by hand,
 * since the frontend and backend are deployed independently.
 */
export const newsletterFormSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
});

export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;
