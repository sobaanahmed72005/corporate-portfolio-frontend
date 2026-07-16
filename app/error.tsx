"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button, LinkButton } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface this in server logs (Next.js logs errors thrown during
    // rendering here too) so a real failure doesn't go unnoticed — see
    // lib/cms.ts's withFallback for the matching pattern on the data side.
    console.error("[page-error]", error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-brand-600">
        Something went wrong
      </p>
      <h1 className="mt-3 font-display text-3xl font-extrabold text-contentCardText-950 sm:text-4xl">
        This page hit a snag
      </h1>
      <p className="mt-4 max-w-md text-contentCardText-600">
        Please try again in a moment. If this keeps happening, the rest of the site is still working normally.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button variant="brand" onClick={() => reset()}>
          Try Again
        </Button>
        <LinkButton href="/" variant="outline">
          Back to Home
        </LinkButton>
      </div>
    </Container>
  );
}
