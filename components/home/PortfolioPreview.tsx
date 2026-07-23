import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { LinkButton } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { getPortfolioCategories } from "@/lib/cms";
import { deriveGradientStops } from "@/lib/theme";

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
            <Link
              key={project.slug}
              href={`/portfolio#${category.slug}`}
              className="flex flex-col rounded-3xl border border-cardText-950/10 bg-card-950 p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-cardText-950/20 hover:shadow-lg"
            >
              {project.video ? (
                // This card only links to /portfolio#category — the actual
                // <video> player lives there, not embedded in this preview
                // grid — so the thumbnail needs its own "there's a video
                // here" cue instead of looking like a dead image slot.
                <div
                  className="relative mb-4 -mt-2 flex aspect-video items-center justify-center overflow-hidden rounded-xl text-white"
                  style={{
                    backgroundImage: project.image
                      ? undefined
                      : `linear-gradient(to bottom right, ${deriveGradientStops(category.iconColor).from}, ${deriveGradientStops(category.iconColor).to})`,
                  }}
                >
                  {project.image && (
                    <ImageSlot src={project.image} alt={project.title} aspect="video" className="absolute inset-0" />
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-black/35">
                    <PlayCircle className="h-9 w-9" aria-hidden />
                    <span className="text-xs font-semibold uppercase tracking-wide">Click to Watch Video</span>
                  </div>
                </div>
              ) : project.image ? (
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
