import type { Metadata } from "next";
import { ShieldCheck, Target, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBanner } from "@/components/home/CtaBanner";
import { company } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${company.name} — supplier and installer of IT accessories, CCTV, solar, and networking solutions.`,
};

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To make reliable IT accessories, security systems, and solar power accessible to homes and businesses across Pakistan, backed by professional installation.",
  },
  {
    icon: ShieldCheck,
    title: "Our Commitment",
    description:
      "We source quality-checked equipment and stand behind every installation with responsive, ongoing support.",
  },
  {
    icon: Users,
    title: "Who We Serve",
    description:
      "Homeowners, retail businesses, offices, and corporate clients needing bulk supply or complete installations.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50 py-16">
        <Container>
          <h1 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">About {company.name}</h1>
          <p className="mt-4 max-w-2xl text-slate-600">{company.description}</p>
        </Container>
      </section>

      <Container className="py-16">
        <SectionHeading
          eyebrow="Our Foundation"
          title="What We Stand For"
          description="A straightforward approach: supply good equipment, install it properly, and be reachable afterward."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-xl border border-slate-200 p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <value.icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{value.description}</p>
            </div>
          ))}
        </div>
      </Container>

      <CtaBanner
        title="Like What You See?"
        description="Let's talk about your project and how we can help you get set up right."
        primaryLabel="Get In Touch"
      />
    </>
  );
}
