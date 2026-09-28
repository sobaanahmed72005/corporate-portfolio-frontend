"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { safeHref } from "@/lib/safe-url";
import { DEFAULT_HERO_SLIDES } from "@/lib/cms-fallbacks";
import type { HeroSlide } from "@/lib/cms-types";

const SLIDE_INTERVAL_MS = 4000;

/**
 * Auto-advancing image slider for the homepage hero, with a "visit our
 * store" button underneath. Supports dynamic slides configured via Strapi CMS,
 * falling back gracefully to default slides if unpopulated.
 */
export function HeroSlider({
  slides = DEFAULT_HERO_SLIDES,
  storeUrl,
}: {
  slides?: HeroSlide[];
  storeUrl: string;
}) {
  const activeSlides = slides && slides.length > 0 ? slides : DEFAULT_HERO_SLIDES;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % activeSlides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [paused, activeSlides.length]);

  const goTo = (i: number) => setIndex((i + activeSlides.length) % activeSlides.length);

  return (
    <div className="relative w-full">
      <div
        className="group relative aspect-[21/8] max-h-[180px] w-full overflow-hidden rounded-3xl border border-cardText-950/15 sm:max-h-[220px] lg:max-h-[250px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex h-full w-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {activeSlides.map((slide, i) => (
            <div key={`${slide.src}-${i}`} className="relative h-full w-full shrink-0">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 1216px"
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

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" aria-hidden />

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 sm:p-5">
          <div className="flex items-center gap-2">
            {activeSlides.map((slide, i) => (
              <button
                key={`${slide.src}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show slide ${i + 1} of ${activeSlides.length}`}
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
            size="md"
          >
            Shop Now <ArrowRight className="h-4 w-4" aria-hidden />
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
