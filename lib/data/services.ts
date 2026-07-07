import type { IconName } from "@/components/ui/Icon";
import type { GradientName } from "@/components/ui/gradients";

export type Service = {
  slug: string;
  name: string;
  description: string;
  features: string[];
  icon: IconName;
  gradient: GradientName;
};

/**
 * Placeholder service list — edit freely, no code changes needed elsewhere.
 */
export const services: Service[] = [
  {
    slug: "cctv-installation",
    name: "CCTV Installation & Setup",
    description:
      "End-to-end camera installation for homes and businesses, from site survey to mobile app configuration.",
    features: [
      "Site survey and camera placement planning",
      "Cabling, mounting, and recorder setup",
      "Mobile app and remote viewing configuration",
      "Post-installation support",
    ],
    icon: "camera",
    gradient: "rose",
  },
  {
    slug: "solar-installation",
    name: "Solar Panel Installation",
    description:
      "Complete solar setup for homes and offices, sized to your load and backup needs.",
    features: [
      "Load assessment and system sizing",
      "Panel, inverter, and battery installation",
      "Grid-tie and hybrid system setup",
      "Maintenance and troubleshooting",
    ],
    icon: "sun",
    gradient: "orange",
  },
  {
    slug: "networking-setup",
    name: "Networking & Structured Cabling",
    description:
      "Reliable wired and wireless network setup for offices, retail spaces, and homes.",
    features: [
      "Router, switch, and access point configuration",
      "Structured cabling for new or existing spaces",
      "WiFi coverage optimization",
      "Network troubleshooting and support",
    ],
    icon: "network",
    gradient: "purple",
  },
  {
    slug: "bulk-corporate-supply",
    name: "Bulk & Corporate Supply",
    description:
      "Bulk sourcing of IT accessories and equipment for corporate and institutional clients.",
    features: [
      "Volume pricing for bulk orders",
      "Consistent stock sourcing",
      "Delivery coordination",
      "Dedicated support for corporate accounts",
    ],
    icon: "package",
    gradient: "green",
  },
  {
    slug: "maintenance-support",
    name: "Maintenance & Technical Support",
    description:
      "Ongoing maintenance and troubleshooting for previously installed systems.",
    features: [
      "Scheduled maintenance visits",
      "Fault diagnosis and repair",
      "System upgrades",
      "Priority support for existing customers",
    ],
    icon: "wrench",
    gradient: "cyan",
  },
];
