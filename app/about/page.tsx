import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBanner } from "@/components/home/CtaBanner";
import { getCompanyInfo } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyInfo();
  return {
    title: "About Us",
    description: `Learn about ${company.name} — supplier and installer of IT accessories, CCTV, solar, and networking solutions.`,
  };
}

const values = [
  {
    icon: "target" as const,
    iconColor: "#8B5CF6",
    title: "Our Mission",
    description:
      "To make reliable IT accessories, security systems, and solar power accessible to homes and businesses across Pakistan, backed by professional installation.",
  },
  {
    icon: "shield-check" as const,
    iconColor: "#F43F5E",
    title: "Our Commitment",
    description:
      "We source quality-checked equipment and stand behind every installation with responsive, ongoing support.",
  },
  {
    icon: "users" as const,
    iconColor: "#F97316",
    title: "Who We Serve",
    description:
      "Homeowners, retail businesses, offices, and corporate clients needing bulk supply or complete installations.",
  },
];

export default async function AboutPage() {
  const company = await getCompanyInfo();

  return (
    <div className="bg-contentCard-50">
      <PageHero title={`About ${company.name}`} description={company.description} />

      <Container className="py-16">
        <SectionHeading
          eyebrow="Our Foundation"
          title="What We Stand For"
          description="A straightforward approach: supply good equipment, install it properly, and be reachable afterward."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-3xl border border-contentCard-200 bg-contentCard-50 p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-lg">
              <GradientIconBadge icon={value.icon} color={value.iconColor} />
              <h3 className="mt-4 text-lg font-bold text-contentCardText-950">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-contentCardText-600">{value.description}</p>
            </div>
          ))}
        </div>
      </Container>

      <CtaBanner
        title="Like What You See?"
        description="Let's talk about your project and how we can help you get set up right."
        primaryLabel="Get In Touch"
      />
    </div>
  );
}
