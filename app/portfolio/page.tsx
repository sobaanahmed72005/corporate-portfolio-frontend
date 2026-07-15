import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { CtaBanner } from "@/components/home/CtaBanner";
import { company } from "@/lib/data/company";
import { getPortfolioCategories } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Portfolio",
  description: `A look at recent CCTV, solar, networking, and bulk supply projects completed by ${company.name}.`,
};

export default async function PortfolioPage() {
  const portfolioCategories = await getPortfolioCategories();

  return (
    <div className="bg-contentCard-50">
      <section className="border-b border-section-200 bg-section-50 py-14">
        <Container>
          <h1 className="font-display text-3xl font-extrabold text-sectionText-950 sm:text-4xl">Our Portfolio</h1>
          <p className="mt-2 max-w-2xl text-sectionText-600">
            A look at the CCTV, solar, networking, and bulk supply projects
            we&apos;ve delivered for homes, offices, and corporate clients.
          </p>
        </Container>
      </section>

      {portfolioCategories.map((category, index) => (
        <section
          key={category.slug}
          id={category.slug}
          className={index % 2 === 1 ? "bg-section-50 py-16 sm:py-20" : "py-16 sm:py-20"}
        >
          <Container>
            <div className="flex items-center gap-4">
              <GradientIconBadge icon={category.icon} color={category.iconColor} size="lg" />
              <SectionHeading title={category.name} description={category.description} onSection />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.projects.map((project) => (
                <div
                  key={project.slug}
                  className="flex flex-col overflow-hidden rounded-2xl border border-contentCard-200 bg-contentCard-50 shadow-sm transition-shadow hover:shadow-lg"
                >
                  {project.video ? (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video src={project.video} controls className="aspect-video w-full bg-black" />
                  ) : project.image ? (
                    <ImageSlot src={project.image} alt={project.title} aspect="video" />
                  ) : null}
                  <div className="flex flex-1 flex-col p-6">
                    <GradientIconBadge icon={project.icon} color={category.iconColor} size="sm" />
                    <h3 className="mt-4 text-base font-semibold text-contentCardText-950">
                      {project.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-contentCardText-600">{project.summary}</p>
                    <span className="mt-4 inline-block w-fit rounded-full bg-contentCard-100 px-3 py-1 text-[11px] font-semibold tracking-wide text-contentCardText-500">
                      {project.highlight}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ))}

      <CtaBanner
        title="Like What You See?"
        description="Tell us about your site or project and we'll help you plan the right setup."
        primaryLabel="Start Your Project"
      />
    </div>
  );
}
