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
        // Vivid blue — the site's primary brand color (matches reference: #0324FF).
        brand: {
          50: "#eaf0ff",
          100: "#d6e0ff",
          200: "#adc0ff",
          300: "#7d9bff",
          400: "#4a6fff",
          500: "#1f47ff",
          600: "#0324ff",
          700: "#021ecc",
          800: "#021999",
          900: "#011366",
          950: "#010a33",
        },
        // Orange accent (matches reference: #FFA31A).
        accent: {
          50: "#fff8ec",
          100: "#ffedc9",
          200: "#ffd88d",
          300: "#ffc257",
          400: "#ffa31a",
          500: "#f79009",
          600: "#dd7706",
          700: "#b75d09",
          800: "#94480e",
          900: "#792f0f",
        },
        // Near-black — the site's dominant button/UI color (matches reference: #000000/#181818).
        ink: {
          50: "#f5f5f5",
          100: "#e5e5e5",
          200: "#d4d4d4",
          300: "#a3a3a3",
          400: "#737373",
          500: "#525252",
          600: "#404040",
          700: "#262626",
          800: "#171717",
          900: "#0a0a0a",
          950: "#000000",
        },
      },
      fontFamily: {
        sans: ["var(--font-rubik)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
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
