import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Check, Heart } from "lucide-react";
import { toast } from "sonner";

import { VehicleCard } from "@/components/site/VehicleCard";
import { Reveal } from "@/components/site/Reveal";
import { formatMileage, formatPrice, getVehicle, vehicles } from "@/data/vehicles";
import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/inventory/$vehicleId")({
  loader: ({ params }) => {
    const vehicle = getVehicle(params.vehicleId);
    if (!vehicle) throw notFound();
    return { vehicle };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Vehicle not found — Aurelia Motorcars" }, { name: "robots", content: "noindex" }],
      };
    }
    const { vehicle } = loaderData;
    const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} — Aurelia Motorcars`;
    const description = `${vehicle.tagline} ${vehicle.horsepower}hp, ${formatMileage(vehicle.mileage)}, ${formatPrice(vehicle.price)}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: VehicleDetail,
});

function VehicleDetail() {
  const { vehicle } = Route.useLoaderData();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [active, setActive] = useState(0);
  const saved = isFavorite(vehicle.id);

  const related = vehicles
    .filter((v) => v.id !== vehicle.id && (v.bodyType === vehicle.bodyType || v.featured))
    .slice(0, 3);

  const specs: [string, string][] = [
    ["Engine", vehicle.engine],
    ["Power", `${vehicle.horsepower} hp`],
    ["0–60 mph", `${vehicle.zeroToSixty} seconds`],
    ["Top speed", `${vehicle.topSpeed} mph`],
    ["Transmission", vehicle.transmission],
    ["Drivetrain", vehicle.drivetrain],
    ["Body style", vehicle.bodyType],
    ["Powertrain", vehicle.fuel],
    ["Mileage", formatMileage(vehicle.mileage)],
    ["Exterior", vehicle.exterior],
    ["Interior", vehicle.interior],
    ["Condition", vehicle.condition],
  ];

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Link
          to="/inventory"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to inventory
        </Link>
      </div>

      <section className="mx-auto mt-8 grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden border border-border/60">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={vehicle.images[active]}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} — view ${active + 1}`}
                width={1280}
                height={800}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {vehicle.images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  "aspect-[16/10] overflow-hidden border transition-colors",
                  i === active ? "border-gold" : "border-border/60 hover:border-gold/50",
                )}
              >
                <img
                  src={img}
                  alt=""
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">
            {vehicle.condition} · {vehicle.year}
          </p>
          <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">
            {vehicle.make}
            <span className="block italic text-gold">{vehicle.model}</span>
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {vehicle.description}
          </p>

          <p className="mt-8 font-display text-4xl text-gold">{formatPrice(vehicle.price)}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Plus applicable taxes and registration
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              search={{ vehicle: vehicle.id }}
              className="flex-1 border border-gold bg-gold px-8 py-4 text-center text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-transparent hover:text-gold"
            >
              Book a viewing
            </Link>
            <button
              type="button"
              onClick={() => {
                const added = toggleFavorite(vehicle.id);
                toast[added ? "success" : "message"](
                  added ? "Added to saved vehicles" : "Removed from saved vehicles",
                );
              }}
              aria-pressed={saved}
              className="inline-flex items-center gap-2 border border-border px-6 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <Heart className={cn("h-4 w-4", saved && "fill-gold text-gold")} />
              {saved ? "Saved" : "Save"}
            </button>
          </div>

          <ul className="mt-10 space-y-3 border-t border-border/60 pt-8">
            {vehicle.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <p className="eyebrow">Specification</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">Technical detail</h2>
        </Reveal>
        <dl className="mt-10 grid gap-x-10 gap-y-6 border-t border-border/60 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {specs.map(([label, value]) => (
            <div key={label} className="border-b border-border/40 pb-4">
              <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                {label}
              </dt>
              <dd className="mt-2 text-base text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-border/60 bg-surface/40">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <Reveal>
            <p className="eyebrow">You may also consider</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">Similar motorcars</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {related.map((v, i) => (
              <VehicleCard key={v.id} vehicle={v} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
