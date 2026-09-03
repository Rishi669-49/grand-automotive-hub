import veh1 from "@/assets/veh-1.jpg";
import veh2 from "@/assets/veh-2.jpg";
import veh3 from "@/assets/veh-3.jpg";
import veh4 from "@/assets/veh-4.jpg";
import veh5 from "@/assets/veh-5.jpg";
import veh6 from "@/assets/veh-6.jpg";
import veh7 from "@/assets/veh-7.jpg";
import veh8 from "@/assets/veh-8.jpg";
import veh9 from "@/assets/veh-9.jpg";
import veh10 from "@/assets/veh-10.jpg";
import veh11 from "@/assets/veh-11.jpg";
import veh12 from "@/assets/veh-12.jpg";
import showroom from "@/assets/showroom.jpg";
import hero from "@/assets/hero.jpg";

export type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  bodyType: "Coupe" | "Sedan" | "Convertible" | "SUV";
  fuel: "Petrol" | "Hybrid" | "Electric";
  transmission: string;
  drivetrain: string;
  engine: string;
  horsepower: number;
  zeroToSixty: number;
  topSpeed: number;
  exterior: string;
  interior: string;
  condition: "New" | "Pre-Owned";
  featured: boolean;
  tagline: string;
  description: string;
  features: string[];
  images: string[];
};

const gallery = (main: string) => [main, showroom, hero];

