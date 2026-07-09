import type { IconName } from "@/components/ui/Icon";
import type { GradientName } from "@/components/ui/gradients";

export type Course = {
  slug: string;
  name: string;
  description: string;
  icon: IconName;
  gradient: GradientName;
};

/**
 * PLACEHOLDER — this section assumes you want to offer installer/technician
 * training alongside your existing services, mirroring a training-academy
 * section from one of the redesign reference sites. If that's not a real
 * offering, delete `components/home/TrainingAcademy.tsx`'s usage in
 * app/page.tsx (and this file) rather than publish courses you don't teach.
 */
export const courses: Course[] = [
  {
    slug: "cctv-installation-certification",
    name: "CCTV Installation Certification",
    description: "Camera placement, cabling, and NVR/DVR setup for installers.",
    icon: "camera",
    gradient: "rose",
  },
  {
    slug: "solar-system-design",
    name: "Solar System Design",
    description: "Load assessment and sizing for grid-tie and hybrid systems.",
    icon: "sun",
    gradient: "orange",
  },
  {
    slug: "networking-fundamentals",
    name: "Networking Fundamentals",
    description: "Structured cabling, routing, and WiFi coverage planning.",
    icon: "network",
    gradient: "purple",
  },
];