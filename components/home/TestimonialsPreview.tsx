import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GRADIENTS, GRADIENT_PILL_BASE } from "@/components/ui/gradients";
import { cn } from "@/lib/cn";
import { testimonials } from "@/lib/data/testimonials";

const featured = testimonials.slice(0, 3);

export function TestimonialsPreview() {
  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What Clients Say"
          title="Trusted by Homes and Businesses"
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {featured.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < testimonial.rating
                        ? "fill-accent-500 text-accent-500"
                        : "fill-slate-200 text-slate-200",
                    )}
                    aria-hidden
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white",
                    GRADIENTS[testimonial.gradient].badge,
                  )}
                >
                  {testimonial.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-950">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/testimonials" className={cn(GRADIENT_PILL_BASE, GRADIENTS.blue.pill, "w-fit")}>
            Read More Reviews <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}