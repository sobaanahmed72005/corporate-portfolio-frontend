import { ArrowRight } from "lucide-react";
import { GRADIENT_PILL_BASE } from "@/components/ui/gradients";
import { deriveGradientStops } from "@/lib/theme";
import { cn } from "@/lib/cn";

export function GradientPillLink({
  href,
  color,
  children,
  target,
  rel,
  className,
}: {
  href: string;
  /** Hex color picked per category in Strapi; a darker second stop is
   * derived automatically for the pill's gradient look. */
  color: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  className?: string;
}) {
  const stops = deriveGradientStops(color);

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(GRADIENT_PILL_BASE, className)}
      style={{ backgroundImage: `linear-gradient(to right, ${stops.from}, ${stops.to})` }}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </a>
  );
}
