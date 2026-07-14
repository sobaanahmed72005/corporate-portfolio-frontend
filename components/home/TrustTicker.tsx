import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const rowOne = [
  "Certified Technicians",
  "Bulk Order Ready",
  "Nationwide Delivery",
  "Quality Checked Gear",
  "5+ Years Experience",
  "Professional Installation",
];

const rowTwo = [
  "24/7 Customer Support",
  "Genuine Products",
  "Corporate Accounts Welcome",
  "Warranty Backed",
  "Competitive Pricing",
  "Fast Turnaround",
];

function Pill({ label, dark }: { label: string; dark: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 font-display text-sm font-semibold",
        dark ? "bg-brand-600 text-white" : "border border-cardText-50/10 bg-cardText-50/5 text-cardText-50",
      )}
    >
      <Sparkles className="h-3.5 w-3.5 text-accent-500" aria-hidden />
      {label}
    </span>
  );
}

function Row({ items, animation }: { items: string[]; animation: string }) {
  // One "block" repeats the set enough times to be wider than any
  // realistic viewport; duplicating that block (not just `items`) is what
  // keeps the loop seamless — two copies of the bare 6-pill set run out
  // partway across a wide screen, leaving a blank gap before it wraps.
  const block = [...items, ...items, ...items, ...items];
  const doubled = [...block, ...block];
  return (
    <div className="w-full overflow-hidden">
      <div className={cn("flex w-max shrink-0 gap-4", animation)}>
        {doubled.map((label, i) => (
          <Pill key={`${label}-${i}`} label={label} dark={i % 2 === 0} />
        ))}
      </div>
    </div>
  );
}

export function TrustTicker() {
  return (
    <div className="overflow-hidden bg-page-900 py-10">
      <Container>
        <p className="mb-6 text-center font-display text-sm font-semibold uppercase tracking-wide text-pageText-400">
          Trusted by Homes and Businesses Across Pakistan
        </p>
      </Container>
      <div className="space-y-4">
        <Row items={rowOne} animation="animate-marquee" />
        <Row items={rowTwo} animation="animate-marquee-reverse" />
      </div>
    </div>
  );
}