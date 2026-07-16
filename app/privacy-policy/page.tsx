import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { getCompanyInfo, type CompanyInfo } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyInfo();
  return {
    title: "Privacy Policy",
    description: `How ${company.name} collects, uses, and protects your information.`,
  };
}

function getSections(company: CompanyInfo): { heading: string; paragraphs: string[]; list?: string[] }[] {
  return [
  {
    heading: "1. Overview",
    paragraphs: [
      `This Privacy Policy explains how ${company.name} ("we", "us", "our") collects, uses, and protects information when you visit this website or contact us about our products and services. This site is informational — it showcases our products and services, but purchases are made through our separate online store, which has its own privacy policy.`,
    ],
  },
  {
    heading: "2. Information We Collect",
    paragraphs: [
      "We collect information in two ways:",
    ],
    list: [
      "Information you provide directly — your name, email address, phone number, and any details you include when submitting our contact form (such as your subject of interest or message).",
      "Information collected automatically — standard technical data such as browser type, device type, and general usage analytics, collected to help us understand how the site is used and to keep it running smoothly.",
    ],
  },
  {
    heading: "3. How We Use Your Information",
    paragraphs: ["We use the information you provide to:"],
    list: [
      "Respond to your inquiries, quote requests, or service requests",
      "Schedule installations, site surveys, or support visits",
      "Improve our website and the services we offer",
      "Communicate with you about products, services, or your account with us, where relevant",
    ],
  },
  {
    heading: "4. How We Share Information",
    paragraphs: [
      "We do not sell your personal information. We only share it where necessary — for example, with technicians coordinating an installation visit, or where required by law. If you follow a link to our separate online store to make a purchase, that store's own privacy policy governs the information you provide there.",
    ],
  },
  {
    heading: "5. Cookies & Analytics",
    paragraphs: [
      "This site may use basic cookies or analytics tools to understand how visitors use the site and to improve performance. You can disable cookies through your browser settings; doing so may affect some site functionality.",
    ],
  },
  {
    heading: "6. Data Retention & Security",
    paragraphs: [
      "We retain contact form submissions only as long as needed to respond to and resolve your inquiry, and take reasonable steps to protect the information you share with us from unauthorized access.",
    ],
  },
  {
    heading: "7. Your Choices",
    paragraphs: [
      "You can contact us at any time to ask what information we hold about you, request a correction, or request that we delete it, using the contact details below.",
    ],
  },
  {
    heading: "8. Children's Privacy",
    paragraphs: [
      "This website is not directed at children, and we do not knowingly collect personal information from children.",
    ],
  },
  {
    heading: "9. Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision reflected in this document.",
    ],
  },
  {
    heading: "10. Contact Us",
    paragraphs: [
      `Questions about this Privacy Policy can be sent to ${company.email} or ${company.phone}.`,
    ],
  },
  ];
}

export default async function PrivacyPolicyPage() {
  const company = await getCompanyInfo();
  const sections = getSections(company);

  return (
    <div className="bg-contentCard-50">
      <section className="border-b border-section-200 bg-section-50 py-14">
        <Container>
          <h1 className="font-display text-3xl font-extrabold text-sectionText-950 sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 max-w-2xl text-sectionText-600">
            How we collect, use, and protect your information.
          </p>
        </Container>
      </section>

      <Container className="max-w-3xl space-y-10 py-16">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-xl font-semibold text-contentCardText-950">{section.heading}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-contentCardText-600">
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {section.list && (
                <ul className="list-disc space-y-1.5 pl-5">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}