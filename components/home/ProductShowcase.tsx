"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { ProductCard } from "@/components/products/ProductCard";
import { cn } from "@/lib/cn";
import { productCategories } from "@/lib/data/products";

export function ProductShowcase() {
  const [activeSlug, setActiveSlug] = useState(productCategories[0].slug);
  const active = productCategories.find((c) => c.slug === activeSlug) ?? productCategories[0];

  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Products"
          title="Browse by Category"
          description="Everything we supply, grouped so you can find what you need in one place."
        />

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Product categories">
          {productCategories.map((category) => (
            <button
              key={category.slug}
              type="button"
              role="tab"
              aria-selected={category.slug === active.slug}
              onClick={() => setActiveSlug(category.slug)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                category.slug === active.slug
                  ? "border-ink-950 bg-ink-950 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-ink-950",
              )}
            >
              <GradientIconBadge icon={category.icon} gradient={category.gradient} size="sm" className="h-6 w-6 rounded-full" />
              {category.shortName}
            </button>
          ))}
        </div>

        <div role="tabpanel" className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {active.products.map((product) => (
            <ProductCard key={product.slug} product={product} gradient={active.gradient} />
          ))}
        </div>
      </Container>
    </section>
  );
}
