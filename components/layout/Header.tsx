"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Phone, Mail, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NavMegaMenu, type MegaMenuItem } from "@/components/layout/NavMegaMenu";
import type { ProductCategory, Service, PortfolioCategory, CompanyInfo } from "@/lib/cms";
import { cn } from "@/lib/cn";
import { safeHref, telHref } from "@/lib/safe-url";

const TOP_BAR_SLIDE_MS = 3500;

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header({
  company,
  productCategories,
  services,
  portfolioCategories,
  logo,
}: {
  company: CompanyInfo;
  productCategories: ProductCategory[];
  services: Service[];
  portfolioCategories: PortfolioCategory[];
  logo?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Top bar alternates between the full company name and the phone/email —
  // showing both at once was what forced the name to be cut down in the
  // first place. Sliding between them keeps the name fully legible while
  // still surfacing contact info, and a fixed-height overflow-hidden window
  // (below) means neither slide can ever push the bar taller than it is.
  const [topBarSlide, setTopBarSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTopBarSlide((i) => (i + 1) % 2), TOP_BAR_SLIDE_MS);
    return () => clearInterval(interval);
  }, []);

  // Next.js's <Link> skips navigation (and the scroll-to-top that comes
  // with it) when the href matches the current URL, so clicking Home/the
  // logo while already on "/" did nothing visible if you'd scrolled down.
  const scrollToTopIfAlreadyHome = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
      <div className="hidden border-b border-cardText-950/10 bg-card-950 text-cardText-800 sm:block">
        <Container className="flex h-9 items-center gap-5 text-xs">
          <div className="relative h-5 min-w-0 flex-1 overflow-hidden">
            <div
              className="absolute inset-x-0 top-0 flex flex-col transition-transform duration-500 ease-out"
              style={{ transform: `translateY(-${topBarSlide * 100}%)` }}
            >
              <span className="flex h-5 items-center truncate font-semibold text-cardText-950">
                {company.name}
              </span>
              <div className="flex h-5 items-center gap-5">
                <a
                  href={telHref(company.phone)}
                  className="flex items-center gap-1.5 hover:text-cardText-950"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {company.phone}
                </a>
                <a
                  href={safeHref(`mailto:${company.email}`)}
                  className="flex items-center gap-1.5 hover:text-cardText-950"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {company.email}
                </a>
              </div>
            </div>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 font-semibold text-white shadow-sm selection:bg-white selection:text-brand-600">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
            NTN No. 0236537
          </span>
        </Container>
      </div>

      <header className="sticky top-0 z-50 border-b border-headerText-950/10 bg-header-950">
        <Container className="flex h-20 items-center justify-between">
          {/* The full name now lives in the sliding top bar above instead of
              stacked under the logo here — that stacking is what let a long
              name wrap and push past this row's fixed height. This row is
              logo-only, so its height stays put no matter how the name (or
              anything else in the top bar) changes. */}
          <Link
            href="/"
            onClick={scrollToTopIfAlreadyHome}
            className="flex shrink-0 items-center gap-2 font-display font-bold text-headerText-950"
          >
            {logo ? (
              <Image
                src={logo}
                alt={company.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-contain"
              />
            ) : (
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-base text-white">
                IT
              </span>
            )}
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <Link
              href="/"
              onClick={scrollToTopIfAlreadyHome}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-semibold text-headerText-950 hover:bg-headerText-950/10",
                pathname === "/" && "bg-headerText-950/10 text-navHighlight-600",
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
              href="/testimonials"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-semibold text-headerText-950 hover:bg-headerText-950/10",
                pathname.startsWith("/testimonials") && "bg-headerText-950/10 text-navHighlight-600",
              )}
            >
              Testimonials
            </Link>
            <Link
              href="/blog"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-semibold text-headerText-950 hover:bg-headerText-950/10",
                pathname.startsWith("/blog") && "bg-headerText-950/10 text-navHighlight-600",
              )}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-semibold text-headerText-950 hover:bg-headerText-950/10",
                pathname.startsWith("/about") && "bg-headerText-950/10 text-navHighlight-600",
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-semibold text-headerText-950 hover:bg-headerText-950/10",
                pathname.startsWith("/contact") && "bg-headerText-950/10 text-navHighlight-600",
              )}
            >
              Contact
            </Link>
          </nav>

          <div className="hidden lg:block">
            <a
              href={safeHref(company.storeUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-white px-4 py-2.5 text-sm font-sans font-semibold text-slate-900 shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-accent-500 hover:text-white hover:shadow-accent-500/25"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden />
              Visit Our Store
            </a>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-headerText-950 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </Container>

        {open && (
          <div className="border-t border-headerText-950/10 bg-header-950 lg:hidden">
            <Container className="flex flex-col gap-1 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setOpen(false);
                    if (link.href === "/") scrollToTopIfAlreadyHome();
                  }}
                  className="rounded-md px-3 py-2 text-sm font-semibold text-headerText-950 hover:bg-headerText-950/10"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={safeHref(company.storeUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-sans font-semibold text-slate-900 shadow-md transition-all duration-300 ease-out hover:bg-accent-500 hover:text-white"
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
