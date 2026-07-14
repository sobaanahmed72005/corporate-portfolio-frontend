import { ShieldCheck, Truck, Headset, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GRADIENTS, type GradientName } from "@/components/ui/gradients";
import { cn } from "@/lib/cn";

const reasons: {
  icon: typeof ShieldCheck;
  title: string;
  description: string;
  tag: string;
  gradient: GradientName;
}[] = [
  {
    icon: ShieldCheck,
    title: "Quality-Checked Products",
    description: "Every product is sourced and checked for reliability before it reaches you.",
    tag: "TRUSTED SOURCING",
    gradient: "blue",
  },
  {
    icon: Truck,
    title: "Professional Installation",
    description: "Our technicians handle CCTV, solar, and networking setup from start to finish.",
    tag: "EXPERT TEAM",
    gradient: "orange",
  },
  {
    icon: Headset,
    title: "Responsive Support",
    description: "Reach us by phone or WhatsApp for quick answers and after-installation support.",
    tag: "ALWAYS AVAILABLE",
    gradient: "green",
  },
  {
    icon: BadgeCheck,
    title: "Bulk & Corporate Ready",
    description: "Volume pricing and reliable sourcing for corporate and institutional orders.",
    tag: "VOLUME PRICING",
    gradient: "purple",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-page-900 py-16 sm:py-24">
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
              className="rounded-2xl border border-cardText-50/10 bg-cardText-50/5 p-6 text-center backdrop-blur-sm transition-colors hover:border-cardText-50/20 hover:bg-cardText-50/10"
            >
              <span
                className={cn(
                  "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-sm",
                  GRADIENTS[reason.gradient].badge,
                )}
              >
                <reason.icon className="h-7 w-7" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-cardText-50">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm text-cardText-400">{reason.description}</p>
              <span className="mt-3 inline-block rounded-full bg-cardText-50/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-cardText-200">
                {reason.tag}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}