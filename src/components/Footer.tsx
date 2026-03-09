import { Link, useLocation } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  const location = useLocation();
  
  // Hide footer on admin and user dashboard pages
  if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/profile")) {
    return null;
  }

  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div>
          <h3 className="font-display text-2xl font-bold mb-4">
            Spice Garden<span className="text-primary">.</span>
          </h3>
          <p className="font-body text-sm text-secondary-foreground/70 leading-relaxed">
            A culinary experience that blends tradition with innovation. Every dish tells a story of passion and flavor.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
          <nav className="flex flex-col gap-2 font-body text-sm text-secondary-foreground/70">
            <Link to="/menu" className="hover:text-primary transition-colors">Menu</Link>
            <Link to="/reservation" className="hover:text-primary transition-colors">Reservations</Link>
            <Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Legal</h4>
          <nav className="flex flex-col gap-2 font-body text-sm text-secondary-foreground/70">
            <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          </nav>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 font-body text-sm text-secondary-foreground/70">
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> 123 Flavor Street, Mumbai</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +91 98765 43210</div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> hello@spicegarden.in</div>
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> 11 AM – 11 PM, Daily</div>
          </div>
        </div>
      </div>
      <div className="container border-t border-secondary-foreground/10 pt-6">
        <p className="text-center font-body text-xs text-secondary-foreground/50">
          © 2026 Spice Garden Restaurant. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
