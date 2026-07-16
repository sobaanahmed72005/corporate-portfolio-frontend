"use client";

import { useEffect } from "react";

// This only fires when the ROOT layout itself throws (e.g. every CMS fetch
// in app/layout.tsx failing at once) — regular error.tsx can't catch that,
// since it renders inside the layout that just crashed. Because the layout
// crashed, its theme <style> block and fonts never ran, so this can't rely
// on Tailwind's theme(var(--...)) classes or next/font — plain inline
// styles only, so it always renders something readable.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global-error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "24px",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          background: "#FFFFFF",
          color: "#0F172A",
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563EB" }}>
          We&rsquo;re having a hiccup
        </p>
        <h1 style={{ marginTop: 12, fontSize: 28, fontWeight: 800 }}>The site is temporarily unavailable</h1>
        <p style={{ marginTop: 12, maxWidth: 420, color: "#475569" }}>
          Please try again in a moment. If this keeps happening, let us know.
        </p>
        <button
          onClick={() => reset()}
          style={{
            marginTop: 28,
            padding: "12px 24px",
            borderRadius: 12,
            border: "none",
            background: "#2563EB",
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
