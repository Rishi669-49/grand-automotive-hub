import { createFileRoute, Link } from "@tanstack/react-router";
import { Banknote, Globe2, Search, ShieldCheck, Sparkles, Wrench } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Aurelia Motorcars" },
      {
        name: "description",
        content:
          "Sourcing, part-exchange, structured finance, enclosed global delivery, detailing and servicing for luxury and performance vehicles.",
      },
      { property: "og:title", content: "Services — Aurelia Motorcars" },
      {
        property: "og:description",
        content: "Sourcing, finance, delivery and care for exceptional motorcars.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Search,
    title: "Bespoke Sourcing",
    body: "Give us the specification and we will locate it across Europe and the Middle East, typically within six weeks.",
    points: ["Specification brief", "Independent inspection", "Negotiated acquisition"],
  },
  {
    icon: Banknote,
    title: "Structured Finance",
    body: "Hire purchase, lease purchase and balloon structures arranged through specialist prestige lenders.",
    points: ["Decisions in 24 hours", "Terms 12–60 months", "Balloon and PCP options"],
  },
  {
    icon: Globe2,
    title: "Global Delivery",
    body: "Enclosed transport, export documentation and registration handled to your door in 48 countries.",
    points: ["Covered transport", "Customs handling", "Handover at your address"],
  },
  {
    icon: ShieldCheck,
    title: "220-Point Inspection",
    body: "Independent mechanical, cosmetic and paint-depth assessment documented before any sale.",
    points: ["Paint depth mapping", "Diagnostic report", "Provenance verification"],
  },
  {
    icon: Wrench,
    title: "Servicing & Storage",
    body: "Marque-trained servicing, climate-controlled storage and battery conditioning between drives.",
    points: ["Climate storage", "Trickle conditioning", "Annual service plans"],
  },
  {
    icon: Sparkles,
    title: "Detailing & Protection",
    body: "Paint correction, ceramic coating and paint protection film applied in-house.",
    points: ["Multi-stage correction", "PPF application", "Ceramic coating"],
  },
];

function ServicesPage() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">What we do</p>
          <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl">
            Everything around the car,
            <span className="block italic text-gold">handled properly.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Buying is the short part. Sourcing, funding, delivering and caring for the car is where
            most of our work happens.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-px border border-border/60 bg-border/60 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.05} className="bg-background">
              <div className="h-full bg-surface/40 p-8 transition-colors duration-500 hover:bg-surface">
                <service.icon className="h-6 w-6 text-gold" />
                <h2 className="mt-6 text-2xl">{service.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
                <ul className="mt-6 space-y-2 border-t border-border/50 pt-5">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-surface/40">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">
          <Reveal>
            <div className="gold-rule mx-auto w-24" />
            <h2 className="mt-8 text-4xl sm:text-5xl">Start with a conversation</h2>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Tell us what you are trying to achieve and we will tell you honestly whether we can
              help.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="border border-gold bg-gold px-8 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-transparent hover:text-gold"
              >
                Contact the desk
              </Link>
              <Link
                to="/inventory"
                className="border border-border px-8 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                View inventory
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
