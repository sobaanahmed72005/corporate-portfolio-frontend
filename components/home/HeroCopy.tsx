"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { TypewriterText } from "@/components/ui/TypewriterText";

const EYEBROW = "IT Accessories · Security · Solar · Networking";

/**
 * Types the eyebrow, headline, tagline, and description out in sequence —
 * each block only starts once the one before it finishes.
 */
export function HeroCopy({
  headline,
  tagline,
  description,
}: {
  headline: string;
  tagline: string;
  description: string;
}) {
  const [stage, setStage] = useState(0);

  return (
    <div>
      <p className="mb-4 font-display text-[13px] font-medium uppercase tracking-[0.15em] text-accent-500">
        <TypewriterText text={EYEBROW} active={stage >= 0} onDone={() => setStage(1)} />
      </p>
      <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-pageText-950 sm:text-5xl lg:text-6xl">
        <TypewriterText text={headline} active={stage >= 1} onDone={() => setStage(2)} />
      </h1>
      <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-pageText-700 sm:text-2xl">
        <TypewriterText text={tagline} active={stage >= 2} onDone={() => setStage(3)} />
      </h2>
      <p className="mt-6 max-w-xl text-lg leading-[1.8] text-pageText-800">
        <TypewriterText text={description} active={stage >= 3} onDone={() => setStage(4)} />
      </p>
      <div
        className={`mt-8 flex flex-col gap-3 transition-opacity duration-500 sm:flex-row ${
          stage >= 4 ? "opacity-100" : "opacity-0"
        }`}
      >
        <LinkButton href="/products" size="lg" variant="brand">
          Browse Products <ArrowRight className="h-4 w-4" aria-hidden />
        </LinkButton>
        <LinkButton href="/contact" size="lg" variant="outline">
          Get a Quote
        </LinkButton>
      </div>
    </div>
  );
}
