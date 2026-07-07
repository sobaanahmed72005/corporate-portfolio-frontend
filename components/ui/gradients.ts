/**
 * Named gradients used for category/service icon badges and CTA pills.
 * Kept as full literal class strings (not constructed dynamically) so
 * Tailwind's JIT scanner picks them up — data files only ever store the
 * key, never the class string itself.
 */
export const GRADIENTS = {
  blue: { badge: "from-sky-500 to-blue-600", pill: "from-sky-500 to-blue-600" },
  indigo: { badge: "from-indigo-500 to-blue-700", pill: "from-indigo-500 to-blue-700" },
  green: { badge: "from-emerald-500 to-teal-600", pill: "from-emerald-500 to-teal-600" },
  orange: { badge: "from-amber-500 to-orange-600", pill: "from-amber-500 to-orange-600" },
  purple: { badge: "from-violet-500 to-purple-600", pill: "from-violet-500 to-purple-600" },
  rose: { badge: "from-rose-500 to-pink-600", pill: "from-rose-500 to-pink-600" },
  cyan: { badge: "from-cyan-500 to-sky-600", pill: "from-cyan-500 to-sky-600" },
  slate: { badge: "from-slate-600 to-slate-800", pill: "from-slate-600 to-slate-800" },
} as const;

export type GradientName = keyof typeof GRADIENTS;

export const GRADIENT_PILL_BASE =
  "inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition-transform hover:scale-[1.02] hover:shadow-md";
