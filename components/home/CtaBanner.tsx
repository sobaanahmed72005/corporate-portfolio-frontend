import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { company } from "@/lib/data/company";

type CtaBannerProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaBanner({
  title = "Ready to get started?",
  description = "Talk to us about products, installation, or a bulk order quote.",
  primaryLabel = "Contact Us",
  primaryHref = "/contact",
  secondaryLabel = "Visit Our Store",
  secondaryHref = company.storeUrl,
}: CtaBannerProps) {
  const secondaryIsExternal = secondaryHref.startsWith("http");

  return (
    <section className="border-t border-pageText-950/10 py-20 sm:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-indigo-600 px-8 py-14 text-center shadow-xl sm:px-14 sm:text-left">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 30%, white 0, transparent 30%), radial-gradient(circle at 85% 80%, #A5B4FC 0, transparent 35%)",
            }}
            aria-hidden
          />
          <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">{title}</h2>
              <p className="mt-2 max-w-md text-indigo-50">{description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <LinkButton href={primaryHref} size="lg" variant="white">
                {primaryLabel}
              </LinkButton>
              <LinkButton
                href={secondaryHref}
                target={secondaryIsExternal ? "_blank" : undefined}
                rel={secondaryIsExternal ? "noopener noreferrer" : undefined}
                size="lg"
                variant="outlineWhite"
              >
                {secondaryLabel}
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
