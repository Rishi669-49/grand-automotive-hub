import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { formatMileage, formatPrice, type Vehicle } from "@/data/vehicles";
import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";

export function VehicleCard({ vehicle, index = 0 }: { vehicle: Vehicle; index?: number }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(vehicle.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden border border-border/60 bg-surface/60 transition-colors duration-500 hover:border-gold/40"
    >
      <Link
        to="/inventory/$vehicleId"
        params={{ vehicleId: vehicle.id }}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          loading="lazy"
          width={1280}
          height={800}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
        <span className="absolute left-4 top-4 border border-gold/40 bg-background/70 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-gold backdrop-blur">
          {vehicle.condition}
        </span>
      </Link>

      <button
        type="button"
        aria-label={saved ? "Remove from saved vehicles" : "Save vehicle"}
        aria-pressed={saved}
        onClick={() => {
          const added = toggleFavorite(vehicle.id);
          toast[added ? "success" : "message"](
            added
              ? `${vehicle.make} ${vehicle.model} saved`
              : `${vehicle.make} ${vehicle.model} removed`,
          );
        }}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground backdrop-blur transition-colors hover:border-gold/60 hover:text-gold"
      >
        <Heart className={cn("h-4 w-4", saved && "fill-gold text-gold")} />
      </button>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">
          {vehicle.year} · {vehicle.bodyType}
        </p>
        <h3 className="mt-2 text-2xl leading-tight">
          <Link
            to="/inventory/$vehicleId"
            params={{ vehicleId: vehicle.id }}
            className="transition-colors hover:text-gold"
          >
            {vehicle.make} {vehicle.model}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{vehicle.tagline}</p>

        <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-border/50 pt-5 text-xs text-muted-foreground">
          <div>
            <dt className="uppercase tracking-[0.15em]">Power</dt>
            <dd className="mt-1 text-sm text-foreground">{vehicle.horsepower} hp</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.15em]">0–60</dt>
            <dd className="mt-1 text-sm text-foreground">{vehicle.zeroToSixty}s</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.15em]">Mileage</dt>
            <dd className="mt-1 text-sm text-foreground">{formatMileage(vehicle.mileage)}</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-end justify-between">
          <p className="font-display text-3xl text-gold">{formatPrice(vehicle.price)}</p>
          <Link
            to="/inventory/$vehicleId"
            params={{ vehicleId: vehicle.id }}
            className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-gold"
          >
            View detail →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
