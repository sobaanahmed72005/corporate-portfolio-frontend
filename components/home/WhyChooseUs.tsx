import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { getReasons } from "@/lib/cms";

export async function WhyChooseUs() {
  const reasons = await getReasons();

  return (
    <section className="border-t border-pageText-950/10 bg-page-900 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built on Reliability and Support"
          align="center"
          className="mx-auto"
          onDark
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-cardText-950/10 bg-card-950 p-6 text-center shadow-sm transition-all hover:border-cardText-950/20 hover:shadow-md"
            >
              <GradientIconBadge
                icon={reason.icon}
                color={reason.iconColor}
                size="lg"
                className="mx-auto rounded-full"
              />
              <h3 className="mt-4 text-base font-semibold text-cardText-950">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm text-cardText-600">{reason.description}</p>
              <span className="mt-3 inline-block rounded-full bg-cardText-950/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-cardText-800">
                {reason.tag}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
