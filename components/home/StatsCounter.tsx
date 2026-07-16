"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import type { Stat } from "@/lib/cms";

const DURATION_MS = 1000;

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame: number;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
}

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const value = useCountUp(stat.value, active);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl font-extrabold text-pageText-950 sm:text-5xl">
        {value}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-pageText-800 sm:text-base">{stat.label}</p>
    </div>
  );
}

export function StatsCounter({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-t-2 border-pageText-950/15 bg-page-950 py-14 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <Counter key={stat.label} stat={stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}
