import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { GRADIENTS, GRADIENT_PILL_BASE } from "@/components/ui/gradients";
import { cn } from "@/lib/cn";
import { portfolioCategories } from "@/lib/data/portfolio";

const featured = portfolioCategories.map((category) => ({
  category,
  project: category.projects[0],
}));

export function PortfolioPreview() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Our Work"
          title="Recent Projects"
          description="A sample of the CCTV, solar, networking, and supply projects we've delivered for clients."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map(({ category, project }) => (
            <Link
              key={project.slug}
              href={`/portfolio#${category.slug}`}
              className="flex flex-col rounded-2xl border border-slate-200 p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <GradientIconBadge icon={project.icon} gradient={category.gradient} />
              <h3 className="mt-4 text-base font-semibold text-ink-950">{project.title}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">{project.summary}</p>
              <span className="mt-4 inline-block w-fit rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-500">
                {project.highlight}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/portfolio"
            className={cn(GRADIENT_PILL_BASE, GRADIENTS.blue.pill, "w-fit")}
          >
            View Full Portfolio <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}