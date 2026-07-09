"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { GRADIENT_PILL_BASE, GRADIENTS } from "@/components/ui/gradients";
import { Icon } from "@/components/ui/Icon";
import { company } from "@/lib/data/company";
import { cn } from "@/lib/cn";
import { productCategories } from "@/lib/data/products";

export function ProductShowcase() {
  const [activeSlug, setActiveSlug] = useState(productCategories[0].slug);
  const active = productCategories.find((c) => c.slug === activeSlug) ?? productCategories[0];
  const [featured, ...rest] = active.products;

  return (
    <section className="bg-black py-16 sm:py-24">
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
                    ? "border-brand-600 bg-brand-600/10 text-white"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:text-white",
                )}
              >
                <GradientIconBadge icon={category.icon} gradient={category.gradient} size="sm" className="h-9 w-9 shrink-0 rounded-lg" />
                <span className="whitespace-nowrap lg:whitespace-normal">{category.shortName}</span>
              </button>
            ))}
          </div>

          {/* Featured panel + rest of category */}
          <div>
            <div
              className={cn(
                "flex flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-br p-8 sm:flex-row sm:items-center sm:p-10",
                GRADIENTS[active.gradient].badge,
              )}
            >
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
                <Icon name={featured.icon} className="h-10 w-10" aria-hidden />
              </span>
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
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-display font-semibold uppercase tracking-wide text-ink-950"
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
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/25 hover:bg-white/10"
                >
                  <GradientIconBadge icon={product.icon} gradient={active.gradient} size="sm" />
                  <span className="text-sm font-medium text-white">{product.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/products" className={cn(GRADIENT_PILL_BASE, GRADIENTS.blue.pill, "w-fit")}>
            View All Products <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
