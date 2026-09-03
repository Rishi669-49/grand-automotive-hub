import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/inventory", label: "Inventory" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { favorites } = useFavorites();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-background/80 to-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl tracking-[0.32em] text-foreground">AURELIA</span>
          <span className="eyebrow mt-1 text-[0.55rem]">Motorcars</span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="relative py-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/favorites"
            aria-label="Saved vehicles"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold"
          >
            <Heart className="h-4 w-4" />
            {favorites.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[0.65rem] font-medium text-primary-foreground">
                {favorites.length}
              </span>
            )}
          </Link>

          <Link
            to="/contact"
            className="hidden rounded-sm border border-gold/60 px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground md:inline-block"
          >
            Book a Viewing
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-foreground lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    activeOptions={{ exact: link.to === "/" }}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border/40 py-4 text-sm uppercase tracking-[0.2em] text-muted-foreground data-[status=active]:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/favorites"
                  onClick={() => setOpen(false)}
                  className="block py-4 text-sm uppercase tracking-[0.2em] text-muted-foreground data-[status=active]:text-gold"
                >
                  Saved ({favorites.length})
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
