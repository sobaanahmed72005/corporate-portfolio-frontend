import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { getServices } from "@/lib/cms";

export async function ServicesOverview() {
  const services = await getServices();

  return (
    <section className="border-t border-pageText-950/10 bg-page-900 py-20 sm:py-32">
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
              className="rounded-3xl border border-cardText-950/10 bg-card-950 p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-cardText-950/20 hover:shadow-lg"
            >
              <GradientIconBadge icon={service.icon} color={service.iconColor} />
              <h3 className="mt-4 text-lg font-semibold text-cardText-950">
                {service.name}
              </h3>
              <p className="mt-2 text-sm text-cardText-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <LinkButton href="/services" variant="outline" size="lg">
            View All Services <ArrowRight className="h-4 w-4" />
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}