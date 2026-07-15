import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { GRADIENT_PILL_BASE } from "@/components/ui/gradients";
import { deriveGradientStops } from "@/lib/theme";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/cms";

export function ServiceCard({ service }: { service: Service }) {
  const stops = deriveGradientStops(service.iconColor);

  return (
    <div
      id={service.slug}
      className="scroll-mt-24 flex flex-col rounded-3xl border border-contentCard-200 bg-contentCard-50 p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-lg"
    >
      <GradientIconBadge icon={service.icon} color={service.iconColor} />
      <h2 className="mt-4 text-lg font-semibold text-contentCardText-950">{service.name}</h2>
      <p className="mt-2 text-sm text-contentCardText-600">{service.description}</p>
      <ul className="mt-4 flex-1 space-y-2">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-contentCardText-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href="/contact"
        className={cn(GRADIENT_PILL_BASE, "mt-5")}
        style={{ backgroundImage: `linear-gradient(to right, ${stops.from}, ${stops.to})` }}
      >
        Request This Service <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
