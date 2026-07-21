"use client";

import { useEffect, useState } from "react";

const CHAR_INTERVAL_MS = 32;

/**
 * Types `text` out one character at a time once `active` is true, then drops
 * the caret. The full string stays in the DOM (aria-hidden'd during the
 * animation) via a separate sr-only span so screen readers always get the
 * whole string, never the partial in-progress one.
 *
 * `active` + `onDone` let a parent chain several of these into one
 * typewriter sequence — each block waits for the previous to finish before
 * it starts.
 */
export function TypewriterText({
  text,
  className,
  startDelayMs = 150,
  active = true,
  onDone,
}: {
  text: string;
  className?: string;
  startDelayMs?: number;
  active?: boolean;
  onDone?: () => void;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          if (interval) clearInterval(interval);
          onDone?.();
        }
      }, CHAR_INTERVAL_MS);
    }, startDelayMs);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
    // onDone is a fresh closure each render — only re-run when the actual
    // typing inputs change, not when the parent re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, startDelayMs, active]);

  const typing = active && count < text.length;

  return (
    <span className={className}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {typing && (
          <span className="ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] animate-blink bg-current align-middle" />
        )}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
