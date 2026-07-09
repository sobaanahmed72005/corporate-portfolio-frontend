import { Phone, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { offices } from "@/lib/data/offices";

export function OfficesSection() {
  return (
    <section className="bg-ink-950 py-16 text-white sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-accent-400">
            Our Offices
          </p>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Where to Find Us
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {offices.map((office) => (
            <div
              key={office.slug}
              className="flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/5 p-6"
            >
              <div className="flex items-center gap-3">
                <GradientIconBadge icon={office.icon} gradient="blue" size="sm" />
                <p className="font-display text-lg font-semibold">{office.name}</p>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <a href={`tel:${office.phone}`} className="hover:text-white">
                    {office.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <a href={`mailto:${office.email}`} className="hover:text-white">
                    {office.email}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <span>{office.address}</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
