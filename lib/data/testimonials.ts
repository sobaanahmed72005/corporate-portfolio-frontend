import type { GradientName } from "@/components/ui/gradients";

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  gradient: GradientName;
};

/**
 * Placeholder testimonials — replace with real client quotes as they come in.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Ahmed R.",
    role: "Retail Store Owner",
    quote:
      "The CCTV system they installed across our branches has been rock solid. Remote monitoring from one app makes it easy to check in on any location.",
    rating: 5,
    gradient: "rose",
  },
  {
    name: "Sana K.",
    role: "Homeowner",
    quote:
      "Our solar backup setup has completely changed how load-shedding affects us. The team sized the system properly and installation was clean and quick.",
    rating: 5,
    gradient: "orange",
  },
  {
    name: "Bilal M.",
    role: "Office Manager",
    quote:
      "We had constant WiFi dead zones across our floors. They redesigned the whole network and it's been reliable ever since.",
    rating: 5,
    gradient: "purple",
  },
  {
    name: "Fatima N.",
    role: "Procurement Officer",
    quote:
      "Bulk ordering accessories for our labs used to be a hassle. Their team handles sourcing and delivery consistently, order after order.",
    rating: 5,
    gradient: "green",
  },
  {
    name: "Usman T.",
    role: "Homeowner",
    quote:
      "Added a video doorbell and a couple of outdoor cameras. Setup was straightforward and the mobile app just works.",
    rating: 4,
    gradient: "blue",
  },
  {
    name: "Hira S.",
    role: "Corporate Client",
    quote:
      "What stands out is the follow-up support. Whenever something needs a look, they're responsive on WhatsApp and quick to send someone out.",
    rating: 5,
    gradient: "cyan",
  },
];