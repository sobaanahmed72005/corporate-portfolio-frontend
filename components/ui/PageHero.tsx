import { Container } from "@/components/ui/Container";

/**
 * Shared page-title band for every inner page (About, Blog, Portfolio,
 * Contact, Services, Products, Testimonials) — was previously duplicated
 * inline in each page.tsx with a flat bg-section-50 fill. Now layers the
 * same soft radial-gradient technique as the homepage Hero on top of that
 * fill for a less flat look, using plain element opacity (not a Tailwind
 * color-opacity modifier — bg-section-50/NN doesn't render correctly here
 * since the CSS custom properties this theme is built on hold full hex
 * strings, not the space-separated RGB channels that modifier needs).
 */
export function PageHero({ title, description }: { title: string; description?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-section-200 bg-section-50 py-14">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, var(--brand-600) 0, transparent 40%), radial-gradient(circle at 85% 0%, var(--accent-400) 0, transparent 45%)",
        }}
        aria-hidden
      />
      <Container className="relative">
        <h1 className="font-display text-3xl font-extrabold text-sectionText-950 sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sectionText-600">{description}</p>}
      </Container>
    </section>
  );
}
