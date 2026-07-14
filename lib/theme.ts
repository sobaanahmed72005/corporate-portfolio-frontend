/**
 * Derives a full Tailwind-style color scale (50-950) from a single hex value
 * picked in Strapi, and turns that into CSS custom property declarations
 * consumed by tailwind.config.ts (`brand: { 600: "var(--brand-600)" }`, etc).
 *
 * The user only picks one color per family (the shade already used most
 * prominently for buttons/links — see PIVOTS below); every other shade is
 * derived by holding hue/saturation constant and stepping lightness from a
 * near-white anchor down to a near-black anchor, pinned through the picked
 * shade's own lightness. This keeps the rest of the scale visually
 * consistent with whatever color is picked, instead of requiring 30
 * individual hex values.
 */

const SHADE_KEYS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
type Shade = (typeof SHADE_KEYS)[number];

const LIGHT_ANCHOR = 97; // lightness % used for the lightest generated shade
const DARK_ANCHOR = 8; // lightness % used for the darkest generated shade

export type FamilyName =
  | "brand"
  | "accent"
  | "header"
  | "footer"
  | "page"
  | "card"
  | "button"
  | "navHighlight"
  | "headerText"
  | "footerText"
  | "pageText"
  | "cardText";

// Which shade each family's picked color represents, and which shades that
// family actually has (accent has no 950; matches tailwind.config.ts today).
// header/footer/page/card are each an independent dark-surface background
// color (their own Strapi field); headerText/footerText/pageText/cardText
// are each that same zone's independent TEXT color (pivot 50, the lightest
// shade — the opposite anchor from the background families' pivot 950 — so
// darker shades in each text family's scale are progressively more muted
// text, not a second background). button/navHighlight are each an
// independent brand-style accent color — together these replace what used
// to be one shared "ink"/"brand" role split across many different UI zones.
const FAMILIES: Record<FamilyName, { pivot: Shade; shades: readonly Shade[] }> = {
  brand: { pivot: 600, shades: SHADE_KEYS },
  accent: { pivot: 400, shades: SHADE_KEYS.filter((s) => s !== 950) },
  header: { pivot: 950, shades: SHADE_KEYS },
  footer: { pivot: 950, shades: SHADE_KEYS },
  page: { pivot: 950, shades: SHADE_KEYS },
  card: { pivot: 950, shades: SHADE_KEYS },
  button: { pivot: 600, shades: SHADE_KEYS },
  navHighlight: { pivot: 600, shades: SHADE_KEYS },
  headerText: { pivot: 50, shades: SHADE_KEYS },
  footerText: { pivot: 50, shades: SHADE_KEYS },
  pageText: { pivot: 50, shades: SHADE_KEYS },
  cardText: { pivot: 50, shades: SHADE_KEYS },
};

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l: l * 100 };

  const delta = max - min;
  const s = delta / (1 - Math.abs(2 * l - 1));

  let h: number;
  if (max === r) h = ((g - b) / delta) % 6;
  else if (max === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h *= 60;
  if (h < 0) h += 360;

  return { h, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function generateShades(hex: string, family: FamilyName): Partial<Record<Shade, string>> {
  const { pivot, shades } = FAMILIES[family];
  const { h, s, l: pivotL } = hexToHsl(hex);
  const pivotIndex = shades.indexOf(pivot);

  const result: Partial<Record<Shade, string>> = {};

  shades.forEach((shade, i) => {
    if (shade === pivot) {
      result[shade] = hex; // exact — no rounding drift on the color the user actually picked
      return;
    }
    const l =
      i < pivotIndex
        ? LIGHT_ANCHOR + ((pivotL - LIGHT_ANCHOR) * i) / pivotIndex
        : pivotL + ((DARK_ANCHOR - pivotL) * (i - pivotIndex)) / (shades.length - 1 - pivotIndex);
    result[shade] = hslToHex(h, s, l);
  });

  return result;
}

export type ThemeColors = Record<FamilyName, string>;

/** Returns a CSS string of custom property declarations, e.g. "--brand-50:#eaf0ff;--brand-100:#d6e0ff;...". */
export function buildThemeCssVars(colors: ThemeColors): string {
  const declarations: string[] = [];

  (Object.keys(FAMILIES) as FamilyName[]).forEach((family) => {
    const shades = generateShades(colors[family], family);
    for (const [shade, value] of Object.entries(shades)) {
      declarations.push(`--${family}-${shade}:${value};`);
    }
  });

  return declarations.join("");
}

/**
 * next/font/google requires a static import per font — Strapi can't pick an
 * arbitrary family at runtime. Instead every pairing's fonts are statically
 * imported in app/layout.tsx, and this map just aliases --font-heading and
 * --font-body to whichever pairing's already-loaded CSS variables the enum
 * value in Strapi selected.
 */
export const FONT_PAIRINGS = {
  "Modern Sans (Outfit + Rubik)": { heading: "--font-outfit", body: "--font-rubik" },
  "Editorial Serif (Playfair Display + Source Sans 3)": {
    heading: "--font-playfair",
    body: "--font-source-sans",
  },
  "Technical Grotesk (Space Grotesk + Inter)": { heading: "--font-space-grotesk", body: "--font-inter" },
  "Classic Corporate (Merriweather + Inter)": { heading: "--font-merriweather", body: "--font-inter" },
} as const;

export type FontPairingName = keyof typeof FONT_PAIRINGS;

export function buildFontCssVars(pairing: FontPairingName): string {
  const p = FONT_PAIRINGS[pairing] ?? FONT_PAIRINGS["Modern Sans (Outfit + Rubik)"];
  return `--font-heading:var(${p.heading});--font-body:var(${p.body});`;
}

/**
 * Rather than migrating every rounded-xl/shadow-lg call site across the app,
 * tailwind.config.ts retargets its own borderRadius/boxShadow scale keys to
 * these CSS vars, so every existing utility class becomes theme-controlled
 * with zero component edits. The "current default" values match Tailwind's
 * own stock scale exactly, so the default rollout is visually a no-op.
 */
export const RADIUS_STYLES = {
  "Sharp (minimal rounding)": { lg: "0.25rem", xl: "0.375rem", "2xl": "0.5rem", "3xl": "0.75rem" },
  "Soft (current default)": { lg: "0.5rem", xl: "0.75rem", "2xl": "1rem", "3xl": "1.5rem" },
  "Rounded (pill-like)": { lg: "0.75rem", xl: "1.25rem", "2xl": "1.75rem", "3xl": "2.5rem" },
} as const;

export type RadiusStyleName = keyof typeof RADIUS_STYLES;

export const SHADOW_STYLES = {
  "Flat (minimal shadow)": {
    md: "0 1px 2px -1px rgb(0 0 0 / 0.06)",
    lg: "0 2px 4px -2px rgb(0 0 0 / 0.08)",
    xl: "0 4px 6px -2px rgb(0 0 0 / 0.08)",
  },
  "Subtle (current default)": {
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  "Bold (pronounced depth)": {
    md: "0 8px 12px -2px rgb(0 0 0 / 0.18)",
    lg: "0 16px 24px -4px rgb(0 0 0 / 0.22)",
    xl: "0 28px 36px -8px rgb(0 0 0 / 0.26)",
  },
} as const;

export type ShadowStyleName = keyof typeof SHADOW_STYLES;

export function buildShapeCssVars(radiusStyle: RadiusStyleName, shadowStyle: ShadowStyleName): string {
  const radius = RADIUS_STYLES[radiusStyle] ?? RADIUS_STYLES["Soft (current default)"];
  const shadow = SHADOW_STYLES[shadowStyle] ?? SHADOW_STYLES["Subtle (current default)"];

  const declarations: string[] = [];
  for (const [key, value] of Object.entries(radius)) declarations.push(`--radius-${key}:${value};`);
  for (const [key, value] of Object.entries(shadow)) declarations.push(`--shadow-${key}:${value};`);
  return declarations.join("");
}

/**
 * Category icon badges (products/services/portfolio/courses) each pick one
 * custom color in Strapi; this derives a second, darker stop from it so the
 * badge keeps the same two-stop gradient look the old named-gradient system
 * (components/ui/gradients.ts) had, without the user needing to pick two
 * colors themselves.
 */
export function deriveGradientStops(hex: string): { from: string; to: string } {
  const { h, s, l } = hexToHsl(hex);
  const to = hslToHex(h, s, Math.max(l - 18, 10));
  return { from: hex, to };
}
