import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { getClientLogos } from "@/lib/cms";

export async function LogoWall() {
  const clientLogos = await getClientLogos();
  // Two full copies keep the marquee loop seamless (see TrustTicker's Row
  // component for the same technique).
  const track = [...clientLogos, ...clientLogos];

  return (
    <section className="overflow-hidden bg-page-950 py-14 sm:py-20">
      <Container>
        <p className="mb-8 text-center font-display text-sm font-semibold uppercase tracking-wide text-page-400">
          Trusted by Industry Leaders
        </p>
      </Container>
      <div className="w-full overflow-hidden">
        <div className="flex w-max shrink-0 gap-6 animate-marquee">
          {track.map((logo, i) => (
            <ImageSlot
              key={`${logo.alt}-${i}`}
              src={logo.src}
              alt={logo.alt}
              aspect="wide"
              onDark
              className="w-40 shrink-0 grayscale transition-[filter] hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}