import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { company } from "@/lib/data/company";
import type { ProductCategory } from "@/lib/cms";

export function Footer({
  productCategories,
  logo,
}: {
  productCategories: ProductCategory[];
  logo?: string;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer-950 text-footerText-800">
      <Container className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <div className="flex items-center gap-2">
            {logo && (
              <Image src={logo} alt={company.name} width={28} height={28} className="h-7 w-7 object-contain" />
            )}
            <p className="font-display text-lg font-bold text-footerText-950">{company.name}</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-footerText-600">
            {company.description}
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={company.social.facebook}
              aria-label="Facebook"
              className="rounded-full bg-footerText-950/10 p-2 hover:bg-footerText-950/20"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={company.social.instagram}
              aria-label="Instagram"
              className="rounded-full bg-footerText-950/10 p-2 hover:bg-footerText-950/20"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={company.social.linkedin}
              aria-label="LinkedIn"
              className="rounded-full bg-footerText-950/10 p-2 hover:bg-footerText-950/20"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-footerText-950">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/" className="hover:text-footerText-950">Home</Link></li>
            <li><Link href="/products" className="hover:text-footerText-950">Products</Link></li>
            <li><Link href="/services" className="hover:text-footerText-950">Services</Link></li>
            <li><Link href="/portfolio" className="hover:text-footerText-950">Portfolio</Link></li>
            <li><Link href="/blog" className="hover:text-footerText-950">Blog</Link></li>
            <li><Link href="/testimonials" className="hover:text-footerText-950">Testimonials</Link></li>
            <li><Link href="/about" className="hover:text-footerText-950">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-footerText-950">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-footerText-950">
            Product Categories
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {productCategories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/products#${cat.slug}`} className="hover:text-footerText-950">
                  {cat.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-footerText-950">
            Get in Touch
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" />
              <a href={`tel:${company.phone}`} className="hover:text-footerText-950">
                {company.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              <a href={`mailto:${company.email}`} className="hover:text-footerText-950">
                {company.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {company.address.line1}, {company.address.city},{" "}
                {company.address.country}
              </span>
            </li>
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
            <Link href="/privacy-policy" className="hover:text-footerText-950">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-footerText-950">
              Terms &amp; Conditions
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
