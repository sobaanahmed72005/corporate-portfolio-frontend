import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { getServices, getCompanyInfo, getOffices, getWhatsAppLink, type CompanyInfo } from "@/lib/cms";
import { safeHref, telHref } from "@/lib/safe-url";

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyInfo();
  return {
    title: "Contact Us",
    description: `Get in touch with ${company.name} for products, installation services, or bulk orders.`,
  };
}

function getReachChannels(company: CompanyInfo) {
  return [
    {
      icon: "phone" as const,
      iconColor: "#1E40AF",
      title: "Call Our Support Team",
      description:
        "Have questions or need immediate assistance? Call us directly to speak with our team about products or installation needs.",
      ctaLabel: "Start Your Call Now",
      href: telHref(company.phone),
    },
    {
      icon: "message-circle" as const,
      iconColor: "#10B981",
      title: "Chat With Us on WhatsApp",
      description:
        "Have a quick question? Message us on WhatsApp for fast answers about products, quotes, or scheduling an installation.",
      ctaLabel: "Live WhatsApp Chat",
      href: getWhatsAppLink(company),
      external: true,
    },
    {
      icon: "mail" as const,
      iconColor: "#F97316",
      title: "Email Our Team",
      description:
        "Prefer email? Reach us anytime for product questions, bulk order inquiries, or general support.",
      ctaLabel: "Send an Email",
      href: safeHref(`mailto:${company.email}`),
    },
  ];
}

export default async function ContactPage() {
  const [services, company, offices] = await Promise.all([getServices(), getCompanyInfo(), getOffices()]);
  const reachChannels = getReachChannels(company);

  return (
    <div className="bg-contentCard-50">
      <PageHero
        title="Contact Us"
        description="Have a question about a product, need an installation quote, or want to place a bulk order? Send us a message."
      />

      <Container className="py-16">
        <SectionHeading
          eyebrow="We're Here to Help"
          title="Multiple Ways to Reach Us"
          description="Whichever way works best for you — call, chat, or email — our team is ready to help."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {reachChannels.map((channel) => (
            <div
              key={channel.title}
              className="flex flex-col rounded-3xl border border-contentCard-200 p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-lg"
            >
              <GradientIconBadge icon={channel.icon} color={channel.iconColor} />
              <h3 className="mt-4 text-lg font-semibold text-contentCardText-950">
                {channel.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-contentCardText-600">
                {channel.description}
              </p>
              <LinkButton
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                variant="outline"
                className="mt-5 self-start"
              >
                {channel.ctaLabel}
              </LinkButton>
            </div>
          ))}
        </div>
      </Container>

      <Container className="grid grid-cols-1 gap-12 pb-16 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="text-lg font-bold text-contentCardText-950">
            Send Us a Message
          </h2>
          <p className="mt-1 text-sm text-contentCardText-600">
            Fill out the form below and our team will get back to you shortly.
          </p>
          <div className="mt-6">
            <ContactForm services={services} />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-xl border border-contentCard-200 p-6">
            <h2 className="text-lg font-bold text-contentCardText-950">Our Address{offices.length > 1 ? "es" : ""}</h2>
            {offices.length > 0 ? (
              <div className="mt-4 space-y-4">
                {offices.map((office) => (
                  <div key={office.slug} className="flex items-start gap-3 text-sm text-contentCardText-700">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                    <p>
                      {office.name}: <span className="font-bold">{office.address}</span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 flex items-start gap-3 text-sm text-contentCardText-700">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                <p className="font-bold">
                  {company.address.line1}, {company.address.city},{" "}
                  {company.address.country}
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
