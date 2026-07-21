import Image from "next/image";
import { Container } from "@/components/ui/Container";

// Sourced from each brand's own site or Wikimedia Commons (see git history);
// Hisource has no usable public logo, so it stays text-only. Logos aren't
// CMS-driven — this list changes about as often as the hero slider images,
// which are hardcoded too.
const BRANDS: { name: string; logo?: string }[] = [
  { name: "Hikvision", logo: "/brand-logos/hikvision.svg" },
  { name: "Dahua", logo: "/brand-logos/dahua.svg" },
  { name: "Ezviz", logo: "/brand-logos/ezviz.png" },
  { name: "Imou", logo: "/brand-logos/imou.png" },
  { name: "Ubiquiti", logo: "/brand-logos/ubiquiti.svg" },
  { name: "Hisource" },
  { name: "Tp-Link", logo: "/brand-logos/tp-link.svg" },
  { name: "Tenda", logo: "/brand-logos/tenda.png" },
  { name: "Cisco", logo: "/brand-logos/cisco.svg" },
  { name: "Solis", logo: "/brand-logos/solis.png" },
  { name: "Goodwe", logo: "/brand-logos/goodwe.svg" },
  { name: "Sungrow", logo: "/brand-logos/sungrow.svg" },
  { name: "Huawei", logo: "/brand-logos/huawei.svg" },
  { name: "Itel", logo: "/brand-logos/itel.svg" },
  { name: "Dyness", logo: "/brand-logos/dyness.svg" },
  { name: "Sony", logo: "/brand-logos/sony.svg" },
  { name: "NEC", logo: "/brand-logos/nec.svg" },
  { name: "Epson", logo: "/brand-logos/epson.svg" },
  { name: "Acer", logo: "/brand-logos/acer.svg" },
  { name: "ViewSonic", logo: "/brand-logos/viewsonic.svg" },
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
            <div
              key={`${brand.name}-${i}`}
              className="flex h-16 w-40 shrink-0 items-center justify-center rounded-xl border border-pageText-950/15 bg-card-950 px-6 py-3"
            >
              {brand.logo ? (
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={40}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="font-display text-sm font-semibold text-cardText-800">{brand.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
