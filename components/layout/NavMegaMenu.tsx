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
  // dropdown again the instant the timer alone ran out.
  const [suppressHover, setSuppressHover] = useState(false);
  const [timerElapsed, setTimerElapsed] = useState(true);
  const [hasLeftSinceClick, setHasLeftSinceClick] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerElapsed && hasLeftSinceClick) setSuppressHover(false);
  }, [timerElapsed, hasLeftSinceClick]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    setSuppressHover(true);
    setTimerElapsed(false);
    setHasLeftSinceClick(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setTimerElapsed(true), HOVER_SUPPRESS_MS);
  };

  return (
    <div className="group relative" onMouseLeave={() => setHasLeftSinceClick(true)}>
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
        className={cn(
          "invisible absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 translate-y-2 rounded-2xl border border-contentCard-200 bg-contentCard-50 p-5 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-1 group-hover:opacity-100",
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