import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-brand-600">404</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold text-contentCardText-950 sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-contentCardText-600">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <LinkButton href="/" variant="brand">
          Back to Home
        </LinkButton>
        <LinkButton href="/contact" variant="outline">
          Contact Us
        </LinkButton>
      </div>
    </Container>
  );
}
