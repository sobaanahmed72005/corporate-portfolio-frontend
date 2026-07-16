import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { LinkButton } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
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
    <section className="border-t-2 border-pageText-950/15 bg-page-950 py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Our Work"
          eyebrowColor="text-violet-500"
          title="Recent Projects"
          description="A sample of the CCTV, solar, networking, and supply projects we've delivered for clients."
          onDark
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map(({ category, project }) => (
            <Link
              key={project.slug}
              href={`/portfolio#${category.slug}`}
              className="flex flex-col rounded-3xl border border-cardText-950/10 bg-card-950 p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-cardText-950/20 hover:shadow-lg"
            >
              {project.image ? (
                <ImageSlot src={project.image} alt={project.title} aspect="video" className="mb-4 -mt-2 rounded-xl" />
              ) : (
                <GradientIconBadge icon={project.icon} color={category.iconColor} />
              )}
              <h3 className="mt-4 text-base font-semibold text-cardText-950">{project.title}</h3>
              <p className="mt-2 flex-1 text-sm text-cardText-600">{project.summary}</p>
              <span className="mt-4 inline-block w-fit rounded-full bg-cardText-950/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-cardText-800">
                {project.highlight}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <LinkButton href="/portfolio" variant="brand" size="sm" className="w-fit">
            View Full Portfolio <ArrowRight className="h-4 w-4" aria-hidden />
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
