import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { getCompanyInfo } from "@/lib/cms";

/**
 * Both optional and unset by default — this site doesn't have a hero video
 * or flagship product photo yet. Drop the file in /public and point these
 * at it to get the real look; without them, the section falls back cleanly
 * to the gradient background / empty image slot below.
 */
const videoSrc: string | undefined = undefined;
const heroImageSrc: string | undefined = undefined;

export async function Hero() {
  const company = await getCompanyInfo();

  return (
    <section className="relative overflow-hidden bg-page-950">
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
      <div className="absolute inset-0 bg-gradient-to-b from-page-950/60 via-page-950/70 to-page-950" aria-hidden />

      <Container className="relative grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] sm:py-28">
        <div>
          <p className="mb-4 font-display text-[13px] font-medium uppercase tracking-[0.15em] text-accent-500">
            IT Accessories &middot; Security &middot; Solar &middot; Networking
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-pageText-950 sm:text-5xl lg:text-6xl">
            {company.shortName}&rsquo;s Trusted Partner for Smart, Secure Infrastructure
          </h1>
          <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-pageText-700 sm:text-2xl">
            {company.tagline}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-[1.8] text-pageText-800">
            {company.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/products" size="lg" variant="brand">
              Browse Products <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
            <LinkButton href="/contact" size="lg" variant="outline">
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
            className="rounded-3xl border-cardText-950/15"
          />
        </div>
      </Container>
    </section>
  );
}
