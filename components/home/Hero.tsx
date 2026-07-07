import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { company } from "@/lib/data/company";
import { productCategories } from "@/lib/data/products";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, #0324ff 0, transparent 30%), radial-gradient(circle at 85% 0%, #ffa31a 0, transparent 30%)",
        }}
        aria-hidden
      />
      <Container className="relative py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-brand-600">
            IT Accessories &middot; Security &middot; Solar &middot; Networking
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-950 sm:text-5xl">
            {company.tagline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            {company.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/products" size="lg" variant="brand">
              Browse Products <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
            <LinkButton href="/contact" size="lg" variant="outline">
              Get a Quote
            </LinkButton>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {productCategories.map((cat) => (
            <div
              key={cat.slug}
              className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm"
            >
              <GradientIconBadge icon={cat.icon} gradient={cat.gradient} size="sm" className="rounded-full" />
              <span className="text-xs font-medium text-slate-700 sm:text-sm">
                {cat.shortName}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
