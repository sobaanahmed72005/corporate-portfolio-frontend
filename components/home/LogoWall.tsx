import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { clientLogos } from "@/lib/data/clientLogos";

// Two full copies keep the marquee loop seamless (see TrustTicker's Row
// component for the same technique).
const track = [...clientLogos, ...clientLogos];

export function LogoWall() {
  return (
    <section className="overflow-hidden bg-black py-14 sm:py-20">
      <Container>
        <p className="mb-8 text-center font-display text-sm font-semibold uppercase tracking-wide text-slate-400">
          Trusted by Industry Leaders
        </p>
      </Container>
      <div className="w-full overflow-hidden">
        <div className="flex w-max shrink-0 gap-6 animate-marquee">
          {track.map((logo, i) => (
            <ImageSlot
              key={`${logo.id}-${i}`}
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