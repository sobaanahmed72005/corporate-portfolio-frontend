import { z } from "zod";

/**
 * Client-side copy for instant form feedback. The authoritative copy lives
 * in corporate-portfolio-api (separate repo) — keep the two in sync by hand,
 * since the frontend and backend are deployed independently.
 */
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(20)
    .optional()
    .or(z.literal("")),
  subject: z.string().trim().max(100).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message must be under 2000 characters."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
