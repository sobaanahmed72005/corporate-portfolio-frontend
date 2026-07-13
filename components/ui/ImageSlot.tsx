import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";

const aspectClasses = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

/**
 * A real media slot: renders `src` when given one, otherwise a deliberate
 * "add a photo here" empty state (dashed border + icon) instead of a broken
 * <img> tag. Swap in a real path once you have the actual photo/logo — no
 * other code needs to change.
 */
export function ImageSlot({
  src,
  alt,
  icon,
  aspect = "square",
  onDark = false,
  className,
}: {
  src?: string;
  alt: string;
  icon?: React.ReactNode;
  aspect?: keyof typeof aspectClasses;
  onDark?: boolean;
  className?: string;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", aspectClasses[aspect], className)}>
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-xl border border-dashed",
        aspectClasses[aspect],
        onDark ? "border-ink-50/20 bg-ink-50/5 text-ink-50/30" : "border-slate-300 bg-slate-100 text-slate-400",
        className,
      )}
      role="img"
      aria-label={alt}
    >
      {icon ?? <ImageIcon className="h-8 w-8" aria-hidden />}
    </div>
  );
}