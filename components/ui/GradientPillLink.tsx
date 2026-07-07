import { ArrowRight } from "lucide-react";
import { GRADIENTS, GRADIENT_PILL_BASE, type GradientName } from "@/components/ui/gradients";
import { cn } from "@/lib/cn";

export function GradientPillLink({
  href,
  gradient,
  children,
  target,
  rel,
  className,
}: {
  href: string;
  gradient: GradientName;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(GRADIENT_PILL_BASE, GRADIENTS[gradient].pill, className)}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </a>
  );
}
