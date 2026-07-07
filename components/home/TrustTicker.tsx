import { Sparkles } from "lucide-react";
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
        dark ? "bg-ink-950 text-white" : "bg-brand-50 text-brand-700",
      )}
    >
      <Sparkles className="h-3.5 w-3.5 text-accent-500" aria-hidden />
      {label}
    </span>
  );
}

function Row({ items, animation }: { items: string[]; animation: string }) {
  const doubled = [...items, ...items];
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
    <div className="space-y-4 overflow-hidden bg-white py-10">
      <Row items={rowOne} animation="animate-marquee" />
      <Row items={rowTwo} animation="animate-marquee-reverse" />
    </div>
  );
}
