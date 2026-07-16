import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { LinkButton } from "@/components/ui/Button";
import { getCourses } from "@/lib/cms";

export async function TrainingAcademy() {
  const courses = await getCourses();

  return (
    <section className="border-t-2 border-pageText-950/15 bg-page-900 py-20 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Training"
          eyebrowColor="text-cyan-600"
          title="Get Certified With Our Installer Program"
          description="Hands-on courses for technicians and resellers who want to install to our standard."
          align="center"
          className="mx-auto"
          onDark
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.slug}
              className="flex flex-col items-center gap-3 rounded-3xl border border-cardText-950/10 bg-card-950 p-8 text-center shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-lg"
            >
              <GradientIconBadge icon={course.icon} color={course.iconColor} size="lg" />
              <h3 className="text-base font-semibold text-cardText-950">{course.name}</h3>
              <p className="text-sm text-cardText-600">{course.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <LinkButton href="/contact" variant="outline" size="lg">
            Ask About Training
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
