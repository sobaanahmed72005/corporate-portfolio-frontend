import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { getServices } from "@/lib/cms";

export async function ServicesOverview() {
  const services = await getServices();

  return (
    <section className="bg-page-900 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Installation & Support Services"
          description="Beyond supplying equipment, we install and maintain it — so it works reliably from day one."
          onDark
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.slug}
              className="rounded-2xl border border-cardText-50/10 bg-cardText-50/5 p-6 backdrop-blur-sm transition-colors hover:border-cardText-50/20 hover:bg-cardText-50/10"
            >
              <GradientIconBadge icon={service.icon} color={service.iconColor} />
              <h3 className="mt-4 text-lg font-semibold text-cardText-50">
                {service.name}
              </h3>
              <p className="mt-2 text-sm text-cardText-400">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <LinkButton href="/services" variant="outlineWhite" size="lg">
            View All Services <ArrowRight className="h-4 w-4" />
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}