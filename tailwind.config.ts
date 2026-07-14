import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Values come from CSS custom properties set at request time in
        // app/layout.tsx, derived (lib/theme.ts) from corporate-portfolio-cms's
        // theme-setting single type. Editing a color in Strapi recolors every
        // class in that family site-wide — no code change needed. Fallback
        // values baked into lib/cms.ts's DEFAULT_THEME match the hex values
        // these used to be hardcoded to.
        brand: {
          50: "var(--brand-50)",
          100: "var(--brand-100)",
          200: "var(--brand-200)",
          300: "var(--brand-300)",
          400: "var(--brand-400)",
          500: "var(--brand-500)",
          600: "var(--brand-600)",
          700: "var(--brand-700)",
          800: "var(--brand-800)",
          900: "var(--brand-900)",
          950: "var(--brand-950)",
        },
        accent: {
          50: "var(--accent-50)",
          100: "var(--accent-100)",
          200: "var(--accent-200)",
          300: "var(--accent-300)",
          400: "var(--accent-400)",
          500: "var(--accent-500)",
          600: "var(--accent-600)",
          700: "var(--accent-700)",
          800: "var(--accent-800)",
          900: "var(--accent-900)",
        },
        // header/footer/page/card each have their own independent dark-
        // surface color (their own Strapi field, replacing what used to be
        // one shared "ink" family); button/navHighlight likewise replace
        // brandColor's two former split roles.
        header: {
          50: "var(--header-50)",
          100: "var(--header-100)",
          200: "var(--header-200)",
          300: "var(--header-300)",
          400: "var(--header-400)",
          500: "var(--header-500)",
          600: "var(--header-600)",
          700: "var(--header-700)",
          800: "var(--header-800)",
          900: "var(--header-900)",
          950: "var(--header-950)",
        },
        footer: {
          50: "var(--footer-50)",
          100: "var(--footer-100)",
          200: "var(--footer-200)",
          300: "var(--footer-300)",
          400: "var(--footer-400)",
          500: "var(--footer-500)",
          600: "var(--footer-600)",
          700: "var(--footer-700)",
          800: "var(--footer-800)",
          900: "var(--footer-900)",
          950: "var(--footer-950)",
        },
        page: {
          50: "var(--page-50)",
          100: "var(--page-100)",
          200: "var(--page-200)",
          300: "var(--page-300)",
          400: "var(--page-400)",
          500: "var(--page-500)",
          600: "var(--page-600)",
          700: "var(--page-700)",
          800: "var(--page-800)",
          900: "var(--page-900)",
          950: "var(--page-950)",
        },
        card: {
          50: "var(--card-50)",
          100: "var(--card-100)",
          200: "var(--card-200)",
          300: "var(--card-300)",
          400: "var(--card-400)",
          500: "var(--card-500)",
          600: "var(--card-600)",
          700: "var(--card-700)",
          800: "var(--card-800)",
          900: "var(--card-900)",
          950: "var(--card-950)",
        },
        button: {
          50: "var(--button-50)",
          100: "var(--button-100)",
          200: "var(--button-200)",
          300: "var(--button-300)",
          400: "var(--button-400)",
          500: "var(--button-500)",
          600: "var(--button-600)",
          700: "var(--button-700)",
          800: "var(--button-800)",
          900: "var(--button-900)",
          950: "var(--button-950)",
        },
        navHighlight: {
          50: "var(--navHighlight-50)",
          100: "var(--navHighlight-100)",
          200: "var(--navHighlight-200)",
          300: "var(--navHighlight-300)",
          400: "var(--navHighlight-400)",
          500: "var(--navHighlight-500)",
          600: "var(--navHighlight-600)",
          700: "var(--navHighlight-700)",
          800: "var(--navHighlight-800)",
          900: "var(--navHighlight-900)",
          950: "var(--navHighlight-950)",
        },
      },
      fontFamily: {
        // Aliased in app/layout.tsx to whichever font pairing (lib/theme.ts's
        // FONT_PAIRINGS) the theme-setting fontPairing field selected.
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        // Every existing rounded-lg/xl/2xl/3xl class site-wide becomes
        // theme-controlled via radiusStyle — rounded-full is deliberately
        // untouched (pills/avatars are structural, not a "roundness" choice).
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
      },
      boxShadow: {
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        // Duration scales with TrustTicker's 4x content block so the
        // on-screen pixel speed matches what it was before that change.
        marquee: "marquee 112s linear infinite",
        "marquee-reverse": "marquee-reverse 128s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
