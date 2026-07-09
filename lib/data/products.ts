import type { IconName } from "@/components/ui/Icon";
import type { GradientName } from "@/components/ui/gradients";

export type Product = {
  slug: string;
  name: string;
  description: string;
  icon: IconName;
  /** Optional real product photo path (e.g. "/products/gan-charger.jpg").
   * Falls back to the icon badge when unset — see ImageSlot. */
  image?: string;
};

export type ProductCategory = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: IconName;
  gradient: GradientName;
  products: Product[];
};

/**
 * Placeholder catalog content — grouped by category, shown for browsing only
 * (this site does not sell directly; every product links out to the store).
 * Replace names/descriptions/icons with real inventory at any time; swap to
 * real photos later by adding an `image` field and a <ProductImage> component.
 */
export const productCategories: ProductCategory[] = [
  {
    slug: "chargers-power",
    name: "Chargers & Power Accessories",
    shortName: "Chargers & Power",
    description:
      "Fast chargers, power banks, and charging cables for phones, laptops, and other devices.",
    icon: "plug",
    gradient: "blue",
    products: [
      {
        slug: "gan-fast-wall-charger",
        name: "GaN Fast Wall Chargers",
        description: "Compact USB-C PD chargers (20W–65W) for phones and laptops.",
        icon: "plug",
      },
      {
        slug: "car-chargers",
        name: "Car Chargers",
        description: "Dual-port car chargers with fast charging support.",
        icon: "car",
      },
      {
        slug: "power-banks",
        name: "Power Banks",
        description: "High-capacity portable power banks for on-the-go charging.",
        icon: "battery-charging",
      },
      {
        slug: "charging-cables",
        name: "Charging Cables & Adapters",
        description: "Durable USB-C, Lightning, and Micro-USB cables and adapters.",
        icon: "cable",
      },
    ],
  },
  {
    slug: "cctv-security",
    name: "CCTV & Security Cameras",
    shortName: "CCTV & Security",
    description:
      "Indoor and outdoor security cameras with recording systems for homes and businesses.",
    icon: "video",
    gradient: "rose",
    products: [
      {
        slug: "indoor-dome-cameras",
        name: "Indoor Dome Cameras",
        description: "Discreet dome cameras for offices, shops, and homes.",
        icon: "camera",
      },
      {
        slug: "outdoor-bullet-cameras",
        name: "Outdoor Bullet Cameras",
        description: "Weatherproof bullet cameras with night vision.",
        icon: "video",
      },
      {
        slug: "wireless-ip-cameras",
        name: "Wireless / WiFi IP Cameras",
        description: "Easy-install WiFi cameras with mobile app monitoring.",
        icon: "wifi",
      },
      {
        slug: "nvr-dvr-systems",
        name: "NVR / DVR Recording Systems",
        description: "Multi-channel recorders for storing and reviewing footage.",
        icon: "hard-drive",
      },
    ],
  },
  {
    slug: "solar-panels",
    name: "Solar Panels & Solar Solutions",
    shortName: "Solar Solutions",
    description:
      "Solar panels, inverters, and batteries for reliable, cost-saving power backup.",
    icon: "sun",
    gradient: "orange",
    products: [
      {
        slug: "monocrystalline-panels",
        name: "Monocrystalline Solar Panels",
        description: "High-efficiency panels for homes, offices, and industrial use.",
        icon: "sun",
      },
      {
        slug: "solar-inverters",
        name: "Solar Inverters",
        description: "On-grid and hybrid inverters matched to your load requirements.",
        icon: "zap",
      },
      {
        slug: "solar-batteries",
        name: "Solar Batteries",
        description: "Deep-cycle batteries for extended backup during outages.",
        icon: "battery",
      },
      {
        slug: "solar-kits",
        name: "Complete Solar Kits",
        description: "Bundled home/office kits with panels, inverter, and battery.",
        icon: "package",
      },
    ],
  },
  {
    slug: "networking",
    name: "Networking Devices",
    shortName: "Networking",
    description:
      "Routers, switches, and cabling equipment to keep your network fast and reliable.",
    icon: "router",
    gradient: "purple",
    products: [
      {
        slug: "routers-access-points",
        name: "Routers & Wireless Access Points",
        description: "Dual-band routers and access points for wide WiFi coverage.",
        icon: "router",
      },
      {
        slug: "network-switches",
        name: "Network Switches",
        description: "Managed and unmanaged switches for wired office networks.",
        icon: "network",
      },
      {
        slug: "structured-cabling",
        name: "Structured Cabling & Patch Panels",
        description: "Cat5e/Cat6 cabling and patch panels for structured networks.",
        icon: "cable",
      },
      {
        slug: "range-extenders",
        name: "Range Extenders",
        description: "WiFi extenders and repeaters to eliminate dead zones.",
        icon: "signal",
      },
    ],
  },
];
