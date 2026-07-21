"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { safeHref } from "@/lib/safe-url";

const SLIDE_INTERVAL_MS = 4000;

const SLIDES = [
  { src: "/hero-slides/cctv.jpg", alt: "CCTV security cameras" },
  { src: "/hero-slides/networking.jpg", alt: "Networking switch with ethernet cables" },
  { src: "/hero-slides/accessories.jpg", alt: "Keyboard, mouse, and IT accessories" },
  { src: "/hero-slides/cables.jpg", alt: "USB cable" },
  { src: "/hero-slides/solar.jpg", alt: "Solar panel field" },
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

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand-600) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div
        className="relative aspect-square overflow-hidden rounded-3xl border border-cardText-950/15"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {SLIDES.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={i === 0}
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-accent-500" : "w-2 bg-pageText-950/20"
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
        className="mt-4 w-full"
      >
        Visit Our Store <ArrowRight className="h-4 w-4" aria-hidden />
      </LinkButton>
    </div>
  );
}
