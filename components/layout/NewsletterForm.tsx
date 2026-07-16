"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { newsletterFormSchema, type NewsletterFormValues } from "@/lib/validations/newsletter";
import { ENDPOINTS } from "@/lib/endpoints";
import { apiClient } from "@/lib/api-client";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
  });

  async function onSubmit(values: NewsletterFormValues) {
    setStatus("submitting");
    try {
      await apiClient.post(ENDPOINTS.NEWSLETTER, values);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Honeypot — see ContactForm.tsx for the full explanation. */}
      <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="newsletter-website">Leave this field empty</label>
        <input id="newsletter-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <p className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-footerText-950">
        Subscribe to Our Newsletter
      </p>
      <div className="mt-4 flex gap-2">
        <input
          type="email"
          placeholder="you@example.com"
          aria-label="Email address"
          className="w-full min-w-0 rounded-lg border border-footerText-950/15 bg-white px-3 py-2 text-sm text-footerText-950 placeholder:text-footerText-600 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
          {...register("email")}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          aria-label="Subscribe"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-button-600 p-2.5 text-white transition-colors hover:bg-button-700 disabled:opacity-60"
        >
          {status === "submitting" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <Send className="h-4 w-4" aria-hidden />
          )}
        </button>
      </div>
      {errors.email && <p className="mt-2 text-xs text-rose-600">{errors.email.message}</p>}
      {status === "success" && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600">
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> Subscribed — thanks!
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-rose-600">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden /> Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
