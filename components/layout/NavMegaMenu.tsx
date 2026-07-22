"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { LinkButton } from "@/components/ui/Button";
import type { IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const HOVER_SUPPRESS_MS = 2000;

export type MegaMenuItem = {
  href: string;
  title: string;
  description: string;
  icon: IconName;
  iconColor: string;
};

export function NavMegaMenu({
  label,
  href,
  active,
  items,
  cta,
}: {
  label: string;
  href: string;
  active?: boolean;
  items: MegaMenuItem[];
  cta: { title: string; description: string; ctaLabel: string; href: string };
}) {
  // Reopening the dropdown after a click requires BOTH: the suppression
  // timer has elapsed, AND the cursor has actually left the trigger at least
  // once. Without the second condition, a cursor that never moves (e.g. the
  // page navigated but the mouse stayed put) would let group-hover show the
  // dropdown again the instant the timer alone ran out. suppressHover is
  // fully derived from the other two — no separate state/effect needed.
  const [timerElapsed, setTimerElapsed] = useState(true);
  const [hasLeftSinceClick, setHasLeftSinceClick] = useState(true);
  const suppressHover = !timerElapsed || !hasLeftSinceClick;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The panel is centered under whichever trigger renders it (Products,
  // Services, Portfolio, ...) via left-1/2 + translateX(-50%). That's fine
  // until the trigger sits close to a screen edge, or the viewport itself is
  // narrow (a phone, or a zoomed-in desktop browser) — a fixed centered
  // 560px panel then runs off-screen. Rather than special-case any one
  // trigger or breakpoint, this measures the actual trigger position and
  // viewport width and nudges the panel's horizontal offset just enough to
  // keep it fully on-screen, however narrow the gap or wherever the trigger
  // sits — so no future trigger/screen-size combination needs its own fix.
  const groupRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [shiftPx, setShiftPx] = useState(0);

  useEffect(() => {
    const EDGE_MARGIN = 12;

    function recalculate() {
      const groupEl = groupRef.current;
      const panelEl = panelRef.current;
      if (!groupEl || !panelEl) return;

      const groupRect = groupEl.getBoundingClientRect();
      const panelWidth = panelEl.offsetWidth;
      const idealLeft = groupRect.left + groupRect.width / 2 - panelWidth / 2;
      const maxLeft = Math.max(EDGE_MARGIN, window.innerWidth - panelWidth - EDGE_MARGIN);
      const clampedLeft = Math.min(Math.max(idealLeft, EDGE_MARGIN), maxLeft);

      setShiftPx(clampedLeft - idealLeft);
    }

    recalculate();
    window.addEventListener("resize", recalculate);
    return () => window.removeEventListener("resize", recalculate);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    setTimerElapsed(false);
    setHasLeftSinceClick(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setTimerElapsed(true), HOVER_SUPPRESS_MS);
  };

  return (
    <div ref={groupRef} className="group relative" onMouseLeave={() => setHasLeftSinceClick(true)}>
      <Link
        href={href}
        onClick={handleClick}
        className={cn(
          // This trigger sits inline in the header bar alongside Header.tsx's
          // other nav links — it uses the header's own text color, not the
          // dropdown panel's content-card colors below.
          "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-headerText-950 hover:bg-headerText-950/10 hover:text-navHighlight-600",
          active && "bg-headerText-950/10 text-navHighlight-600",
        )}
      >
        {label}
        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-150 group-hover:rotate-180" aria-hidden />
      </Link>

      <div
        ref={panelRef}
        style={{ "--tw-translate-x": `calc(-50% + ${shiftPx}px)` } as React.CSSProperties}
        className={cn(
          // The header is sticky, so the trigger (and this panel, anchored to
          // it) never moves as the page scrolls — at high browser zoom, or on
          // short viewports, the panel can be taller than the space below the
          // header, and without its own scroll the bottom content (the CTA
          // row) was simply unreachable. max-height + overflow-y-auto lets the
          // panel itself scroll instead of relying on page scroll to reach it.
          //
          // Horizontal position is centered under the trigger by default
          // (left-1/2 below), but the actual X offset comes from the
          // --tw-translate-x inline style above (see the shiftPx effect) so
          // it can be nudged back on-screen — translate-y is still driven by
          // the ordinary Tailwind utilities/group-hover below.
          "invisible absolute left-1/2 top-full z-50 max-h-[calc(100vh-8rem)] w-[560px] max-w-[calc(100vw-1.5rem)] translate-y-2 overflow-y-auto rounded-2xl border border-contentCard-200 bg-contentCard-50 p-5 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-1 group-hover:opacity-100",
          suppressHover && "!invisible !opacity-0",
        )}
      >
        <div className="grid grid-cols-2 gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-contentCard-100"
            >
              <GradientIconBadge icon={item.icon} color={item.iconColor} size="sm" />
              <span>
                <span className="block text-sm font-semibold text-contentCardText-950">{item.title}</span>
                <span className="block text-xs text-contentCardText-600">{item.description}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between gap-4 rounded-xl bg-contentCard-100 p-4">
          <div>
            <p className="text-sm font-semibold text-contentCardText-950">{cta.title}</p>
            <p className="text-xs text-contentCardText-600">{cta.description}</p>
          </div>
          <LinkButton href={cta.href} size="sm" variant="brand" className="shrink-0">
            {cta.ctaLabel}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}