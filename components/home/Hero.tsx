import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { company } from "@/lib/data/company";
import { getProductCategories } from "@/lib/cms";

/**
 * Both optional and unset by default — this site doesn't have a hero video
 * or flagship product photo yet. Drop the file in /public and point these
 * at it to get the real look; without them, the section falls back cleanly
 * to the gradient background / empty image slot below.
 */
const videoSrc: string | undefined = undefined;
const heroImageSrc: string | undefined = undefined;

export async function Hero() {
  const productCategories = await getProductCategories();

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
              "radial-gradient(circle at 15% 20%, var(--brand-600) 0, transparent 40%), radial-gradient(circle at 85% 0%, var(--accent-400) 0, transparent 40%)",
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
          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-50 sm:text-5xl lg:text-6xl">
            {company.shortName}&rsquo;s Trusted Partner for Smart, Secure Infrastructure
          </h1>
          <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-ink-50/80 sm:text-2xl">
            {company.tagline}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200">
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

        <div className="relative mx-auto w-full max-w-md">
          <div
            className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--brand-600) 0%, transparent 70%)" }}
            aria-hidden
          />
          <ImageSlot
            src={heroImageSrc}
            alt="Flagship product"
            aspect="square"
            onDark
            className="rounded-3xl border-ink-50/15"
          />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {productCategories.map((cat) => (
              <div
                key={cat.slug}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-ink-50/15 bg-ink-50/5 p-3 text-center backdrop-blur-sm"
              >
                <GradientIconBadge icon={cat.icon} gradient={cat.gradient} size="sm" className="rounded-full" />
                <span className="text-[11px] font-medium text-ink-50">{cat.shortName}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}