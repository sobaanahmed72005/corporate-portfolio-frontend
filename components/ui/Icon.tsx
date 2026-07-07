import {
  Plug,
  Car,
  BatteryCharging,
  Cable,
  Video,
  Camera,
  Wifi,
  HardDrive,
  Sun,
  Zap,
  Battery,
  Package,
  Router,
  Network,
  Signal,
  Wrench,
  type LucideProps,
} from "lucide-react";

const iconMap = {
  plug: Plug,
  car: Car,
  "battery-charging": BatteryCharging,
  cable: Cable,
  video: Video,
  camera: Camera,
  wifi: Wifi,
  "hard-drive": HardDrive,
  sun: Sun,
  zap: Zap,
  battery: Battery,
  package: Package,
  router: Router,
  network: Network,
  signal: Signal,
  wrench: Wrench,
} as const;

export type IconName = keyof typeof iconMap;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = iconMap[name];
  return <Component {...props} />;
}
