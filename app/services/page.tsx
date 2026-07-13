import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ServiceCard } from "@/components/services/ServiceCard";
import { CtaBanner } from "@/components/home/CtaBanner";
import { getServices } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Services",
  description:
    "CCTV installation, solar panel setup, networking, bulk supply, and maintenance services from IT Solutions Trade & Service.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50 py-14">
        <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl">Our Services</h1>
            <p className="mt-2 max-w-xl text-slate-600">
              From installation to ongoing support, our technicians handle the
              full setup so your systems work reliably from day one.
            </p>
          </div>
          <LinkButton href="/contact" variant="accent" size="lg">
            Request a Service
          </LinkButton>
        </Container>
      </section>

      <Container className="py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>

      <CtaBanner
        title="Need a Custom Installation Quote?"
        description="Tell us about your site and requirements — we'll put together a quote for the right equipment and installation plan."
        primaryLabel="Get a Free Quote"
      />
    </>
  );
}
