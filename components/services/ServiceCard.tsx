import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { GRADIENTS, GRADIENT_PILL_BASE } from "@/components/ui/gradients";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div
      id={service.slug}
      className="scroll-mt-24 flex flex-col rounded-2xl border border-slate-200 p-6 shadow-sm transition-shadow hover:shadow-lg"
    >
      <GradientIconBadge icon={service.icon} gradient={service.gradient} />
      <h2 className="mt-4 text-lg font-semibold text-ink-950">{service.name}</h2>
      <p className="mt-2 text-sm text-slate-600">{service.description}</p>
      <ul className="mt-4 flex-1 space-y-2">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href="/contact"
        className={cn(GRADIENT_PILL_BASE, GRADIENTS[service.gradient].pill, "mt-5")}
      >
        Request This Service <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
