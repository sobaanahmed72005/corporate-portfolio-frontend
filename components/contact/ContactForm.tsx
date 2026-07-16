"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";
import type { Service } from "@/lib/cms";
import { ENDPOINTS } from "@/lib/endpoints";
import { apiClient } from "@/lib/api-client";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ services }: { services: Service[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    try {
      await apiClient.post(ENDPOINTS.CONTACT, values);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot: hidden from real visitors (off-screen, not display:none,
          since some bots specifically skip display:none/type=hidden fields
          but still fill anything off-screen). Bots that fill every field
          trip this; the backend accepts the request but silently discards
          it instead of showing an error, so scrapers get no signal. */}
      <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-contentCardText-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="mt-1 w-full rounded-lg border border-contentCard-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-contentCardText-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="mt-1 w-full rounded-lg border border-contentCard-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-contentCardText-700">
          Phone <span className="text-contentCardText-600">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          className="mt-1 w-full rounded-lg border border-contentCard-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-contentCardText-700">
          What are you interested in? <span className="text-contentCardText-600">(optional)</span>
        </label>
        <select
          id="subject"
          className="mt-1 w-full rounded-lg border border-contentCard-300 bg-contentCard-50 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
          defaultValue=""
          {...register("subject")}
        >
          <option value="">General Inquiry</option>
          {services.map((service) => (
            <option key={service.slug} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-contentCardText-700">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className="mt-1 w-full rounded-lg border border-contentCard-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        Send Message
      </Button>

      {status === "success" && (
        <p className="flex items-center gap-2 text-sm font-medium text-green-700">
          <CheckCircle2 className="h-4 w-4" /> Thanks — we&apos;ve received your message and
          will get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="flex items-center gap-2 text-sm font-medium text-red-600">
          <AlertCircle className="h-4 w-4" /> Something went wrong. Please try again or
          contact us directly by phone.
        </p>
      )}
    </form>
  );
}
