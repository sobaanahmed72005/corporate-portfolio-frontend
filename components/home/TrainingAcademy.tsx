import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { LinkButton } from "@/components/ui/Button";
import { getCourses } from "@/lib/cms";

export async function TrainingAcademy() {
  const courses = await getCourses();

  return (
    <section className="bg-page-900 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Training"
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
              className="flex flex-col items-center gap-3 rounded-2xl border border-cardText-950/10 bg-cardText-950/5 p-6 text-center backdrop-blur-sm"
            >
              <GradientIconBadge icon={course.icon} color={course.iconColor} size="lg" />
              <h3 className="text-base font-semibold text-cardText-950">{course.name}</h3>
              <p className="text-sm text-cardText-600">{course.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <LinkButton href="/contact" variant="outlineWhite" size="lg">
            Ask About Training
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
