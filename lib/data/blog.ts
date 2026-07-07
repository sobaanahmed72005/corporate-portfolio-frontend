export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  body: string[];
};

/**
 * Placeholder blog content — replace with real posts over time. `date` is a
 * plain display string (not parsed), kept in "Month D, YYYY" format.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "signs-your-business-needs-a-cctv-upgrade",
    title: "5 Signs Your Business Needs a CCTV Upgrade",
    category: "Security",
    date: "June 10, 2026",
    author: "IT Solutions Team",
    excerpt:
      "Grainy footage and blind spots aren't just inconvenient — they're a liability. Here's how to tell it's time to upgrade your camera system.",
    body: [
      "A lot of businesses only think about their CCTV system after something goes wrong — a break-in, a dispute over a delivery, or a customer complaint with no footage to back it up. By then, the gap in coverage has already cost you. Here are five signs it's time for an upgrade before that happens.",
      "First, if your footage is too grainy to identify a face or a license plate, your cameras are past their useful life. Older analog cameras and low-resolution IP cameras simply don't hold up to scrutiny when footage actually matters.",
      "Second, blind spots. As a business grows — a new storage room, an extra entrance, an expanded parking area — camera coverage often doesn't grow with it. A proper site survey catches these gaps before they become a problem.",
      "Third, no remote access. If you can only view footage by physically walking to a recorder, you're missing one of the biggest benefits of modern systems: checking in on any location from your phone, anywhere.",
      "Fourth, storage that fills up too fast. Short retention windows mean that by the time you realize you need footage from two weeks ago, it's already been overwritten. Modern NVR systems with adequate storage solve this.",
      "Fifth, no night vision or weatherproofing on outdoor cameras. Most incidents worth catching on camera happen after dark or in bad weather — cameras that can't handle either aren't doing their job.",
      "If any of these sound familiar, a site survey is the right next step. We assess your current setup, identify gaps, and recommend a system sized to your actual risk — not an oversized quote you don't need.",
    ],
  },
  {
    slug: "how-much-can-solar-really-save-you",
    title: "How Much Can Solar Really Save You in Pakistan?",
    category: "Solar Energy",
    date: "May 22, 2026",
    author: "IT Solutions Team",
    excerpt:
      "Between rising electricity bills and frequent load-shedding, solar is no longer a luxury upgrade. Here's how the math actually works.",
    body: [
      "The two biggest reasons homes and businesses in Pakistan are moving to solar are rising per-unit electricity costs and load-shedding that disrupts work and daily life. Solar addresses both at once — but the savings depend heavily on how the system is sized.",
      "An oversized system wastes money on capacity you don't use; an undersized one leaves you still dependent on the grid during peak load. The right approach starts with a load assessment: what do you actually run, and when? A household running a few fans, lights, and a fridge has very different needs than one also running AC units and a water pump.",
      "Grid-tied systems are typically the lowest-cost entry point and reduce your monthly bill by offsetting daytime grid consumption, but they don't help during outages unless paired with a battery. Hybrid systems add battery backup, so you keep power during load-shedding, at a higher upfront cost.",
      "Payback periods vary, but most properly sized residential systems in Pakistan pay for themselves well within a few years through reduced bills alone — before even factoring in the value of uninterrupted power during outages.",
      "The mistake we see most often is a system bought off a generic package size rather than an actual load calculation. That's why every installation starts with sizing the system to your real usage, not a one-size-fits-all kit.",
    ],
  },
  {
    slug: "cat5e-vs-cat6-which-cabling-does-your-office-need",
    title: "Cat5e vs Cat6: Which Cabling Does Your Office Need?",
    category: "Networking",
    date: "April 30, 2026",
    author: "IT Solutions Team",
    excerpt:
      "Structured cabling outlasts almost everything else in your office. Choosing the wrong standard means re-doing the walls in a few years.",
    body: [
      "Structured cabling is one of the few things in an office that's expensive and disruptive to redo — it's behind walls, under floors, and inside ceilings. Getting the standard right the first time matters more than most other IT decisions.",
      "Cat5e supports gigabit speeds over shorter distances and is the cheaper option, still adequate for smaller offices with modest bandwidth needs — mostly web browsing, email, and light file sharing.",
      "Cat6 supports higher bandwidth over longer runs and handles 10-gigabit speeds at shorter distances, with better resistance to interference. For offices doing more — video conferencing across many rooms, larger file transfers, VoIP phones, or planning to grow headcount — Cat6 is worth the modest extra cost upfront.",
      "The bigger factor is often not the cable itself but the installation quality: proper cable management, correctly terminated patch panels, and a design that accounts for where new workstations and access points will go as the office grows.",
      "Our approach is to map out your current and near-future needs during the site survey, then recommend the cabling standard that avoids over- or under-building. Re-cabling later costs far more than choosing right the first time.",
    ],
  },
  {
    slug: "buyers-guide-choosing-the-right-power-bank",
    title: "A Buyer's Guide to Choosing the Right Power Bank",
    category: "IT Accessories",
    date: "April 8, 2026",
    author: "IT Solutions Team",
    excerpt:
      "Not all power banks are built the same. Capacity, output, and charging speed all matter more than the number printed on the box.",
    body: [
      "Power bank shopping usually starts and ends with the mAh number on the box, but that number alone doesn't tell you how useful the power bank actually is. A few other specs matter just as much.",
      "Output wattage determines how fast it charges your devices — a high-capacity power bank with low output wattage will still charge your laptop or tablet slowly. If you're charging a laptop, look for at least 65W PD output; for phones, 20W is usually plenty.",
      "Input charging speed matters too — a large-capacity power bank with slow input charging can take most of a day to refill itself, which defeats the purpose if you need it charged quickly between uses.",
      "Number of ports and simultaneous charging capability matters if you're regularly charging more than one device — check whether total output is shared or independent per port.",
      "Finally, build quality and safety certification matter more than they get credit for — a power bank with a poorly regulated battery is a real safety risk. We only stock power banks that meet recognized safety standards, not the cheapest unbranded imports.",
      "If you're not sure what capacity or output you need, tell us what devices you're charging and how often — we'll point you to the right option instead of the most expensive one.",
    ],
  },
  {
    slug: "load-shedding-proofing-your-home-solar-vs-ups-vs-generator",
    title: "Load-Shedding-Proofing Your Home: Solar vs. UPS vs. Generator",
    category: "Solar Energy",
    date: "March 15, 2026",
    author: "IT Solutions Team",
    excerpt:
      "Each backup option has a different cost, noise, and maintenance profile. Here's how to pick the right one for your household.",
    body: [
      "When the power goes out, there are really three practical options: a UPS with batteries, a generator, or a solar system with battery backup. Each has real trade-offs, and the right choice depends on your budget, how long outages typically last, and what you need to keep running.",
      "A UPS is the lowest upfront cost and works well for short outages — enough to keep lights, fans, and a router running for an hour or two. Batteries need periodic replacement, and capacity is limited, so it's not a solution for extended load-shedding.",
      "A generator provides power for as long as you have fuel, making it suited to longer outages, but comes with ongoing fuel costs, noise, and maintenance — and most people don't want one running through the night.",
      "A solar-plus-battery system has the highest upfront cost but the lowest running cost over time — no fuel, minimal noise, and it offsets your daytime grid bill even when there's no outage at all. For households dealing with frequent, long load-shedding, it's usually the option that pays for itself fastest.",
      "In practice, many households combine a smaller UPS for instant, silent backup with a solar system sized for both daily savings and longer outages. We can walk through your typical outage pattern and monthly bill to recommend a combination that actually fits your situation.",
    ],
  },
  {
    slug: "bulk-procurement-tips-for-corporate-it-accessories",
    title: "Bulk Procurement Tips for Corporate IT Accessories",
    category: "Corporate Supply",
    date: "February 20, 2026",
    author: "IT Solutions Team",
    excerpt:
      "Ordering chargers, cables, and peripherals for a whole office is different from a one-off purchase. Here's what to plan for.",
    body: [
      "Corporate procurement for IT accessories runs into problems that a single retail purchase never does: consistency across a large order, delivery timing across multiple sites, and reliable restocking for ongoing needs like onboarding kits.",
      "Consistency matters more than people expect — receiving 200 chargers where some are a slightly different model than others creates support headaches down the line. Working with a single supplier who can guarantee the same spec across the full order avoids this.",
      "Delivery coordination is the second common gap. A single-site delivery is simple; coordinating delivery to five branches on a schedule that matches your rollout plan is a different problem, and worth discussing upfront rather than after the order is placed.",
      "For recurring needs — like accessory kits for new hires every month — setting up a standing order with agreed lead times removes the need to re-negotiate and re-source every single time.",
      "Volume pricing is the obvious benefit of bulk ordering, but the bigger long-term value is having one dependable point of contact for sourcing, consistency, and delivery — rather than re-shopping every order from scratch.",
    ],
  },
];