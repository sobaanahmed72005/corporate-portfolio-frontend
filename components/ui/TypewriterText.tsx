"use client";

import { useEffect, useState } from "react";

const CHAR_INTERVAL_MS = 32;

/**
 * Types `text` out one character at a time on mount, then leaves a blinking
 * caret behind. The full string stays in the DOM (aria-hidden'd during the
 * animation) via a separate sr-only span so screen readers always get the
 * whole heading, never the partial in-progress one.
 */
export function TypewriterText({
  text,
  className,
  startDelayMs = 150,
}: {
  text: string;
  className?: string;
  startDelayMs?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length && interval) clearInterval(interval);
      }, CHAR_INTERVAL_MS);
    }, startDelayMs);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, startDelayMs]);

  return (
    <span className={className}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span className="ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] animate-blink bg-current align-middle" />
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
