import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
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
        <p className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-brand-600">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base text-slate-600">{description}</p>
      )}
    </div>
  );
}
