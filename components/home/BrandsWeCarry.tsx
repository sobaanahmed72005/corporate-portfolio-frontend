import { Container } from "@/components/ui/Container";

// Brand names only — no logo images. We don't hold official logo files for
// these brands, and rendering real trademarked logos without them (e.g.
// scraped from the web) isn't something to do without the brand's own
// artwork, so this stays text-based rather than reusing the image-driven
// client-logo wall (see LogoWall.tsx).
const BRANDS = [
  "Hikvision",
  "Dahua",
  "Ezviz",
  "Imou",
  "Ubiquiti",
  "Hisource",
  "Tp-Link",
  "Tenda",
  "Cisco",
  "Solis",
  "Goodwe",
  "Sungrow",
  "Huawei",
  "Itel",
  "Dyness",
  "Sony",
  "NEC",
  "Epson",
  "Acer",
  "ViewSonic",
];

export function BrandsWeCarry() {
  // Two full copies keep the marquee loop seamless (same technique as
  // LogoWall/TrustTicker).
  const track = [...BRANDS, ...BRANDS];

  return (
    <section className="overflow-hidden border-t-2 border-pageText-950/15 bg-page-950 py-12 sm:py-16">
      <Container>
        <p className="mb-8 text-center font-display text-sm font-semibold uppercase tracking-[0.15em] text-pageText-600">
          Brands We Carry
        </p>
      </Container>
      <div className="w-full overflow-hidden">
        <div className="flex w-max shrink-0 gap-4 animate-marquee">
          {track.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="flex shrink-0 items-center justify-center rounded-xl border border-pageText-950/15 bg-card-950 px-6 py-3 font-display text-sm font-semibold text-cardText-800"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
