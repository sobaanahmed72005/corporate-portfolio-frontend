import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { GRADIENTS, GRADIENT_PILL_BASE } from "@/components/ui/gradients";
import { cn } from "@/lib/cn";
import { getTestimonials, type Testimonial } from "@/lib/cms";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex w-[320px] shrink-0 flex-col rounded-2xl border border-ink-50/10 bg-ink-50/5 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < testimonial.rating ? "fill-accent-500 text-accent-500" : "fill-ink-50/10 text-ink-50/10",
            )}
            aria-hidden
          />
        ))}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-200">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3">
        {testimonial.photo ? (
          <ImageSlot
            src={testimonial.photo}
            alt={testimonial.name}
            aspect="square"
            className="h-10 w-10 shrink-0 rounded-full"
          />
        ) : (
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white",
              GRADIENTS[testimonial.gradient].badge,
            )}
          >
            {testimonial.name.charAt(0)}
          </span>
        )}
        <div>
          <p className="text-sm font-semibold text-ink-50">{testimonial.name}</p>
          <p className="text-xs text-ink-400">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export async function TestimonialsPreview() {
  const testimonials = await getTestimonials();
  // Two full copies of the set keep the marquee loop seamless — a single copy
  // runs out partway across a wide screen, leaving a blank gap before it wraps.
  const track = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden bg-ink-900 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Feedback That Matters"
          title="Trusted by Homes and Businesses"
          align="center"
          className="mx-auto"
          onDark
        />
      </Container>

      <div className="mt-10 w-full overflow-hidden">
        <div className="flex w-max shrink-0 gap-6 animate-marquee">
          {track.map((testimonial, i) => (
            <TestimonialCard key={`${testimonial.name}-${i}`} testimonial={testimonial} />
          ))}
        </div>
      </div>

      <Container>
        <div className="mt-10 flex justify-center">
          <Link href="/testimonials" className={cn(GRADIENT_PILL_BASE, GRADIENTS.blue.pill, "w-fit")}>
            Read More Reviews <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}