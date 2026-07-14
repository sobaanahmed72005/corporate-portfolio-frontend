import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { company } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms that apply to using the ${company.name} website and services.`,
};

const sections: { heading: string; paragraphs: string[]; list?: string[] }[] = [
  {
    heading: "1. Acceptance of Terms",
    paragraphs: [
      `By using this website, you agree to these Terms & Conditions. If you do not agree, please do not use this site. These terms apply to the ${company.name} website; our separate online store has its own terms of sale.`,
    ],
  },
  {
    heading: "2. About This Website",
    paragraphs: [
      `${company.description} This website is informational — it showcases our products and installation services. Purchases are made through our separate online store, linked from this site; we do not process payments or orders directly here.`,
    ],
  },
  {
    heading: "3. Use of This Website",
    paragraphs: ["When using this site, you agree not to:"],
    list: [
      "Attempt unauthorized access to any part of the site or its systems",
      "Use automated tools to scrape or copy site content without permission",
      "Submit false or misleading information through our contact form",
      "Use the site for any unlawful purpose",
    ],
  },
  {
    heading: "4. Product Information & Pricing",
    paragraphs: [
      "Product descriptions and categories shown on this site are for informational purposes. Current pricing and availability are confirmed at the point of purchase on our online store or directly through our team, and may change without notice.",
    ],
  },
  {
    heading: "5. Service Requests & Installations",
    paragraphs: [
      "Quotes provided for installation services (CCTV, solar, networking, or maintenance) are estimates based on the information available at the time and may be revised after a site survey. Scheduling is coordinated directly with our team and may vary based on site access, equipment availability, and technician scheduling.",
    ],
  },
  {
    heading: "6. Intellectual Property",
    paragraphs: [
      `All content on this website — including text, images, and branding — is the property of ${company.name} or its licensors and may not be copied or reused without permission.`,
    ],
  },
  {
    heading: "7. Third-Party Links",
    paragraphs: [
      "This site links to our separate online store and to our social media pages. We are not responsible for the content, policies, or practices of those third-party sites once you leave this website.",
    ],
  },
  {
    heading: "8. Limitation of Liability",
    paragraphs: [
      `${company.name} is not liable for indirect or incidental damages arising from the use of this website. For installed products and services, our liability is limited to the terms agreed at the time of service or purchase.`,
    ],
  },
  {
    heading: "9. Governing Law",
    paragraphs: [
      "These Terms are governed by the laws of Pakistan. Any disputes will be handled in accordance with applicable local law.",
    ],
  },
  {
    heading: "10. Changes to These Terms",
    paragraphs: [
      "We may update these Terms from time to time. Continued use of the website after changes are posted means you accept the revised Terms.",
    ],
  },
  {
    heading: "11. Contact Us",
    paragraphs: [
      `Questions about these Terms can be sent to ${company.email} or ${company.phone}.`,
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50 py-14">
        <Container>
          <h1 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">Terms &amp; Conditions</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            The terms that apply to using our website and services.
          </p>
        </Container>
      </section>

      <Container className="max-w-3xl space-y-10 py-16">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-xl font-semibold text-slate-900">{section.heading}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
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
    </>
  );
}