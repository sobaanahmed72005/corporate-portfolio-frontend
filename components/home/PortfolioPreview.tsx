import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { GRADIENTS, GRADIENT_PILL_BASE } from "@/components/ui/gradients";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { cn } from "@/lib/cn";
import { getPortfolioCategories } from "@/lib/cms";

export async function PortfolioPreview() {
  const portfolioCategories = await getPortfolioCategories();
  const featured = portfolioCategories
    .filter((category) => category.projects.length > 0)
    .map((category) => ({
      category,
      project: category.projects[0],
    }));

  return (
    <section className="bg-page-950 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Our Work"
          title="Recent Projects"
          description="A sample of the CCTV, solar, networking, and supply projects we've delivered for clients."
          onDark
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map(({ category, project }) => (
            <Link
              key={project.slug}
              href={`/portfolio#${category.slug}`}
              className="flex flex-col rounded-2xl border border-cardText-50/10 bg-cardText-50/5 p-6 backdrop-blur-sm transition-colors hover:border-cardText-50/20 hover:bg-cardText-50/10"
            >
              {project.image ? (
                <ImageSlot src={project.image} alt={project.title} aspect="video" className="mb-4 -mt-2 rounded-xl" />
              ) : (
                <GradientIconBadge icon={project.icon} color={category.iconColor} />
              )}
              <h3 className="mt-4 text-base font-semibold text-cardText-50">{project.title}</h3>
              <p className="mt-2 flex-1 text-sm text-cardText-400">{project.summary}</p>
              <span className="mt-4 inline-block w-fit rounded-full bg-cardText-50/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-cardText-200">
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
