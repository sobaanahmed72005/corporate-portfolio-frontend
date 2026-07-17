import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { ContactForm } from "@/components/contact/ContactForm";
import { getServices, getCompanyInfo, getWhatsAppLink, type CompanyInfo } from "@/lib/cms";
import { safeHref } from "@/lib/safe-url";

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
      icon: Phone,
      title: "Call Our Support Team",
      description:
        "Have questions or need immediate assistance? Call us directly to speak with our team about products or installation needs.",
      ctaLabel: "Start Your Call Now",
      href: safeHref(`tel:${company.phone}`),
    },
    {
      icon: MessageCircle,
      title: "Chat With Us on WhatsApp",
      description:
        "Have a quick question? Message us on WhatsApp for fast answers about products, quotes, or scheduling an installation.",
      ctaLabel: "Live WhatsApp Chat",
      href: getWhatsAppLink(company),
      external: true,
    },
    {
      icon: Mail,
      title: "Email Our Team",
      description:
        "Prefer email? Reach us anytime for product questions, bulk order inquiries, or general support.",
      ctaLabel: "Send an Email",
      href: safeHref(`mailto:${company.email}`),
    },
  ];
}

export default async function ContactPage() {
  const [services, company] = await Promise.all([getServices(), getCompanyInfo()]);
  const reachChannels = getReachChannels(company);

  return (
    <div className="bg-contentCard-50">
      <section className="border-b border-section-200 bg-section-50 py-14">
        <Container>
          <h1 className="font-display text-3xl font-extrabold text-sectionText-950 sm:text-4xl">Contact Us</h1>
          <p className="mt-2 max-w-xl text-sectionText-600">
            Have a question about a product, need an installation quote, or want
            to place a bulk order? Send us a message.
          </p>
        </Container>
      </section>

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
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <channel.icon className="h-6 w-6" aria-hidden />
              </span>
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
          <h2 className="text-lg font-semibold text-contentCardText-950">
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
            <h2 className="text-lg font-semibold text-contentCardText-950">Our Address</h2>
            <div className="mt-4 flex items-start gap-3 text-sm text-contentCardText-700">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
              <p>
                {company.address.line1}, {company.address.city},{" "}
                {company.address.country}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
