import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { LinkButton } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { getPortfolioCategories } from "@/lib/cms";

export async function PortfolioPreview() {
  const portfolioCategories = await getPortfolioCategories();
  // Only feature categories that have at least one real, video-backed
  // project — a project with no video is an unfilled placeholder, and
  // picking projects[0] blindly could land on one of those even when a
  // video-backed project exists later in the same category's list.
  const featured = portfolioCategories.flatMap((category) => {
    const project = category.projects.find((p) => p.video);
    return project ? [{ category, project }] : [];
  });

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
            // Same card markup as the /portfolio page's project cards — light
            // card on the dark homepage section, video playable inline
            // instead of just linking out to watch it there.
            <div
              key={project.slug}
              className="flex flex-col overflow-hidden rounded-3xl border border-contentCard-200 bg-contentCard-50 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-lg"
            >
              {project.video ? (
                <video src={project.video} controls className="aspect-video w-full bg-black" />
              ) : project.image ? (
                <ImageSlot src={project.image} alt={project.title} aspect="video" />
              ) : null}
              <div className="flex flex-1 flex-col p-6">
                <GradientIconBadge icon={project.icon} color={category.iconColor} size="sm" />
                <h3 className="mt-4 text-base font-bold text-contentCardText-950">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm text-contentCardText-600">{project.summary}</p>
                <span className="mt-4 inline-block w-fit rounded-full bg-contentCard-100 px-3 py-1 text-[11px] font-semibold tracking-wide text-contentCardText-600">
                  {project.highlight}
                </span>
              </div>
            </div>
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
