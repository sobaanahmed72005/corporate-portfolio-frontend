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
import { deriveGradientStops } from "@/lib/theme";
import type { ProductCategory, CompanyInfo } from "@/lib/cms";
import { safeHref } from "@/lib/safe-url";

// contain (show the whole photo, letterboxed) only looks right on a plain
// white-background product/logo shot — the white backing blends in
// seamlessly. On a real environmental photo (its own background, its own
// lighting) the same letterboxing shows as ugly white bars around the
// photo, so those should fill the frame with cover instead, cropping being
// the smaller visual sin of the two. Slugs confirmed white-background during
// image sourcing; anything not listed here (including future products)
// defaults to cover, since a photo unexpectedly getting cropped is a much
// smaller problem than one unexpectedly getting white-letterboxed.
const WHITE_BACKGROUND_PRODUCT_SLUGS = new Set([
  "hikvision-cctv-cameras",
  "gan-fast-wall-charger",
  "laptop-hard-drives",
  "monocrystalline-panels",
]);

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

  const featuredImageFit = WHITE_BACKGROUND_PRODUCT_SLUGS.has(featured.slug) ? "contain" : "cover";

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
            {/* Diagonal split: a hard-edged color wedge cuts in from the
                right instead of a straight seam. The wedge only renders at
                sm+ (a diagonal needs width to read as a diagonal rather
                than a stripe) — below that this is just a plain white card
                with the image badge and colored tag carrying the category
                identity, no diagonal. */}
            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-card-950 shadow-sm sm:min-h-[230px] sm:flex-row sm:items-center">
              <div
                className="pointer-events-none absolute inset-0 hidden sm:block"
                style={{
                  backgroundImage: `linear-gradient(115deg, transparent 0%, transparent 42%, ${deriveGradientStops(active.iconColor).from} 46%, ${deriveGradientStops(active.iconColor).to} 100%)`,
                }}
                aria-hidden
              />

              <div className="relative flex items-center gap-4 p-8 sm:gap-6 sm:pr-4">
                {/* contain (whole photo, letterboxed on white) only looks
                    right for the white-background product/logo shots in
                    WHITE_BACKGROUND_PRODUCT_SLUGS above — real environmental
                    photos (their own background/lighting, e.g. Ubiquiti's
                    lit product shot) fill the frame with cover instead, so
                    they don't get ugly white bars around them. */}
                {featured.image ? (
                  <ImageSlot
                    src={featured.image}
                    alt={featured.name}
                    aspect="square"
                    fit={featuredImageFit}
                    className={cn(
                      "w-24 shrink-0 rounded-2xl shadow-md sm:w-28",
                      featuredImageFit === "contain" && "bg-white p-2",
                    )}
                  />
                ) : (
                  <span
                    className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl text-white shadow-md sm:h-28 sm:w-28"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, ${deriveGradientStops(active.iconColor).from}, ${deriveGradientStops(active.iconColor).to})`,
                    }}
                  >
                    <Icon name={featured.icon} className="h-10 w-10 sm:h-12 sm:w-12" aria-hidden />
                  </span>
                )}
                <div className="min-w-0 sm:max-w-[180px]">
                  <span
                    className="font-display text-xs font-bold uppercase tracking-wide"
                    style={{ color: active.iconColor }}
                  >
                    Featured — {active.shortName}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-extrabold leading-tight text-cardText-950 sm:text-xl">
                    {featured.name}
                  </h3>
                </div>
              </div>

              <div className="relative flex flex-col items-start gap-3 p-8 pt-0 sm:ml-auto sm:max-w-xs sm:p-10">
                <p className="text-sm text-cardText-700 sm:text-white/90">{featured.description}</p>
                {/* GradientPillLink's base style is width:full for its usual
                    home (ProductCard, where it should fill the card) — wrap
                    it here so that 100% resolves against this w-fit box
                    instead of stretching across the whole panel. */}
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
