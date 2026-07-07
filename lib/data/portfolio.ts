import type { IconName } from "@/components/ui/Icon";
import type { GradientName } from "@/components/ui/gradients";

export type PortfolioProject = {
  slug: string;
  title: string;
  summary: string;
  highlight: string;
  icon: IconName;
};

export type PortfolioCategory = {
  slug: string;
  name: string;
  description: string;
  icon: IconName;
  gradient: GradientName;
  projects: PortfolioProject[];
};

/**
 * Placeholder project portfolio — edit freely, no code changes needed
 * elsewhere. Follows the same "icons over photos" convention as
 * lib/data/products.ts until real project photos are available.
 */
export const portfolioCategories: PortfolioCategory[] = [
  {
    slug: "cctv-installations",
    name: "CCTV Installation Projects",
    description:
      "Camera systems installed and configured for retail, residential, and warehouse security.",
    icon: "camera",
    gradient: "rose",
    projects: [
      {
        slug: "retail-chain-security-rollout",
        title: "32-Camera Retail Chain Security Rollout",
        summary:
          "Installed and networked a 32-camera NVR system across 4 retail branches with centralized remote monitoring from a single mobile app.",
        highlight: "4 Branches Connected",
        icon: "camera",
      },
      {
        slug: "residential-cctv-doorbell-upgrade",
        title: "Residential CCTV & Video Doorbell Upgrade",
        summary:
          "Full home security upgrade combining outdoor bullet cameras, indoor domes, and a video doorbell, all viewable from one app.",
        highlight: "8-Camera Home Setup",
        icon: "video",
      },
      {
        slug: "warehouse-perimeter-surveillance",
        title: "Warehouse Perimeter Surveillance System",
        summary:
          "Weatherproof, night-vision cameras covering warehouse entry points and loading docks with extended recording retention.",
        highlight: "24/7 Perimeter Coverage",
        icon: "hard-drive",
      },
    ],
  },
  {
    slug: "solar-installations",
    name: "Solar Installation Projects",
    description:
      "Solar and backup power systems sized and installed for homes, offices, and off-grid needs.",
    icon: "sun",
    gradient: "orange",
    projects: [
      {
        slug: "hybrid-solar-family-home",
        title: "10kW Hybrid Solar System for a Family Home",
        summary:
          "Sized and installed a hybrid solar-plus-battery system that significantly cut a household's dependence on grid electricity.",
        highlight: "10kW System",
        icon: "sun",
      },
      {
        slug: "office-solar-backup",
        title: "Office Solar Backup for Load-Shedding Resilience",
        summary:
          "On-grid solar with battery backup keeping a small office running through outages without interrupting work.",
        highlight: "Zero Downtime During Outages",
        icon: "battery",
      },
      {
        slug: "solar-water-pump-install",
        title: "Solar-Powered Water Pump Installation",
        summary:
          "Off-grid solar system sized for an agricultural water pump, removing dependency on unreliable grid electricity.",
        highlight: "Off-Grid Install",
        icon: "zap",
      },
    ],
  },
  {
    slug: "networking-projects",
    name: "Networking & Structured Cabling Projects",
    description:
      "Wired and wireless network builds for offices, retail spaces, and multi-floor buildings.",
    icon: "network",
    gradient: "purple",
    projects: [
      {
        slug: "call-center-network-buildout",
        title: "50-Seat Call Center Network Buildout",
        summary:
          "Structured Cat6 cabling, managed switches, and WiFi access points installed for a new call center floor.",
        highlight: "50 Workstations Wired",
        icon: "cable",
      },
      {
        slug: "multi-floor-wifi-coverage-fix",
        title: "Multi-Floor Office WiFi Coverage Fix",
        summary:
          "Diagnosed WiFi dead zones and redesigned access point placement across three floors for full, reliable coverage.",
        highlight: "3 Floors, Zero Dead Zones",
        icon: "wifi",
      },
      {
        slug: "retail-network-pos-cabling",
        title: "Retail Store Network & POS Cabling",
        summary:
          "Structured cabling and network switch setup supporting point-of-sale terminals and back-office systems.",
        highlight: "POS-Ready Network",
        icon: "router",
      },
    ],
  },
  {
    slug: "bulk-corporate-supply",
    name: "Bulk & Corporate Supply Projects",
    description:
      "Volume sourcing and delivery of IT accessories and equipment for institutional and corporate clients.",
    icon: "package",
    gradient: "green",
    projects: [
      {
        slug: "university-lab-accessories-supply",
        title: "University Computer Lab Accessories Supply",
        summary:
          "Bulk sourcing and delivery of chargers, cables, and peripherals for multiple university computer labs.",
        highlight: "300+ Units Delivered",
        icon: "plug",
      },
      {
        slug: "corporate-onboarding-kit-program",
        title: "Corporate Onboarding Kit Program",
        summary:
          "Recurring bulk supply of charging accessories and peripherals for a corporate client's new-hire onboarding kits.",
        highlight: "Ongoing Monthly Supply",
        icon: "battery-charging",
      },
      {
        slug: "institutional-networking-equipment-order",
        title: "Institutional Networking Equipment Order",
        summary:
          "Volume order and delivery coordination of routers and switches for a multi-branch institutional rollout.",
        highlight: "Multi-Branch Delivery",
        icon: "network",
      },
    ],
  },
];