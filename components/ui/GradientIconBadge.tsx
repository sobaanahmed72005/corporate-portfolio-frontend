import { Icon, type IconName } from "@/components/ui/Icon";
import { deriveGradientStops } from "@/lib/theme";
import { cn } from "@/lib/cn";

export function GradientIconBadge({
  icon,
  color,
  size = "md",
  className,
}: {
  icon: IconName;
  /** Hex color picked per category/service/course in Strapi; a darker
   * second stop is derived automatically for the badge's gradient look. */
  color: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "h-11 w-11 rounded-lg",
    md: "h-12 w-12 rounded-xl",
    lg: "h-14 w-14 rounded-xl",
  };
  const iconSizes = { sm: "h-5 w-5", md: "h-6 w-6", lg: "h-7 w-7" };
  const stops = deriveGradientStops(color);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center text-white shadow-sm",
        sizeClasses[size],
        className,
      )}
      style={{ backgroundImage: `linear-gradient(to bottom right, ${stops.from}, ${stops.to})` }}
    >
      <Icon name={icon} className={iconSizes[size]} aria-hidden />
    </span>
  );
}
