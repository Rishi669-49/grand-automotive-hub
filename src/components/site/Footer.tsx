import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl tracking-[0.32em]">AURELIA</p>
          <p className="eyebrow mt-1">Motorcars</p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A private showroom for exceptional motorcars. Every vehicle inspected across 220 points,
            documented, and delivered by appointment.
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.24em] text-foreground">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>
              <Link to="/inventory" className="transition-colors hover:text-gold">
                Inventory
              </Link>
            </li>
            <li>
              <Link to="/services" className="transition-colors hover:text-gold">
                Services
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-gold">
                About
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="transition-colors hover:text-gold">
                Saved Vehicles
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-gold">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.24em] text-foreground">Showroom</h3>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>18 Beaumont Row, Mayfair, London W1K</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href="tel:+442071234567" className="transition-colors hover:text-gold">
                +44 20 7123 4567
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a
                href="mailto:concierge@aureliamotorcars.com"
                className="transition-colors hover:text-gold"
              >
                concierge@aureliamotorcars.com
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>Mon–Sat, 09:00–19:00 · By appointment</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Aurelia Motorcars. All rights reserved.</p>
          <p className="tracking-[0.18em] uppercase">Private sales · Global delivery</p>
        </div>
      </div>
    </footer>
  );
}
