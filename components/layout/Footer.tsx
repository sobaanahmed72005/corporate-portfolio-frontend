import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import type { ProductCategory, CompanyInfo, Office } from "@/lib/cms";
import { safeHref } from "@/lib/safe-url";

export function Footer({
  company,
  productCategories,
  offices,
  logo,
}: {
  company: CompanyInfo;
  productCategories: ProductCategory[];
  offices: Office[];
  logo?: string;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer-950 text-footerText-950">
      <Container className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <div className="flex items-center gap-2">
            {logo && (
              <Image src={logo} alt={company.name} width={28} height={28} className="h-7 w-7 shrink-0 object-contain" />
            )}
            <p className="font-display text-lg font-bold text-footerText-950">{company.name}</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-footerText-600">
            {company.description}
          </p>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-footerText-950">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/" className="hover:text-navHighlight-600">Home</Link></li>
            <li><Link href="/products" className="hover:text-navHighlight-600">Products</Link></li>
            <li><Link href="/services" className="hover:text-navHighlight-600">Services</Link></li>
            <li><Link href="/portfolio" className="hover:text-navHighlight-600">Portfolio</Link></li>
            <li><Link href="/blog" className="hover:text-navHighlight-600">Blog</Link></li>
            <li><Link href="/testimonials" className="hover:text-navHighlight-600">Testimonials</Link></li>
            <li><Link href="/about" className="hover:text-navHighlight-600">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-navHighlight-600">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-footerText-950">
            Product Categories
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {productCategories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/products#${cat.slug}`} className="hover:text-navHighlight-600">
                  {cat.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-footerText-950">
            Get in Touch
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" />
              <a href={safeHref(`tel:${company.phone}`)} className="hover:text-navHighlight-600">
                {company.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              <a href={safeHref(`mailto:${company.email}`)} className="hover:text-navHighlight-600">
                {company.email}
              </a>
            </li>
            {offices.length > 0 ? (
              offices.map((office) => (
                <li key={office.slug} className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {office.name}: <span className="font-bold">{office.address}</span>
                  </span>
                </li>
              ))
            ) : (
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="font-bold">
                  {company.address.line1}, {company.address.city},{" "}
                  {company.address.country}
                </span>
              </li>
            )}
          </ul>
        </div>

        <div>
          <NewsletterForm />
        </div>
      </Container>

      <div className="border-t border-footerText-950/10 py-5">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-footerText-600 sm:flex-row">
          <p>
            &copy; {year} {company.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-navHighlight-600">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-navHighlight-600">
              Terms &amp; Conditions
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
