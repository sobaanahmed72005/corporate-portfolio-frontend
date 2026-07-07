import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { services } from "@/lib/data/services";

export function ServicesOverview() {
  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Installation & Support Services"
          description="Beyond supplying equipment, we install and maintain it — so it works reliably from day one."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.slug}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-lg"
            >
              <GradientIconBadge icon={service.icon} gradient={service.gradient} />
              <h3 className="mt-4 text-lg font-semibold text-ink-950">
                {service.name}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{service.description}</p>
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
