import { createFileRoute, Link } from "@tanstack/react-router";

import { Reveal } from "@/components/site/Reveal";
import { heroImage, showroomImage } from "@/data/vehicles";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aurelia Motorcars" },
      {
        name: "description",
        content:
          "Founded in 1998, Aurelia Motorcars is a private Mayfair showroom specialising in curated luxury and performance vehicles.",
      },
      { property: "og:title", content: "About — Aurelia Motorcars" },
      {
        property: "og:description",
        content: "Twenty-seven years of curating exceptional motorcars in Mayfair.",
      },
    ],
  }),
  component: AboutPage,
});

const milestones = [
  ["1998", "Founded on Beaumont Row with four cars and one lift."],
  ["2006", "Opened the sourcing desk, locating specific specifications across Europe."],
  ["2014", "Introduced the 220-point independent inspection standard."],
  ["2021", "Enclosed global delivery reaches its 48th country."],
  ["2026", "The collection remains deliberately capped at twelve cars."],
];

const team = [
  ["Elena Farrow", "Founder & Principal", "Former factory-trained marque specialist."],
  ["Marcus Idowu", "Head of Sourcing", "Twenty years placing rare specifications."],
  ["Sofia Renner", "Client Concierge", "Handles viewings, delivery and registration."],
];

function AboutPage() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">Since 1998</p>
          <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl">
            We would rather sell one right car
            <span className="block italic text-gold">than ten convenient ones.</span>
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-5 sm:px-8">
        <Reveal>
          <img
            src={heroImage}
            alt="The Aurelia showroom floor at night"
            loading="lazy"
            width={1920}
            height={1080}
            className="aspect-[21/9] w-full object-cover"
          />
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl">A showroom, not a forecourt</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
            <p>
              Aurelia began as a single lift beneath a Mayfair townhouse. The premise has not
              changed: buy carefully, document everything, and give each client the room to make an
              unhurried decision.
            </p>
            <p>
              Our inspection standard is independent of the sale. If a car fails, it leaves — even
              when it has already been bought. That discipline is the reason more than half of our
              clients return.
            </p>
            <p>
              Viewings are private and by appointment. There is no floor traffic, no queue, and no
              expectation that you decide on the day.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border/60 bg-surface/40">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <Reveal>
            <p className="eyebrow">Milestones</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">Twenty-seven years, quietly</h2>
          </Reveal>
          <ol className="mt-12 space-y-0">
            {milestones.map(([year, text], i) => (
              <Reveal key={year} delay={i * 0.05}>
                <li className="grid gap-4 border-t border-border/50 py-7 sm:grid-cols-[8rem_1fr]">
                  <span className="font-display text-2xl text-gold">{year}</span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <img
            src={showroomImage}
            alt="Quilted leather cabin detail"
            loading="lazy"
            width={1280}
            height={800}
            className="w-full object-cover"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">The people</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">Who you will deal with</h2>
          <div className="mt-10 space-y-8">
            {team.map(([name, role, note]) => (
              <div key={name} className="border-l border-gold/40 pl-6">
                <h3 className="text-xl">{name}</h3>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-gold">{role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{note}</p>
              </div>
            ))}
          </div>
          <Link
            to="/contact"
            className="mt-10 inline-block border border-gold px-8 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            Arrange a visit
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
