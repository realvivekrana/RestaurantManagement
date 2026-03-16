import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/athenura.in",
    color: "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    handle: "@athenura.in",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/athenura",
    color: "hover:bg-blue-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    handle: "athenura",
  },
  {
    label: "Twitter / X",
    href: "https://x.com/athenura_in",
    color: "hover:bg-zinc-900",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    handle: "@athenura_in",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Athenura",
    color: "hover:bg-red-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    handle: "@Athenura",
  },
  {
    label: "Medium",
    href: "https://athenura.medium.com/",
    color: "hover:bg-zinc-800",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
      </svg>
    ),
    handle: "athenura.medium.com",
  },
];

const contactInfo = [
  { icon: MapPin, label: "Visit Us", value: "123 Flavor Street, Bandra West, Mumbai 400050", href: "https://maps.google.com" },
  { icon: Phone, label: "Call Us", value: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: Mail, label: "Email Us", value: "hello@athenura.in", href: "mailto:hello@athenura.in" },
  { icon: Clock, label: "Opening Hours", value: "Mon – Sun: 11:00 AM – 11:00 PM", href: null },
];

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const update = (f: string, v: string) => setForm((p) => ({ ...p, [f]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Please fill all required fields"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-secondary/80">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-float-delayed pointer-events-none" />
        <div className="absolute inset-0 hero-pattern pointer-events-none" />
        <div className="container relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-5 py-2 mb-6 animate-fade-in-down">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="font-body text-primary font-semibold text-xs tracking-widest uppercase">Get in Touch</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-secondary-foreground mb-6 animate-fade-in-up">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="font-body text-secondary-foreground/70 text-lg md:text-xl max-w-xl mx-auto animate-fade-in-up stagger-1">
            We'd love to hear from you. Drop us a message or visit us — we're always here to help.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      <div className="container max-w-6xl py-14 space-y-14">
        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up">
          {contactInfo.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <div className="group flex flex-col items-center text-center p-6 bg-card border border-border rounded-2xl hover-lift transition-all duration-300 hover:border-primary/30 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{label}</p>
                <p className="font-body text-sm font-medium text-foreground leading-snug">{value}</p>
              </div>
            );
            return href ? (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
            ) : (
              <div key={label}>{inner}</div>
            );
          })}
        </div>

        {/* Form + Social */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 bg-card border border-border rounded-2xl p-8 space-y-5 animate-slide-in-left">
            <div>
              <h2 className="font-display text-2xl font-bold mb-1">Send a Message</h2>
              <p className="font-body text-sm text-muted-foreground">Fill in the form and we'll respond within 24 hours.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Name <span className="text-destructive">*</span></label>
                <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Rahul Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
              </div>
              <div>
                <label className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Phone</label>
                <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98765 43210" type="tel"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
              </div>
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Email <span className="text-destructive">*</span></label>
              <input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="rahul@example.com" type="email"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
            </div>
            <div>
              <label className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Message <span className="text-destructive">*</span></label>
              <textarea value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us how we can help you..." rows={5}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none" />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-12 font-body font-semibold gap-2 text-base">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <><Send className="w-4 h-4" /> Send Message</>
              )}
            </Button>
          </form>

          {/* Right panel */}
          <div className="lg:col-span-2 flex flex-col gap-5 animate-slide-in-right">
            {/* Social */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold mb-1">Follow Us</h3>
              <p className="font-body text-sm text-muted-foreground mb-5">Stay connected for updates, offers and behind-the-scenes.</p>
              <div className="flex flex-col gap-2.5">
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-background text-foreground hover:text-white hover:border-transparent transition-all duration-300 hover:scale-[1.02] group ${s.color}`}>
                    <span className="shrink-0">{s.icon}</span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-body text-sm font-semibold">{s.label}</span>
                      <span className="font-body text-xs text-muted-foreground group-hover:text-white/70 transition-colors truncate">{s.handle}</span>
                    </div>
                    <span className="ml-auto font-body text-xs text-muted-foreground group-hover:text-white/70 transition-colors shrink-0">Follow →</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick response */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
              <h3 className="font-display text-base font-bold mb-2 text-primary">Quick Response</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                For immediate help, call or WhatsApp us. We respond within{" "}
                <span className="font-semibold text-foreground">2–4 hours</span> during business hours.
              </p>
              <a href="tel:+919876543210" className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary hover:underline">
                <Phone className="w-4 h-4" /> +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
