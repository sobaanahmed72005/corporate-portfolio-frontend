"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { safeHref } from "@/lib/safe-url";

const SLIDE_INTERVAL_MS = 4000;

// Order matches the product category order on the homepage (CCTV & Security,
// Networking, Laptop Hardware, Multimedia Projectors, Mobile Accessories, Solar).
const SLIDES = [
  { src: "/hero-slides/cctv-security.jpg", alt: "Full range of CCTV security camera products" },
  { src: "/hero-slides/networking.jpg", alt: "Wireless router connecting devices around a smart home" },
  { src: "/hero-slides/laptop-hardware.jpg", alt: "Laptop hardware and accessories flat lay" },
  { src: "/hero-slides/multimedia-projectors.jpg", alt: "Multimedia projector in a corporate meeting room" },
  { src: "/hero-slides/mobile-accessories.jpg", alt: "Smart mobile accessories built for your lifestyle" },
  { src: "/hero-slides/solar-panels.jpg", alt: "Solar panel field with a city skyline" },
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
        className="group relative aspect-[21/9] max-h-[320px] w-full overflow-hidden rounded-3xl border border-cardText-950/15 sm:max-h-[380px] lg:max-h-[440px]"
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
