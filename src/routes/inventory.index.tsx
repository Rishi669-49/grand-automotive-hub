import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";

import { VehicleCard } from "@/components/site/VehicleCard";
import { Reveal } from "@/components/site/Reveal";
import {
  bodyTypes,
  formatPrice,
  fuelTypes,
  makes,
  priceRange,
  vehicles,
  type Vehicle,
} from "@/data/vehicles";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/inventory/")({
  head: () => ({
    meta: [
      { title: "Inventory — Aurelia Motorcars" },
      {
        name: "description",
        content:
          "Search, filter and sort the full Aurelia Motorcars collection of luxury and performance vehicles, from Porsche to Rolls-Royce.",
      },
      { property: "og:title", content: "Inventory — Aurelia Motorcars" },
      {
        property: "og:description",
        content: "Twelve curated luxury and performance vehicles available now.",
      },
    ],
  }),
  component: InventoryPage,
});

type SortKey = "featured" | "price-asc" | "price-desc" | "year-desc" | "power-desc" | "mileage-asc";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "year-desc", label: "Newest Year" },
  { value: "power-desc", label: "Most Powerful" },
  { value: "mileage-asc", label: "Lowest Mileage" },
];

function sortVehicles(list: Vehicle[], key: SortKey): Vehicle[] {
  const sorted = [...list];
  switch (key) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "year-desc":
      return sorted.sort((a, b) => b.year - a.year);
    case "power-desc":
      return sorted.sort((a, b) => b.horsepower - a.horsepower);
    case "mileage-asc":
      return sorted.sort((a, b) => a.mileage - b.mileage);
    default:
      return sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

function InventoryPage() {
  const [query, setQuery] = useState("");
  const [make, setMake] = useState("All");
  const [body, setBody] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [maxPrice, setMaxPrice] = useState(priceRange[1]);
  const [sort, setSort] = useState<SortKey>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = vehicles.filter((v) => {
      const haystack =
        `${v.make} ${v.model} ${v.year} ${v.bodyType} ${v.fuel} ${v.exterior} ${v.engine}`.toLowerCase();
      if (q && !haystack.includes(q)) return false;
      if (make !== "All" && v.make !== make) return false;
      if (body !== "All" && v.bodyType !== body) return false;
      if (fuel !== "All" && v.fuel !== fuel) return false;
      if (v.price > maxPrice) return false;
      return true;
    });
    return sortVehicles(filtered, sort);
  }, [query, make, body, fuel, maxPrice, sort]);

  const activeFilters =
    (make !== "All" ? 1 : 0) +
    (body !== "All" ? 1 : 0) +
    (fuel !== "All" ? 1 : 0) +
    (maxPrice < priceRange[1] ? 1 : 0);

  const reset = () => {
    setQuery("");
    setMake("All");
    setBody("All");
    setFuel("All");
    setMaxPrice(priceRange[1]);
    setSort("featured");
  };

  const selectClass =
    "w-full border border-border/70 bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold/70";

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">The Collection</p>
          <h1 className="mt-4 text-5xl sm:text-6xl">Inventory</h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Every car below is physically on our floor in Mayfair and available to view by
            appointment.
          </p>
        </Reveal>

        <div className="mt-12 border border-border/60 bg-surface/50 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search make, model, colour or engine…"
                aria-label="Search vehicles"
                className="w-full border border-border/70 bg-background py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-gold/70"
              />
            </div>

            <div className="flex gap-3">
              <label className="sr-only" htmlFor="sort">
                Sort vehicles
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className={cn(selectClass, "min-w-48")}
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setFiltersOpen((v) => !v)}
                aria-expanded={filtersOpen}
                className="inline-flex items-center gap-2 border border-border/70 px-5 py-3 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters{activeFilters > 0 ? ` (${activeFilters})` : ""}
              </button>
            </div>
          </div>

          <div className={cn("mt-5 gap-4 lg:grid lg:grid-cols-4", filtersOpen ? "grid" : "hidden")}>
            <div>
              <label
                htmlFor="make"
                className="mb-2 block text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground"
              >
                Make
              </label>
              <select
                id="make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className={selectClass}
              >
                <option value="All">All makes</option>
                {makes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="body"
                className="mb-2 block text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground"
              >
                Body
              </label>
              <select
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className={selectClass}
              >
                <option value="All">All body styles</option>
                {bodyTypes.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="fuel"
                className="mb-2 block text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground"
              >
                Powertrain
              </label>
              <select
                id="fuel"
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
                className={selectClass}
              >
                <option value="All">All powertrains</option>
                {fuelTypes.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground"
              >
                Max price · {formatPrice(maxPrice)}
              </label>
              <input
                id="price"
                type="range"
                min={priceRange[0]}
                max={priceRange[1]}
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-4 w-full accent-[var(--gold)]"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {results.length} {results.length === 1 ? "vehicle" : "vehicles"} available
            </p>
            {(activeFilters > 0 || query) && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold transition-opacity hover:opacity-70"
              >
                <X className="h-3.5 w-3.5" />
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 pt-12 sm:px-8">
        {results.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-border/60 bg-surface/40 py-24 text-center"
          >
            <h2 className="text-2xl">No vehicles match those criteria</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Adjust your filters, or ask our sourcing desk to find it for you.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 border border-gold px-8 py-3 text-[0.7rem] uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              Reset search
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {results.map((vehicle, i) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
