import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { vehicles } from "@/data/vehicles";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  vehicle: z.string().optional(),
});

export const Route = createFileRoute("/contact")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Contact & Viewings — Aurelia Motorcars" },
      {
        name: "description",
        content:
          "Book a private viewing or send an enquiry to Aurelia Motorcars, 18 Beaumont Row, Mayfair, London.",
      },
      { property: "og:title", content: "Contact & Viewings — Aurelia Motorcars" },
      {
        property: "og:description",
        content: "Arrange a private appointment at our Mayfair showroom.",
      },
    ],
  }),
  component: ContactPage,
});

const today = new Date().toISOString().slice(0, 10);

const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  phone: z
    .string()
    .min(7, "Enter a contact number")
    .regex(/^[0-9+()\-\s]+$/, "Numbers, spaces and + only"),
  vehicleId: z.string().min(1, "Choose a vehicle"),
  date: z.string().min(1, "Choose a date").refine((d) => d >= today, "Choose a future date"),
  time: z.string().min(1, "Choose a time"),
  notes: z.string().max(500, "Keep notes under 500 characters").optional(),
});

const enquirySchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  subject: z.string().min(3, "Add a short subject"),
  message: z.string().min(20, "Please give us at least 20 characters"),
});

type BookingValues = z.infer<typeof bookingSchema>;
type EnquiryValues = z.infer<typeof enquirySchema>;

const fieldClass =
  "w-full border border-border/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold/70";
const labelClass = "mb-2 block text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground";
const errorClass = "mt-1.5 text-xs text-destructive";

const times = ["09:30", "11:00", "13:00", "14:30", "16:00", "17:30"];

function ContactPage() {
  const { vehicle: preselected } = Route.useSearch();

  const booking = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      vehicleId: preselected ?? "",
      date: "",
      time: "",
      notes: "",
    },
  });

  const enquiry = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onBooking = (values: BookingValues) => {
    const car = vehicles.find((v) => v.id === values.vehicleId);
    toast.success("Viewing requested", {
      description: `${car ? `${car.make} ${car.model}` : "Your appointment"} on ${values.date} at ${values.time}. Our concierge will confirm by email.`,
    });
    booking.reset({
      name: "",
      email: "",
      phone: "",
      vehicleId: "",
      date: "",
      time: "",
      notes: "",
    });
  };

  const onEnquiry = (values: EnquiryValues) => {
    toast.success("Message sent", {
      description: `Thank you, ${values.name.split(" ")[0]}. We reply to every enquiry within one business day.`,
    });
    enquiry.reset();
  };

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl">
            Book a private viewing
            <span className="block italic text-gold">or simply ask us a question.</span>
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <form
            noValidate
            onSubmit={booking.handleSubmit(onBooking)}
            className="border border-border/60 bg-surface/50 p-6 sm:p-9"
          >
            <h2 className="text-2xl">Request an appointment</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Viewings run Monday to Saturday, one client at a time.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="b-name">
                  Full name
                </label>
                <input id="b-name" className={fieldClass} {...booking.register("name")} />
                {booking.formState.errors.name && (
                  <p className={errorClass}>{booking.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass} htmlFor="b-email">
                  Email
                </label>
                <input
                  id="b-email"
                  type="email"
                  className={fieldClass}
                  {...booking.register("email")}
                />
                {booking.formState.errors.email && (
                  <p className={errorClass}>{booking.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass} htmlFor="b-phone">
                  Telephone
                </label>
                <input id="b-phone" className={fieldClass} {...booking.register("phone")} />
                {booking.formState.errors.phone && (
                  <p className={errorClass}>{booking.formState.errors.phone.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass} htmlFor="b-vehicle">
                  Vehicle of interest
                </label>
                <select id="b-vehicle" className={fieldClass} {...booking.register("vehicleId")}>
                  <option value="">Select a vehicle</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.year} {v.make} {v.model}
                    </option>
                  ))}
                </select>
                {booking.formState.errors.vehicleId && (
                  <p className={errorClass}>{booking.formState.errors.vehicleId.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass} htmlFor="b-date">
                  Preferred date
                </label>
                <input
                  id="b-date"
                  type="date"
                  min={today}
                  className={fieldClass}
                  {...booking.register("date")}
                />
                {booking.formState.errors.date && (
                  <p className={errorClass}>{booking.formState.errors.date.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass} htmlFor="b-time">
                  Preferred time
                </label>
                <select id="b-time" className={fieldClass} {...booking.register("time")}>
                  <option value="">Select a time</option>
                  {times.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {booking.formState.errors.time && (
                  <p className={errorClass}>{booking.formState.errors.time.message}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="b-notes">
                  Notes (optional)
                </label>
                <textarea
                  id="b-notes"
                  rows={4}
                  className={cn(fieldClass, "resize-none")}
                  {...booking.register("notes")}
                />
                {booking.formState.errors.notes && (
                  <p className={errorClass}>{booking.formState.errors.notes.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={booking.formState.isSubmitting}
              className="mt-8 w-full border border-gold bg-gold px-8 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-transparent hover:text-gold disabled:opacity-60"
            >
              Request viewing
            </button>
          </form>

          <form
            noValidate
            onSubmit={enquiry.handleSubmit(onEnquiry)}
            className="mt-10 border border-border/60 bg-surface/50 p-6 sm:p-9"
          >
            <h2 className="text-2xl">General enquiry</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sourcing requests, part-exchange valuations and finance questions.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="e-name">
                  Full name
                </label>
                <input id="e-name" className={fieldClass} {...enquiry.register("name")} />
                {enquiry.formState.errors.name && (
                  <p className={errorClass}>{enquiry.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass} htmlFor="e-email">
                  Email
                </label>
                <input
                  id="e-email"
                  type="email"
                  className={fieldClass}
                  {...enquiry.register("email")}
                />
                {enquiry.formState.errors.email && (
                  <p className={errorClass}>{enquiry.formState.errors.email.message}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="e-subject">
                  Subject
                </label>
                <input id="e-subject" className={fieldClass} {...enquiry.register("subject")} />
                {enquiry.formState.errors.subject && (
                  <p className={errorClass}>{enquiry.formState.errors.subject.message}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="e-message">
                  Message
                </label>
                <textarea
                  id="e-message"
                  rows={5}
                  className={cn(fieldClass, "resize-none")}
                  {...enquiry.register("message")}
                />
                {enquiry.formState.errors.message && (
                  <p className={errorClass}>{enquiry.formState.errors.message.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full border border-border px-8 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Send message
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="border border-border/60 bg-surface/50 p-6 sm:p-9">
            <h2 className="text-2xl">The showroom</h2>
            <ul className="mt-8 space-y-6 text-sm text-muted-foreground">
              <li className="flex gap-4">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  18 Beaumont Row
                  <br />
                  Mayfair, London W1K
                  <br />
                  United Kingdom
                </span>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href="tel:+442071234567" className="transition-colors hover:text-gold">
                  +44 20 7123 4567
                </a>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href="mailto:concierge@aureliamotorcars.com"
                  className="break-all transition-colors hover:text-gold"
                >
                  concierge@aureliamotorcars.com
                </a>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  Monday–Friday · 09:00–19:00
                  <br />
                  Saturday · 10:00–17:00
                  <br />
                  Sunday · By arrangement
                </span>
              </li>
            </ul>

            <div className="mt-9 border-t border-border/50 pt-7">
              <p className="eyebrow">Private appointments</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We schedule one client at a time so the floor is yours. Allow ninety minutes for a
                full viewing and road test.
              </p>
            </div>
          </aside>
        </Reveal>
      </section>
    </div>
  );
}
