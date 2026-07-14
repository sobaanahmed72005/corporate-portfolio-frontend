import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Use light text — for sections with a dark background. */
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-2 font-display text-sm font-semibold uppercase tracking-wide",
            onDark ? "text-brand-300" : "text-brand-600",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-2xl font-extrabold tracking-tight sm:text-3xl",
          onDark ? "text-page-50" : "text-slate-900",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-3 text-base", onDark ? "text-page-400" : "text-slate-600")}>
          {description}
        </p>
      )}
    </div>
  );
}