export const vehicles: Vehicle[] = [
  {
    id: "aston-martin-db12-2025",
    make: "Aston Martin",
    model: "DB12 Coupe",
    year: 2025,
    price: 268500,
    mileage: 420,
    bodyType: "Coupe",
    fuel: "Petrol",
    transmission: "8-Speed Automatic",
    drivetrain: "Rear-Wheel Drive",
    engine: "4.0L Twin-Turbo V8",
    horsepower: 671,
    zeroToSixty: 3.5,
    topSpeed: 202,
    exterior: "Lunar Silver",
    interior: "Obsidian Black Leather",
    condition: "New",
    featured: true,
    tagline: "The definitive super tourer.",
    description:
      "A hand-finished super tourer that balances long-distance composure with genuine supercar pace. Delivered with full marque warranty and a bespoke commissioning file.",
    features: [
      "Carbon ceramic brakes",
      "Bowers & Wilkins audio",
      "Adaptive dampers",
      "Ventilated sport seats",
      "Head-up display",
    ],
    images: gallery(veh1),
  },
  {
    id: "bentley-continental-gt-speed-2024",
    make: "Bentley",
    model: "Continental GT Speed",
    year: 2024,
    price: 312000,
    mileage: 1850,
    bodyType: "Coupe",
    fuel: "Petrol",
    transmission: "8-Speed Dual-Clutch",
    drivetrain: "All-Wheel Drive",
    engine: "6.0L Twin-Turbo W12",
    horsepower: 650,
    zeroToSixty: 3.5,
    topSpeed: 208,
    exterior: "Verdant Green",
    interior: "Linen & Beluga Hide",
    condition: "Pre-Owned",
    featured: true,
    tagline: "Crafted velocity, quietly delivered.",
    description:
      "A one-owner Continental GT Speed with the full Mulliner driving specification, finished in Verdant over a two-tone hide cabin with diamond quilting throughout.",
    features: [
      "Mulliner driving specification",
      "Rotating dashboard display",
      "Naim for Bentley audio",
      "Electronic all-wheel steering",
      "Panoramic roof",
    ],
    images: gallery(veh2),
  },
  {
    id: "ferrari-roma-2024",
    make: "Ferrari",
    model: "Roma",
    year: 2024,
    price: 289900,
    mileage: 960,
    bodyType: "Coupe",
    fuel: "Petrol",
    transmission: "8-Speed Dual-Clutch",
    drivetrain: "Rear-Wheel Drive",
    engine: "3.9L Twin-Turbo V8",
    horsepower: 612,
    zeroToSixty: 3.4,
    topSpeed: 199,
    exterior: "Rosso Corsa",
    interior: "Nero Daytona Leather",
    condition: "Pre-Owned",
    featured: true,
    tagline: "La nuova dolce vita.",
    description:
      "Understated mid-front-engined elegance with a soundtrack that never lets you forget its lineage. Full Ferrari service history and remaining factory maintenance programme.",
    features: [
      "Carbon fibre driver zone",
      "Passenger display",
      "Adaptive front lighting",
      "JBL Professional audio",
      "Front lift system",
    ],
    images: gallery(veh3),
  },
  {
    id: "lamborghini-huracan-tecnica-2023",
    make: "Lamborghini",
    model: "Huracán Tecnica",
    year: 2023,
    price: 345000,
    mileage: 2400,
    bodyType: "Coupe",
    fuel: "Petrol",
    transmission: "7-Speed Dual-Clutch",
    drivetrain: "Rear-Wheel Drive",
    engine: "5.2L Naturally Aspirated V10",
    horsepower: 631,
    zeroToSixty: 3.2,
    topSpeed: 202,
    exterior: "Verde Selvans",
    interior: "Nero Ade Alcantara",
    condition: "Pre-Owned",
    featured: false,
    tagline: "The last of the great V10s.",
    description:
      "Track-derived aerodynamics paired with road-usable damping. A naturally aspirated V10 that revs to 8,500rpm and a specification chosen for the purist.",
    features: [
      "Rear-wheel steering",
      "Carbon ceramic brakes",
      "Lifting system",
      "Sport bucket seats",
      "Telemetry package",
    ],
    images: gallery(veh4),
  },
  {
    id: "mclaren-750s-2024",
    make: "McLaren",
    model: "750S",
    year: 2024,
    price: 398000,
    mileage: 310,
    bodyType: "Coupe",
    fuel: "Petrol",
    transmission: "7-Speed Dual-Clutch",
    drivetrain: "Rear-Wheel Drive",
    engine: "4.0L Twin-Turbo V8",
    horsepower: 740,
    zeroToSixty: 2.7,
    topSpeed: 206,
    exterior: "Volcano Orange",
    interior: "Carbon Black Alcantara",
    condition: "New",
    featured: true,
    tagline: "Weightless intent.",
    description:
      "The lightest series-production McLaren in a generation, delivered with the full carbon exterior pack and dihedral doors that still stop traffic.",
    features: [
      "Full carbon fibre exterior pack",
      "Proactive chassis control III",
      "Vehicle lift",
      "360° parking camera",
      "Track telemetry with cameras",
    ],
    images: gallery(veh5),
  },
  {
    id: "porsche-911-turbo-s-2025",
    make: "Porsche",
    model: "911 Turbo S",
    year: 2025,
    price: 254900,
    mileage: 150,
    bodyType: "Coupe",
    fuel: "Petrol",
    transmission: "8-Speed PDK",
    drivetrain: "All-Wheel Drive",
    engine: "3.8L Twin-Turbo Flat-Six",
    horsepower: 640,
    zeroToSixty: 2.6,
    topSpeed: 205,
    exterior: "Carrara White",
    interior: "Bordeaux Red Leather",
    condition: "New",
    featured: false,
    tagline: "Everyday devastation.",
    description:
      "The benchmark all-weather supercar. Delivery mileage only, specified with the lightweight sport package and rear-axle steering.",
    features: [
      "Rear-axle steering",
      "Sport Chrono package",
      "Burmester surround sound",
      "Ceramic composite brakes",
      "Adaptive sport seats plus",
    ],
    images: gallery(veh6),
  },
  {
    id: "rolls-royce-ghost-black-badge-2024",
    make: "Rolls-Royce",
    model: "Ghost Black Badge",
    year: 2024,
    price: 452000,
    mileage: 3100,
    bodyType: "Sedan",
    fuel: "Petrol",
    transmission: "8-Speed Automatic",
    drivetrain: "All-Wheel Drive",
    engine: "6.75L Twin-Turbo V12",
    horsepower: 592,
    zeroToSixty: 4.5,
    topSpeed: 155,
    exterior: "Obsidian Black",
    interior: "Selby Grey & Black Hide",
    condition: "Pre-Owned",
    featured: true,
    tagline: "Silence, engineered.",
    description:
      "The darkened alter ego of the Ghost, with 100kg of acoustic insulation, a Starlight headliner and a commissioning specification worth over $60,000.",
    features: [
      "Starlight headliner",
      "Planar suspension system",
      "Rear theatre configuration",
      "Bespoke audio",
      "Illuminated Pantheon grille",
    ],
    images: gallery(veh7),
  },
  {
    id: "mercedes-amg-gt-63-s-2024",
    make: "Mercedes-AMG",
    model: "GT 63 S",
    year: 2024,
    price: 198500,
    mileage: 5400,
    bodyType: "Coupe",
    fuel: "Hybrid",
    transmission: "9-Speed Automatic",
    drivetrain: "All-Wheel Drive",
    engine: "4.0L Twin-Turbo V8 E-Performance",
    horsepower: 831,
    zeroToSixty: 2.9,
    topSpeed: 196,
    exterior: "Selenite Grey Magno",
    interior: "Black Nappa with Red Stitch",
    condition: "Pre-Owned",
    featured: false,
    tagline: "Hybrid force, hand-built heart.",
    description:
      "One AMG engine, one engineer, one signature — now with an electrified rear axle and the aerodynamic package that makes the numbers stick.",
    features: [
      "AMG Active Ride Control",
      "Burmester 3D surround",
      "Carbon fibre trim",
      "AMG Dynamic Plus package",
      "Rear-axle steering",
    ],
    images: gallery(veh8),
  },
  {
    id: "bmw-m8-competition-2023",
    make: "BMW",
    model: "M8 Competition Gran Coupe",
    year: 2023,
    price: 142000,
    mileage: 8900,
    bodyType: "Sedan",
    fuel: "Petrol",
    transmission: "8-Speed Automatic",
    drivetrain: "All-Wheel Drive",
    engine: "4.4L Twin-Turbo V8",
    horsepower: 617,
    zeroToSixty: 3.0,
    topSpeed: 190,
    exterior: "Marina Bay Blue",
    interior: "Silverstone Merino Leather",
    condition: "Pre-Owned",
    featured: false,
    tagline: "Four doors, no compromise.",
    description:
      "A meticulously maintained M8 Competition with the M Driver's package and carbon exterior details, presenting as new throughout.",
    features: [
      "M Driver's package",
      "M carbon ceramic brakes",
      "Bowers & Wilkins Diamond audio",
      "Carbon fibre roof",
      "Merino extended leather",
    ],
    images: gallery(veh9),
  },
  {
    id: "audi-rs-etron-gt-2025",
    make: "Audi",
    model: "RS e-tron GT",
    year: 2025,
    price: 168900,
    mileage: 90,
    bodyType: "Sedan",
    fuel: "Electric",
    transmission: "2-Speed Automatic",
    drivetrain: "Quattro All-Wheel Drive",
    engine: "Dual Electric Motors, 105kWh",
    horsepower: 912,
    zeroToSixty: 2.4,
    topSpeed: 155,
    exterior: "Florett Silver",
    interior: "Black Dinamica & Leather",
    condition: "New",
    featured: true,
    tagline: "Instant, effortless, silent.",
    description:
      "Performance without theatre. 912hp on overboost, 320kW charging and a cabin finished in sustainable materials with carbon inlays.",
    features: [
      "Active suspension pro",
      "Matrix LED laser lights",
      "Bang & Olufsen 3D audio",
      "320kW DC fast charging",
      "Carbon ceramic brakes",
    ],
    images: gallery(veh10),
  },
  {
    id: "maserati-mc20-2023",
    make: "Maserati",
    model: "MC20",
    year: 2023,
    price: 249000,
    mileage: 4200,
    bodyType: "Coupe",
    fuel: "Petrol",
    transmission: "8-Speed Dual-Clutch",
    drivetrain: "Rear-Wheel Drive",
    engine: "3.0L Twin-Turbo V6 Nettuno",
    horsepower: 621,
    zeroToSixty: 2.9,
    topSpeed: 202,
    exterior: "Blu Infinito",
    interior: "Nero Alcantara",
    condition: "Pre-Owned",
    featured: false,
    tagline: "Trident reborn.",
    description:
      "Carbon monocoque construction, butterfly doors and the Nettuno engine with F1-derived pre-chamber combustion. A modern classic in the making.",
    features: [
      "Carbon fibre monocoque",
      "Butterfly doors",
      "Sonus faber premium audio",
      "Front lift system",
      "Corsa driving mode",
    ],
    images: gallery(veh11),
  },
  {
    id: "range-rover-autobiography-lwb-2025",
    make: "Land Rover",
    model: "Range Rover Autobiography LWB",
    year: 2025,
    price: 189500,
    mileage: 640,
    bodyType: "SUV",
    fuel: "Hybrid",
    transmission: "8-Speed Automatic",
    drivetrain: "All-Wheel Drive",
    engine: "3.0L Inline-Six PHEV",
    horsepower: 542,
    zeroToSixty: 5.3,
    topSpeed: 149,
    exterior: "Santorini Black",
    interior: "Caraway & Ebony Semi-Aniline",
    condition: "New",
    featured: false,
    tagline: "The quietest room on four wheels.",
    description:
      "Long-wheelbase Autobiography specification with rear executive seating, active noise cancellation and a plug-in range of 70 electric-only miles.",
    features: [
      "Executive class rear seating",
      "Meridian Signature Sound",
      "Active noise cancellation",
      "Electronic air suspension",
      "Rear-seat entertainment",
    ],
    images: gallery(veh12),
  },
];

export const heroImage = hero;
export const showroomImage = showroom;

export function getVehicle(id: string): Vehicle | undefined {
  return vehicles.find((v) => v.id === id);
}

export const makes = Array.from(new Set(vehicles.map((v) => v.make))).sort();
export const bodyTypes = Array.from(new Set(vehicles.map((v) => v.bodyType))).sort();
export const fuelTypes = Array.from(new Set(vehicles.map((v) => v.fuel))).sort();

export const priceRange: [number, number] = [
  Math.min(...vehicles.map((v) => v.price)),
  Math.max(...vehicles.map((v) => v.price)),
];

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatMileage(value: number): string {
  return `${new Intl.NumberFormat("en-US").format(value)} mi`;
}
