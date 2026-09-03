import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { VehicleCard } from "@/components/site/VehicleCard";
import { Reveal } from "@/components/site/Reveal";
import { vehicles } from "@/data/vehicles";
import { useFavorites } from "@/lib/favorites";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Saved Vehicles — Aurelia Motorcars" },
      {
        name: "description",
        content: "Your shortlist of saved luxury and performance vehicles at Aurelia Motorcars.",
      },
      { property: "og:title", content: "Saved Vehicles — Aurelia Motorcars" },
      { property: "og:description", content: "Review the motorcars you have shortlisted." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites, ready, clearFavorites } = useFavorites();
  const saved = vehicles.filter((v) => favorites.includes(v.id));

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">Your shortlist</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h1 className="text-5xl sm:text-6xl">Saved Vehicles</h1>
            {saved.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  clearFavorites();
                  toast.message("Shortlist cleared");
                }}
                className="text-xs uppercase tracking-[0.2em] text-gold transition-opacity hover:opacity-70"
              >
                Clear all
              </button>
            )}
          </div>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Saved vehicles stay on this device. Bring your shortlist to a viewing and we will have
            each car prepared.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 pt-14 sm:px-8">
        {!ready ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-96 animate-pulse border border-border/50 bg-surface/40" />
            ))}
          </div>
        ) : saved.length === 0 ? (
          <div className="border border-border/60 bg-surface/40 py-24 text-center">
            <h2 className="text-2xl">Nothing saved yet</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Tap the heart on any vehicle to build your shortlist.
            </p>
            <Link
              to="/inventory"
              className="mt-8 inline-block border border-gold px-8 py-3 text-[0.7rem] uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              Browse inventory
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {saved.map((v, i) => (
              <VehicleCard key={v.id} vehicle={v} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
