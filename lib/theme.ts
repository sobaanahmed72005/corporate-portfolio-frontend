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

export type FamilyName = "brand" | "accent" | "ink";

// Which shade each family's picked color represents, and which shades that
// family actually has (accent has no 950; matches tailwind.config.ts today).
const FAMILIES: Record<FamilyName, { pivot: Shade; shades: readonly Shade[] }> = {
  brand: { pivot: 600, shades: SHADE_KEYS },
  accent: { pivot: 400, shades: SHADE_KEYS.filter((s) => s !== 950) },
  ink: { pivot: 950, shades: SHADE_KEYS },
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

export type ThemeColors = {
  brand: string;
  accent: string;
  ink: string;
};

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
