import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { GRADIENTS, GRADIENT_PILL_BASE } from "@/components/ui/gradients";
import { cn } from "@/lib/cn";
import { productCategories } from "@/lib/data/products";

export function CategoryHighlights() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What We Supply"
          title="Product Categories"
          description="Quality-checked IT accessories and equipment, sourced and supplied for homes, offices, and businesses."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((cat) => (
            <div
              key={cat.slug}
              className="flex flex-col rounded-2xl border border-slate-200 p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <GradientIconBadge icon={cat.icon} gradient={cat.gradient} />
              <h3 className="mt-4 text-lg font-semibold text-ink-950">{cat.name}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">{cat.description}</p>
              <Link
                href={`/products#${cat.slug}`}
                className={cn(GRADIENT_PILL_BASE, GRADIENTS[cat.gradient].pill, "mt-5")}
              >
                View Products <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
