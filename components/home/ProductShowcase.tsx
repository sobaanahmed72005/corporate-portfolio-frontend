"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { GradientPillLink } from "@/components/ui/GradientPillLink";
import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { cn } from "@/lib/cn";
import { deriveGradientStops, deriveTint } from "@/lib/theme";
import type { ProductCategory, CompanyInfo } from "@/lib/cms";
import { safeHref } from "@/lib/safe-url";

export function ProductShowcase({
  productCategories,
  company,
}: {
  productCategories: ProductCategory[];
  company: CompanyInfo;
}) {
  const [activeSlug, setActiveSlug] = useState(productCategories[0]?.slug);
  const active = productCategories.find((c) => c.slug === activeSlug) ?? productCategories[0];
  const [featured, ...rest] = active?.products ?? [];

  if (!active || !featured) return null;

  return (
    <section className="border-t-2 border-pageText-950/15 bg-page-950 py-14 sm:py-20">
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
            <div className="grid overflow-hidden rounded-3xl border border-cardText-950/10 shadow-sm sm:grid-cols-[220px_1fr]">
              <div className="flex items-center justify-center border-b border-cardText-950/10 bg-card-950 p-8 sm:border-b-0 sm:border-r">
                {featured.image ? (
                  <ImageSlot
                    src={featured.image}
                    alt={featured.name}
                    aspect="square"
                    className="w-full max-w-[160px] rounded-2xl shadow-md"
                  />
                ) : (
                  <span
                    className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full text-white shadow-md"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, ${deriveGradientStops(active.iconColor).from}, ${deriveGradientStops(active.iconColor).to})`,
                    }}
                  >
                    <Icon name={featured.icon} className="h-12 w-12" aria-hidden />
                  </span>
                )}
              </div>
              <div
                className="flex flex-col items-start gap-3 p-8 sm:p-10"
                style={{ backgroundColor: deriveTint(active.iconColor) }}
              >
                <span
                  className="inline-flex w-fit items-center rounded-full px-3 py-1 font-display text-xs font-bold uppercase tracking-wide text-white"
                  style={{ backgroundColor: active.iconColor }}
                >
                  Featured in {active.shortName}
                </span>
                <h3 className="font-display text-2xl font-extrabold text-cardText-950 sm:text-3xl">
                  {featured.name}
                </h3>
                <p className="max-w-xl text-sm text-cardText-700">{featured.description}</p>
                {/* GradientPillLink's base style is width:full for its usual
                    home (ProductCard, where it should fill the card) — wrap
                    it here so that 100% resolves against this w-fit box
                    instead of stretching across the whole text column. */}
                <div className="w-fit">
                  <GradientPillLink
                    href={safeHref(company.storeUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    color={active.iconColor}
                  >
                    Shop on our Store
                  </GradientPillLink>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {rest.map((product) => (
                <a
                  key={product.slug}
                  href={safeHref(company.storeUrl)}
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
