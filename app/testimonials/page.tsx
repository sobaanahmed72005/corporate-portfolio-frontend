import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CtaBanner } from "@/components/home/CtaBanner";
import { deriveGradientStops } from "@/lib/theme";
import { cn } from "@/lib/cn";
import { company } from "@/lib/data/company";
import { getTestimonials } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Testimonials & Reviews",
  description: `What clients say about working with ${company.name} on CCTV, solar, networking, and supply projects.`,
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="bg-contentCard-50">
      <section className="border-b border-section-200 bg-section-50 py-14">
        <Container>
          <h1 className="font-display text-3xl font-extrabold text-sectionText-950 sm:text-4xl">Testimonials &amp; Reviews</h1>
          <p className="mt-2 max-w-2xl text-sectionText-600">
            What clients say about their CCTV, solar, networking, and supply
            projects with us.
          </p>
        </Container>
      </section>

      <Container className="py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col rounded-2xl border border-contentCard-200 bg-contentCard-50 p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < testimonial.rating
                        ? "fill-accent-500 text-accent-500"
                        : "fill-contentCard-200 text-contentCard-200",
                    )}
                    aria-hidden
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-contentCardText-700">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, ${deriveGradientStops(testimonial.iconColor).from}, ${deriveGradientStops(testimonial.iconColor).to})`,
                  }}
                >
                  {testimonial.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-contentCardText-950">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-contentCardText-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <CtaBanner
        title="Ready to Join Them?"
        description="Let's talk about your CCTV, solar, networking, or supply needs."
        primaryLabel="Get In Touch"
      />
    </div>
  );
}
