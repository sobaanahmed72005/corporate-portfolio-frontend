import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";

const aspectClasses = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

export function ImageSlot({
  src,
  alt,
  icon,
  aspect = "square",
  onDark = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  className,
}: {
  src?: string;
  alt: string;
  icon?: React.ReactNode;
  aspect?: keyof typeof aspectClasses;
  onDark?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", aspectClasses[aspect], className)}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-xl border border-dashed",
        aspectClasses[aspect],
        onDark
          ? "border-cardText-50/20 bg-cardText-50/5 text-cardText-50/30"
          : "border-contentCardText-300 bg-contentCard-100 text-contentCardText-600",
        className,
      )}
      role="img"
      aria-label={alt}
    >
      {icon ?? <ImageIcon className="h-8 w-8" aria-hidden />}
    </div>
  );
}