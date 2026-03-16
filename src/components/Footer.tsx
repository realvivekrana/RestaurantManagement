import { Link, useLocation } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Flame } from "lucide-react";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

const Footer = () => {
  const location = useLocation();

  if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/profile")) {
    return null;
  }

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main footer grid */}
      <div className="container pt-16 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <img src="/athenurawhitelogo.png" alt="Athenura" className="h-14 w-auto object-contain mb-4" />
          <p className="font-body text-sm text-secondary-foreground/65 leading-relaxed mb-6">
            A culinary experience that blends tradition with innovation. Every dish tells a story of passion and flavor.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 rounded-lg bg-secondary-foreground/10 hover:bg-primary hover:text-primary-foreground text-secondary-foreground/60 flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Trending Dishes */}
        <div className="lg:col-span-1">
          <h4 className="font-display text-base font-semibold mb-5 text-secondary-foreground flex items-center gap-2">
            <Flame className="w-4 h-4 text-primary" /> Trending Dishes
          </h4>
          <p className="font-body text-sm text-secondary-foreground/60 leading-relaxed mb-4">
            Discover our most loved and frequently ordered dishes by our guests.
          </p>
          <Link
            to="/trending"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary hover:underline transition-colors"
          >
            <Flame className="w-3.5 h-3.5" /> View Trending Dishes →
          </Link>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-base font-semibold mb-5 text-secondary-foreground">Quick Links</h4>
          <nav className="flex flex-col gap-2.5">
            {[
              { to: "/menu", label: "Menu" },
              { to: "/reservation", label: "Reservations" },
              { to: "/gallery", label: "Gallery" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-body text-sm text-secondary-foreground/60 hover:text-primary hover:translate-x-1 transition-all duration-200 w-fit"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-display text-base font-semibold mb-5 text-secondary-foreground">Legal</h4>
          <nav className="flex flex-col gap-2.5">
            <Link to="/terms" className="font-body text-sm text-secondary-foreground/60 hover:text-primary hover:translate-x-1 transition-all duration-200 w-fit">Terms & Conditions</Link>
            <Link to="/privacy" className="font-body text-sm text-secondary-foreground/60 hover:text-primary hover:translate-x-1 transition-all duration-200 w-fit">Privacy Policy</Link>
          </nav>

          <h4 className="font-display text-base font-semibold mt-8 mb-5 text-secondary-foreground">Hours</h4>
          <div className="flex items-start gap-2 font-body text-sm text-secondary-foreground/60">
            <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p>Mon – Sun</p>
              <p>11:00 AM – 11:00 PM</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-base font-semibold mb-5 text-secondary-foreground">Contact</h4>
          <div className="flex flex-col gap-4">
            {[
              { icon: MapPin, text: "123 Flavor Street, Bandra West, Mumbai 400050" },
              { icon: Phone, text: "+91 98765 43210" },
              { icon: Mail, text: "hello@athenura.in" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <p className="font-body text-sm text-secondary-foreground/65 leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-secondary-foreground/40">
            © 2026 Athenura Restaurant. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-secondary-foreground/30 hover:text-primary transition-colors duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
