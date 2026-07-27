import { ArrowRight } from "lucide-react";
import { HeroSlider } from "@/components/home/HeroSlider";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { getCompanyInfo } from "@/lib/cms";

/**
 * videoSrc is unset by default — this site doesn't have a hero video yet,
 * and without one the section falls back cleanly to the gradient background.
 */
const videoSrc: string | undefined = undefined;

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

      <Container className="relative pb-8 pt-4 sm:pb-12 sm:pt-5 lg:pb-16 lg:pt-6">
        <HeroSlider storeUrl={company.storeUrl} />

        <div className="mx-auto mt-4 max-w-3xl text-center sm:mt-6">
          <p className="mb-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-accent-500 sm:mb-3 sm:text-[13px]">
            IT Accessories &middot; Security &middot; Solar &middot; Networking
          </p>
          <h1 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-pageText-950 sm:text-3xl lg:text-4xl">
            <TypewriterText text={`${company.shortName}’s Trusted Partner for Smart, Secure Infrastructure`} />
          </h1>
          <h2 className="mt-2 font-display text-base font-bold leading-snug text-pageText-700 sm:text-xl">
            {company.tagline}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-pageText-800 sm:text-base">
            {company.description}
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href="/products" size="md" variant="brand">
              Browse Products <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
            <LinkButton href="/contact" size="md" variant="outline">
              Get a Quote
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
