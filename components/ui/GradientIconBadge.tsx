import { Icon, type IconName } from "@/components/ui/Icon";
import { GRADIENTS, type GradientName } from "@/components/ui/gradients";
import { cn } from "@/lib/cn";

export function GradientIconBadge({
  icon,
  gradient,
  size = "md",
  className,
}: {
  icon: IconName;
  gradient: GradientName;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "h-11 w-11 rounded-lg",
    md: "h-12 w-12 rounded-xl",
    lg: "h-14 w-14 rounded-xl",
  };
  const iconSizes = { sm: "h-5 w-5", md: "h-6 w-6", lg: "h-7 w-7" };

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center bg-gradient-to-br text-white shadow-sm",
        GRADIENTS[gradient].badge,
        sizeClasses[size],
        className,
      )}
    >
      <Icon name={icon} className={iconSizes[size]} aria-hidden />
    </span>
  );
}
