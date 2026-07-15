/**
 * Shared shape for CTA links whose gradient fill is derived per-item from a
 * Strapi iconColor (via deriveGradientStops) and applied inline — see
 * ServiceCard.tsx / GradientPillLink.tsx.
 */
export const GRADIENT_PILL_BASE =
  "inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md";
