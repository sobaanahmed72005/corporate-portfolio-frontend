import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBanner } from "@/components/home/CtaBanner";
import { deriveGradientStops } from "@/lib/theme";
import { cn } from "@/lib/cn";
import { getTestimonials, getCompanyInfo } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyInfo();
  return {
    title: "Testimonials & Reviews",
    description: `What clients say about working with ${company.name} on CCTV, solar, networking, and supply projects.`,
  };
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="bg-contentCard-50">
      <PageHero
        title="Testimonials & Reviews"
        description="What clients say about their CCTV, solar, networking, and supply projects with us."
      />

      <Container className="py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col rounded-3xl border border-contentCard-200 bg-contentCard-50 p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-lg"
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
                  <p className="text-xs text-contentCardText-600">{testimonial.role}</p>
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
