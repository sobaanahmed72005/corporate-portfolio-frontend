"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { company } from "@/lib/data/company";
import { cn } from "@/lib/cn";
import { deriveGradientStops } from "@/lib/theme";
import type { ProductCategory } from "@/lib/cms";

export function ProductShowcase({ productCategories }: { productCategories: ProductCategory[] }) {
  const [activeSlug, setActiveSlug] = useState(productCategories[0]?.slug);
  const active = productCategories.find((c) => c.slug === activeSlug) ?? productCategories[0];
  const [featured, ...rest] = active?.products ?? [];

  if (!active || !featured) return null;

  return (
    <section className="border-t border-pageText-950/10 bg-page-950 py-20 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Products"
          title="Browse by Category"
          description="Everything we supply, grouped so you can find what you need in one place."
          onDark
        />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          {/* Category rail */}
          <div role="tablist" aria-label="Product categories" className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {productCategories.map((category) => (
              <button
                key={category.slug}
                type="button"
                role="tab"
                aria-selected={category.slug === active.slug}
                onClick={() => setActiveSlug(category.slug)}
                className={cn(
                  "flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors lg:shrink",
                  category.slug === active.slug
                    ? "border-brand-600 bg-brand-600/10 text-cardText-950"
                    : "border-cardText-950/10 bg-card-950 text-cardText-800 hover:border-cardText-950/25 hover:text-cardText-950",
                )}
              >
                <GradientIconBadge icon={category.icon} color={category.iconColor} size="sm" className="h-9 w-9 shrink-0 rounded-lg" />
                <span className="whitespace-nowrap lg:whitespace-normal">{category.shortName}</span>
              </button>
            ))}
          </div>

          {/* Featured panel + rest of category */}
          <div>
            <div
              className="flex flex-col gap-6 rounded-3xl border border-white/10 p-8 sm:flex-row sm:items-center sm:p-10"
              style={{
                backgroundImage: `linear-gradient(to bottom right, ${deriveGradientStops(active.iconColor).from}, ${deriveGradientStops(active.iconColor).to})`,
              }}
            >
              {featured.image ? (
                <ImageSlot
                  src={featured.image}
                  alt={featured.name}
                  aspect="square"
                  className="w-full shrink-0 rounded-2xl sm:w-32"
                />
              ) : (
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
                  <Icon name={featured.icon} className="h-10 w-10" aria-hidden />
                </span>
              )}
              <div>
                <p className="font-display text-xs font-semibold uppercase tracking-wide text-white/70">
                  Featured in {active.shortName}
                </p>
                <h3 className="mt-1 font-display text-2xl font-extrabold text-white">{featured.name}</h3>
                <p className="mt-2 max-w-xl text-sm text-white/85">{featured.description}</p>
                <a
                  href={company.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-sm font-sans font-semibold text-slate-900 transition-all duration-300 ease-out hover:-translate-y-0.5"
                >
                  Shop on our Store <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {rest.map((product) => (
                <a
                  key={product.slug}
                  href={company.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-cardText-950/10 bg-card-950 p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:border-cardText-950/25 hover:shadow-md"
                >
                  <GradientIconBadge icon={product.icon} color={active.iconColor} size="sm" />
                  <span className="text-sm font-medium text-cardText-950">{product.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <LinkButton href="/products" variant="brand" size="sm" className="w-fit">
            View All Products <ArrowRight className="h-4 w-4" aria-hidden />
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
