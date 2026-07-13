"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { NavMegaMenu, type MegaMenuItem } from "@/components/layout/NavMegaMenu";
import { company } from "@/lib/data/company";
import { portfolioCategories } from "@/lib/data/portfolio";
import type { ProductCategory, Service } from "@/lib/cms";
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

const portfolioMenuItems: MegaMenuItem[] = portfolioCategories.map((cat) => ({
  href: `/portfolio#${cat.slug}`,
  title: cat.name,
  description: cat.description,
  icon: cat.icon,
  gradient: cat.gradient,
}));

export function Header({
  productCategories,
  services,
}: {
  productCategories: ProductCategory[];
  services: Service[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const productMenuItems: MegaMenuItem[] = productCategories.map((cat) => ({
    href: `/products#${cat.slug}`,
    title: cat.name,
    description: cat.description,
    icon: cat.icon,
    gradient: cat.gradient,
  }));

  const serviceMenuItems: MegaMenuItem[] = services.map((service) => ({
    href: `/services#${service.slug}`,
    title: service.name,
    description: service.description,
    icon: service.icon,
    gradient: service.gradient,
  }));

  return (
    <>
      <div className="hidden bg-ink-950 text-slate-300 sm:block">
        <Container className="flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-1.5 hover:text-white"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden />
              {company.email}
            </a>
            <a
              href={`tel:${company.phone}`}
              className="flex items-center gap-1.5 hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {company.phone}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href={company.social.facebook} aria-label="Facebook" className="hover:text-white">
              <FacebookIcon className="h-3.5 w-3.5" />
            </a>
            <a href={company.social.instagram} aria-label="Instagram" className="hover:text-white">
              <InstagramIcon className="h-3.5 w-3.5" />
            </a>
            <a href={company.social.linkedin} aria-label="LinkedIn" className="hover:text-white">
              <LinkedinIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </Container>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm text-white">
              IT
            </span>
            <span className="hidden text-base sm:inline">{company.shortName}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white",
                pathname === "/" && "bg-white/10 text-white",
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
                "rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white",
                pathname.startsWith("/blog") && "bg-white/10 text-white",
              )}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white",
                pathname.startsWith("/about") && "bg-white/10 text-white",
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white",
                pathname.startsWith("/contact") && "bg-white/10 text-white",
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
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </Container>

        {open && (
          <div className="border-t border-white/10 bg-black md:hidden">
            <Container className="flex flex-col gap-1 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
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