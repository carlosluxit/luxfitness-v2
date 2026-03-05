"use client";

import { useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, Clock, Send, Instagram } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG, HOURS } from "@/lib/constants";
import type { CMSSiteSettings } from "@/lib/strapi";

interface ContactPageProps {
  siteSettings?: CMSSiteSettings;
}

export function ContactPage({ siteSettings }: ContactPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const phone = siteSettings?.phone || SITE_CONFIG.phone;
  const email = siteSettings?.email || SITE_CONFIG.email;
  const address = siteSettings?.address || SITE_CONFIG.address;
  const instagram = siteSettings?.instagram || SITE_CONFIG.instagram;
  const hours = siteSettings?.hours || [...HOURS];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      interest: formData.get("interest"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const json = await res.json();
        setError(json.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Could not send message. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Contact"
              title="Get in Touch"
              description="Book a tour, ask about memberships, or simply say hello. We're here to help you start your journey."
              size="large"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 md:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                {submitted ? (
                  <div className="border border-accent/20 bg-accent-dim p-10 text-center">
                    <Send className="w-6 h-6 text-accent mx-auto mb-4" />
                    <h3 className="text-xl font-light text-foreground">
                      Message Sent
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Thank you for reaching out. Our team will get back to you
                      within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          className="w-full bg-transparent border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none transition-colors duration-300"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          className="w-full bg-transparent border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none transition-colors duration-300"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full bg-transparent border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none transition-colors duration-300"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full bg-transparent border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none transition-colors duration-300"
                        placeholder="(514) 000-0000"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="interest"
                        className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2"
                      >
                        I&apos;m interested in
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        className="w-full bg-transparent border border-border px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none transition-colors duration-300 appearance-none"
                      >
                        <option value="" className="bg-background">
                          Select an option
                        </option>
                        <option value="tour" className="bg-background">
                          Booking a Tour
                        </option>
                        <option value="membership" className="bg-background">
                          Membership Information
                        </option>
                        <option value="training" className="bg-background">
                          Personal Training
                        </option>
                        <option value="boxing" className="bg-background">
                          Boxing Classes
                        </option>
                        <option value="physio" className="bg-background">
                          Physiotherapy
                        </option>
                        <option value="other" className="bg-background">
                          Other
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="w-full bg-transparent border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none transition-colors duration-300 resize-none"
                        placeholder="Tell us about your fitness goals..."
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-400">{error}</p>
                    )}

                    <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                      {loading ? "Sending…" : "Send Message"}
                    </Button>
                  </form>
                )}
              </AnimatedSection>
            </div>

            {/* Info Sidebar */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.2}>
                <div className="space-y-8">
                  {/* Contact Info */}
                  <div className="border border-border p-8">
                    <h3 className="text-[10px] tracking-[0.2em] uppercase text-foreground mb-6">
                      Contact Info
                    </h3>
                    <ul className="space-y-5">
                      <li>
                        <a
                          href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                        >
                          <Phone className="w-4 h-4 text-accent shrink-0" />
                          {phone}
                        </a>
                      </li>
                      <li>
                        <a
                          href={`mailto:${email}`}
                          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                        >
                          <Mail className="w-4 h-4 text-accent shrink-0" />
                          {email}
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://maps.google.com/?q=5005+Boulevard+Metropolitain+E+Saint-Leonard+QC"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                        >
                          <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          {address}
                        </a>
                      </li>
                      <li>
                        <a
                          href={instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                        >
                          <Instagram className="w-4 h-4 text-accent shrink-0" />
                          @luxfitnessmtl
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Hours */}
                  <div className="border border-border p-8">
                    <h3 className="text-[10px] tracking-[0.2em] uppercase text-foreground mb-6">
                      Hours
                    </h3>
                    <ul className="space-y-4">
                      {hours.map((h) => (
                        <li
                          key={h.day}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <div>
                            <span className="text-foreground">{h.day}</span>
                            <br />
                            {h.hours}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] bg-surface-elevated border-t border-border relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-accent mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              5005 Boulevard Metropolitain E
            </p>
            <p className="text-sm text-muted-foreground">
              Saint-Leonard, QC H1R 1Z7
            </p>
            <a
              href="https://maps.google.com/?q=5005+Boulevard+Metropolitain+E+Saint-Leonard+QC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-[10px] tracking-[0.15em] uppercase text-accent hover:text-accent-hover transition-colors duration-300"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
