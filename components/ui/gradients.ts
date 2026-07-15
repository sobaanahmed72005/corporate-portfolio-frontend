/**
 * Shared pill shape for CTA links whose gradient fill is derived per-item
 * from a Strapi iconColor (via deriveGradientStops) and applied inline —
 * see ServiceCard.tsx / GradientPillLink.tsx.
 */
export const GRADIENT_PILL_BASE =
  "inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition-transform hover:scale-[1.02] hover:shadow-md";
