import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onDark = false,
  onSection = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Use light text — for sections with a dark background. */
  onDark?: boolean;
  /** Use section text color instead of the (default) content-card text color
   * — for use inside a light gray banner/divider section rather than a
   * white card area. Ignored when onDark is set. */
  onSection?: boolean;
  className?: string;
}) {
  const textColor = onDark
    ? "text-pageText-50"
    : onSection
      ? "text-sectionText-950"
      : "text-contentCardText-950";
  const descriptionColor = onDark
    ? "text-pageText-400"
    : onSection
      ? "text-sectionText-600"
      : "text-contentCardText-600";

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
          textColor,
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-3 text-base", descriptionColor)}>
          {description}
        </p>
      )}
    </div>
  );
}
