import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { LinkButton } from "@/components/ui/Button";
import type { IconName } from "@/components/ui/Icon";
import type { GradientName } from "@/components/ui/gradients";
import { cn } from "@/lib/cn";

export type MegaMenuItem = {
  href: string;
  title: string;
  description: string;
  icon: IconName;
  gradient: GradientName;
};

export function NavMegaMenu({
  label,
  active,
  items,
  cta,
}: {
  label: string;
  active?: boolean;
  items: MegaMenuItem[];
  cta: { title: string; description: string; ctaLabel: string; href: string };
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className={cn(
          "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600",
          active && "bg-slate-50 text-brand-600",
        )}
      >
        {label}
        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-150 group-hover:rotate-180" aria-hidden />
      </button>

      <div className="invisible absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 translate-y-2 rounded-2xl border border-slate-200 bg-white p-5 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-1 group-hover:opacity-100">
        <div className="grid grid-cols-2 gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-50"
            >
              <GradientIconBadge icon={item.icon} gradient={item.gradient} size="sm" />
              <span>
                <span className="block text-sm font-semibold text-ink-950">{item.title}</span>
                <span className="block text-xs text-slate-500">{item.description}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4">
          <div>
            <p className="text-sm font-semibold text-ink-950">{cta.title}</p>
            <p className="text-xs text-slate-500">{cta.description}</p>
          </div>
          <LinkButton href={cta.href} size="sm" variant="brand" className="shrink-0">
            {cta.ctaLabel}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}