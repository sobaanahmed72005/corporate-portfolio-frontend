"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { NavMegaMenu, type MegaMenuItem } from "@/components/layout/NavMegaMenu";
import { company } from "@/lib/data/company";
import type { ProductCategory, Service, PortfolioCategory } from "@/lib/cms";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header({
  productCategories,
  services,
  portfolioCategories,
  logo,
}: {
  productCategories: ProductCategory[];
  services: Service[];
  portfolioCategories: PortfolioCategory[];
  logo?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const productMenuItems: MegaMenuItem[] = productCategories.map((cat) => ({
    href: `/products#${cat.slug}`,
    title: cat.name,
    description: cat.description,
    icon: cat.icon,
    iconColor: cat.iconColor,
  }));

  const serviceMenuItems: MegaMenuItem[] = services.map((service) => ({
    href: `/services#${service.slug}`,
    title: service.name,
    description: service.description,
    icon: service.icon,
    iconColor: service.iconColor,
  }));

  const portfolioMenuItems: MegaMenuItem[] = portfolioCategories.map((cat) => ({
    href: `/portfolio#${cat.slug}`,
    title: cat.name,
    description: cat.description,
    icon: cat.icon,
    iconColor: cat.iconColor,
  }));

  return (
    <>
      <div className="hidden bg-header-950 text-headerText-800 sm:block">
        <Container className="flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-1.5 hover:text-headerText-950"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden />
              {company.email}
            </a>
            <a
              href={`tel:${company.phone}`}
              className="flex items-center gap-1.5 hover:text-headerText-950"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {company.phone}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href={company.social.facebook} aria-label="Facebook" className="hover:text-headerText-950">
              <FacebookIcon className="h-3.5 w-3.5" />
            </a>
            <a href={company.social.instagram} aria-label="Instagram" className="hover:text-headerText-950">
              <InstagramIcon className="h-3.5 w-3.5" />
            </a>
            <a href={company.social.linkedin} aria-label="LinkedIn" className="hover:text-headerText-950">
              <LinkedinIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </Container>
      </div>

      <header className="sticky top-0 z-50 border-b border-headerText-950/10 bg-header-950/95 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-headerText-950">
            {logo ? (
              <Image
                src={logo}
                alt={company.name}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-contain"
              />
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm text-white">
                IT
              </span>
            )}
            <span className="hidden text-base sm:inline">{company.shortName}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-headerText-800 hover:bg-headerText-950/10 hover:text-headerText-950",
                pathname === "/" && "bg-headerText-950/10 text-navHighlight-400",
              )}
            >
              Home
            </Link>
            <NavMegaMenu
              label="Products"
              href="/products"
              active={pathname.startsWith("/products")}
              items={productMenuItems}
              cta={{
                title: "Need Something Specific?",
                description: "Ask about bulk pricing or a custom order.",
                ctaLabel: "Contact Us",
                href: "/contact",
              }}
            />
            <NavMegaMenu
              label="Services"
              href="/services"
              active={pathname.startsWith("/services")}
              items={serviceMenuItems}
              cta={{
                title: "Need a Custom Quote?",
                description: "Tell us about your site and we'll plan it.",
                ctaLabel: "Get Started",
                href: "/contact",
              }}
            />
            <NavMegaMenu
              label="Portfolio"
              href="/portfolio"
              active={pathname.startsWith("/portfolio")}
              items={portfolioMenuItems}
              cta={{
                title: "Like What You See?",
                description: "Let's connect and start your project.",
                ctaLabel: "Get Started",
                href: "/contact",
              }}
            />
            <Link
              href="/blog"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-headerText-800 hover:bg-headerText-950/10 hover:text-headerText-950",
                pathname.startsWith("/blog") && "bg-headerText-950/10 text-navHighlight-400",
              )}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-headerText-800 hover:bg-headerText-950/10 hover:text-headerText-950",
                pathname.startsWith("/about") && "bg-headerText-950/10 text-navHighlight-400",
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-headerText-800 hover:bg-headerText-950/10 hover:text-headerText-950",
                pathname.startsWith("/contact") && "bg-headerText-950/10 text-navHighlight-400",
              )}
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:block">
            <a
              href={company.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent-400 px-4 py-2.5 text-sm font-display font-semibold uppercase tracking-wide text-white shadow-md shadow-accent-400/25 transition-colors hover:bg-accent-500"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden />
              Visit Our Store
            </a>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-headerText-800 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </Container>

        {open && (
          <div className="border-t border-headerText-950/10 bg-header-950 md:hidden">
            <Container className="flex flex-col gap-1 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-headerText-800 hover:bg-headerText-950/10 hover:text-headerText-950"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={company.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent-400 px-4 py-2.5 text-sm font-display font-semibold uppercase tracking-wide text-white"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden />
                Visit Our Store
              </a>
            </Container>
          </div>
        )}
      </header>
    </>
  );
}
