"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { safeHref } from "@/lib/safe-url";

const SLIDE_INTERVAL_MS = 4000;

// Order matches the product category order on the homepage (CCTV & Security,
// Networking, Laptop Hardware, Multimedia Projectors, Mobile Accessories, Solar).
// Every slide's source photo is plain product/scene photography with no text
// baked in — the headline/subtext overlay below is what actually renders the
// copy, so all six slides share one consistent size, weight, and color.
const SLIDES = [
  {
    src: "/hero-slides/cctv-security.jpg",
    alt: "Full range of CCTV security camera products",
    headline: "Complete CCTV Protection",
    subtext: "A full range of security camera systems for homes and businesses.",
  },
  {
    src: "/hero-slides/networking.jpg",
    alt: "Wireless router connecting devices around a smart home",
    headline: "Seamless Connectivity",
    subtext: "Enterprise-grade networking gear for homes, offices, and businesses.",
  },
  {
    src: "/hero-slides/laptop-hardware.jpg",
    alt: "Laptop hardware and accessories flat lay",
    headline: "Upgrade Your Setup",
    subtext: "Genuine laptop hardware and accessories to keep you running strong.",
  },
  {
    src: "/hero-slides/multimedia-projectors.jpg",
    alt: "Multimedia projector in a corporate meeting room",
    headline: "Smart Presentation Solutions",
    subtext: "High-quality projectors for meetings, classrooms, and events.",
  },
  {
    src: "/hero-slides/mobile-accessories.jpg",
    alt: "Smart mobile accessories built for your lifestyle",
    headline: "Smart Accessories",
    subtext: "High quality gadgets and accessories you can depend on, every day.",
  },
  {
    src: "/hero-slides/solar-panels.jpg",
    alt: "Solar panel field with a city skyline",
    headline: "Power Your Future",
    subtext: "Reliable solar panels and inverters for homes and businesses across Pakistan.",
  },
];

/**
 * Auto-advancing image slider for the homepage hero, with a "visit our
 * store" button underneath. Pauses while hovered so it doesn't fight
 * someone reading it or clicking a dot.
 */
export function HeroSlider({ storeUrl }: { storeUrl: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [paused]);

  const goTo = (i: number) => setIndex((i + SLIDES.length) % SLIDES.length);

  return (
    <div className="relative w-full">
      <div
        className="group relative aspect-[21/9] max-h-[200px] w-full overflow-hidden rounded-3xl border border-cardText-950/15 sm:max-h-[260px] lg:max-h-[300px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex h-full w-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SLIDES.map((slide, i) => (
            <div key={slide.src} className="relative h-full w-full shrink-0">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="100vw"
                // Every slide loads eagerly, not just the first — otherwise
                // the first time the carousel reaches an unseen slide, the
                // browser fetches and decodes it right as it's meant to
                // slide into view, which shows up as a stutter/pop.
                {...(i === 0 ? { priority: true } : { loading: "eager" as const })}
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/60 via-black/25 to-transparent sm:w-3/4"
                aria-hidden
              />
              <div className="absolute inset-y-0 left-0 flex max-w-[85%] flex-col justify-center gap-1 p-3 sm:max-w-sm sm:gap-1.5 sm:p-6">
                <h3 className="font-display text-base font-extrabold leading-tight text-white drop-shadow-sm sm:text-xl lg:text-2xl">
                  {slide.headline}
                </h3>
                <p className="max-w-xs text-xs leading-snug text-white/85 drop-shadow-sm sm:text-sm">
                  {slide.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-pageText-950/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 ease-out hover:bg-pageText-950/60 group-hover:opacity-100 focus-visible:opacity-100"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-pageText-950/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 ease-out hover:bg-pageText-950/60 group-hover:opacity-100 focus-visible:opacity-100"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" aria-hidden />

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-between gap-4 p-4 sm:flex-row sm:p-6">
          <div className="flex items-center gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-accent-500" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>

          <LinkButton
            href={safeHref(storeUrl)}
            target="_blank"
            rel="noopener noreferrer"
            variant="brand"
            size="lg"
          >
            Shop Now <ArrowRight className="h-4 w-4" aria-hidden />
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
