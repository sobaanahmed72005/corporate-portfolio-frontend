import type { IconName } from "@/components/ui/Icon";
import { company } from "@/lib/data/company";

export type Office = {
  slug: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  icon: IconName;
};

/**
 * Office/branch listing. The first entry mirrors the real contact details
 * from company.ts. Additional entries are PLACEHOLDER — edit with real
 * branch details or delete the entry entirely if this is a single-location
 * business; the offices section and multi-office contact page both render
 * however many entries are here.
 */
export const offices: Office[] = [
  {
    slug: "headquarters",
    name: "Head Office",
    phone: company.phone,
    email: company.email,
    address: `${company.address.line1}, ${company.address.city}, ${company.address.country}`,
    icon: "building",
  },
  {
    slug: "branch-2", // PLACEHOLDER — rename slug/details for a real branch, or delete this entry
    name: "Branch Office", // PLACEHOLDER
    phone: "+92 300 0000001", // PLACEHOLDER
    email: "branch@example.com", // PLACEHOLDER
    address: "Shop/Office Address Line 2, City 2, Pakistan", // PLACEHOLDER
    icon: "globe",
  },
];
