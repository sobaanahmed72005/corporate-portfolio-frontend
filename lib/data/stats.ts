import { company } from "@/lib/data/company";

export type Stat = {
  label: string;
  value: number;
  suffix: string;
};

/**
 * Home page stat counters. "Years of Experience" is computed from the real
 * company.foundingYear. The other two are PLACEHOLDER — replace with real
 * figures once you have them.
 */
export const stats: Stat[] = [
  {
    label: "Years of Experience",
    value: Math.max(1, new Date().getFullYear() - company.foundingYear),
    suffix: "+",
  },
  { label: "Brands & Manufacturers", value: 15, suffix: "+" }, // PLACEHOLDER
  { label: "Projects Completed", value: 500, suffix: "+" }, // PLACEHOLDER
];
