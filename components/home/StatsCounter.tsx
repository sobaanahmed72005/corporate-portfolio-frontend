"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { stats } from "@/lib/data/stats";

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

function Counter({ stat }: { stat: (typeof stats)[number] }) {
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
      <p className="font-display text-4xl font-extrabold text-white sm:text-5xl">
        {value}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-slate-300 sm:text-base">{stat.label}</p>
    </div>
  );
}

export function StatsCounter() {
  return (
    <section className="bg-ink-950 py-14 sm:py-16">
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
