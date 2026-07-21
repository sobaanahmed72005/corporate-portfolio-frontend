import { HeroCopy } from "@/components/home/HeroCopy";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { getCompanyInfo } from "@/lib/cms";

/**
 * heroImageSrc is unset by default — this site doesn't have a hero video
 * yet, and without an image the section falls back cleanly to the gradient
 * background / empty image slot below.
 */
const videoSrc: string | undefined = undefined;
const heroImageSrc: string | undefined = "/product-collage.jpg";

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
        <HeroCopy
          headline={`${company.shortName}’s Trusted Partner for Smart, Secure Infrastructure`}
          tagline={company.tagline}
          description={company.description}
        />

        <div className="relative mx-auto w-full max-w-md">
          <div
            className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--brand-600) 0%, transparent 70%)" }}
            aria-hidden
          />
          <ImageSlot
            src={heroImageSrc}
            alt="CCTV, networking, laptop, mobile, and solar products"
            aspect="square"
            className="rounded-3xl border-cardText-950/15"
          />
        </div>
      </Container>
    </section>
  );
}
