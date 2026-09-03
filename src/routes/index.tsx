import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Award, Gauge, ShieldCheck, Sparkles } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { VehicleCard } from "@/components/site/VehicleCard";
import { heroImage, showroomImage, vehicles } from "@/data/vehicles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurelia Motorcars — Private Luxury & Performance Showroom" },
      {
        name: "description",
        content:
          "Browse a curated collection of Aston Martin, Ferrari, McLaren, Rolls-Royce and more at Aurelia Motorcars, a private Mayfair showroom.",
      },
      { property: "og:title", content: "Aurelia Motorcars — Private Luxury Showroom" },
      {
        property: "og:description",
        content: "Twelve exceptional motorcars, inspected, documented and delivered worldwide.",
      },
    ],
  }),
  component: Home,
});

const pillars = [
  {
    icon: ShieldCheck,
    title: "220-Point Inspection",
    body: "Every car is independently assessed and documented before it enters the floor.",
  },
  {
    icon: Award,
    title: "Provenance Assured",
    body: "Full service history, ownership records and factory warranty status on request.",
  },
  {
    icon: Gauge,
    title: "Curated, Not Collected",
    body: "We list fewer cars, chosen for specification, condition and long-term desirability.",
  },
  {
    icon: Sparkles,
    title: "White-Glove Delivery",
    body: "Enclosed transport, registration and handover anywhere in the world.",
  },
];

function Home() {
  const featured = vehicles.filter((v) => v.featured).slice(0, 6);

  return (
    <>
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <img
          src={heroImage}
          alt="A supercar under a single spotlight in a darkened showroom"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pt-28 sm:px-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow"
          >
            Mayfair · Established 1998
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-3xl text-5xl leading-[1.02] sm:text-7xl lg:text-8xl"
          >
            The quiet art of
            <span className="block italic text-gold">extraordinary motorcars</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            A private showroom of twelve exceptional cars at any one time. Each one inspected,
            documented and presented by appointment — never rushed, never crowded.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/inventory"
              className="border border-gold bg-gold px-8 py-4 text-[0.7rem] uppercase tracking-[0.24em] text-primary-foreground transition-colors hover:bg-transparent hover:text-gold"
            >
              View the Collection
            </Link>
            <Link
              to="/contact"
              className="border border-border px-8 py-4 text-[0.7rem] uppercase tracking-[0.24em] text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Book a Private Viewing
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-20 grid max-w-2xl grid-cols-3 gap-8 border-t border-border/60 pt-8"
          >
            {[
              ["27", "Years trading"],
              ["1,400+", "Cars placed"],
              ["48", "Countries delivered"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-3xl text-gold sm:text-4xl">{value}</dt>
                <dd className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <p className="eyebrow">The Collection</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-xl text-4xl sm:text-5xl">Currently on the floor</h2>
            <Link
              to="/inventory"
              className="text-[0.7rem] uppercase tracking-[0.22em] text-gold transition-opacity hover:opacity-70"
            >
              All {vehicles.length} vehicles →
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((vehicle, i) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/40">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden">
              <img
                src={showroomImage}
                alt="Quilted leather interior detail inside the Aurelia showroom"
                loading="lazy"
                width={1280}
                height={800}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/20" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Why Aurelia</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">
              Fewer cars.
              <span className="block italic text-gold">Far more scrutiny.</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              We buy roughly one car in nine that we inspect. The rest are declined on history,
              specification or condition — long before they would ever reach you.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <div key={pillar.title}>
                  <pillar.icon className="h-5 w-5 text-gold" />
                  <h3 className="mt-4 text-lg">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-28 text-center sm:px-8">
        <Reveal>
          <div className="gold-rule mx-auto w-24" />
          <h2 className="mt-8 text-4xl leading-tight sm:text-5xl">
            Tell us the car you are looking for
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Our sourcing desk locates specific specifications across Europe and the Middle East,
            typically within six weeks.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-block border border-gold px-10 py-4 text-[0.7rem] uppercase tracking-[0.24em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            Speak to the concierge
          </Link>
        </Reveal>
      </section>
    </>
  );
}
