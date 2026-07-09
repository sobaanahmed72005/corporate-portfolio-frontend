import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { company } from "@/lib/data/company";
import { productCategories } from "@/lib/data/products";
import { cn } from "@/lib/cn";

/**
 * `videoSrc` is optional and unset by default — this site doesn't have a
 * hero video asset yet. Drop an .mp4 in /public and pass its path here to
 * get the autoplaying-background-video look; without it, the section falls
 * back cleanly to the gradient background below.
 */
const videoSrc: string | undefined = undefined;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      {videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, #0324ff 0, transparent 40%), radial-gradient(circle at 85% 0%, #ffa31a 0, transparent 40%)",
          }}
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/70 to-ink-950" aria-hidden />

      <Container className="relative grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] sm:py-28">
        <div>
          <p className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-accent-400">
            IT Accessories &middot; Security &middot; Solar &middot; Networking
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {company.shortName}&rsquo;s Trusted Partner for Smart, Secure Infrastructure
          </h1>
          <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-white/80 sm:text-2xl">
            {company.tagline}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            {company.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/products" size="lg" variant="brand">
              Browse Products <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
            <LinkButton href="/contact" size="lg" variant="outlineWhite">
              Get a Quote
            </LinkButton>
          </div>
        </div>

        {/* Decorative visual column — a stacked, offset badge grid standing
            in for reference-site product photography this site doesn't have. */}
        <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4">
          {productCategories.map((cat, i) => (
            <div
              key={cat.slug}
              className={cn(
                "flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-6 text-center backdrop-blur-sm",
                i % 2 === 1 && "translate-y-6",
              )}
            >
              <GradientIconBadge icon={cat.icon} gradient={cat.gradient} size="lg" className="rounded-full" />
              <span className="text-sm font-semibold text-white">{cat.shortName}</span>
            </div>
          ))}
          <div
            className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, #0324ff 0%, transparent 70%)" }}
            aria-hidden
          />
        </div>
      </Container>
    </section>
  );
}
