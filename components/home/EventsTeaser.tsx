import { CalendarClock } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function EventsTeaser() {
  return (
    <section className="border-y border-pageText-950/10 bg-page-900 py-14 text-center sm:py-16">
      <Container>
        <CalendarClock className="mx-auto h-8 w-8 text-fuchsia-500" aria-hidden />
        <h2 className="mt-4 font-display text-2xl font-extrabold text-pageText-950 sm:text-3xl">
          Events &amp; Workshops
        </h2>
        <p className="mx-auto mt-2 max-w-md font-display text-sm font-semibold uppercase tracking-[0.15em] text-pageText-600">
          Coming Soon
        </p>
      </Container>
    </section>
  );
}
