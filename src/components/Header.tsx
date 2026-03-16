import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/reservation", label: "Reserve" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (location.pathname !== prevPath) {
      setMobileOpen(false);
      setPrevPath(location.pathname);
    }
  }, [location.pathname, prevPath]);

  if (location.pathname.startsWith("/admin")) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-border/60"
          : "bg-background/70 backdrop-blur-md border-b border-transparent"
      }`}
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center group"
          aria-label="Athenura Home"
        >
          <img
            src="/Athenura%20logo.png"
            alt="Athenura"
            className={`w-auto object-contain transition-all duration-500 group-hover:scale-105 ${
              scrolled ? "h-8 md:h-10" : "h-10 md:h-12"
            }`}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                style={{ animationDelay: `${i * 60}ms` }}
                className={`relative font-body text-sm font-bold px-4 py-2 rounded-xl transition-all duration-300 group animate-fade-in-down ${
                  active
                    ? "text-primary"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {/* Hover background pill */}
                <span
                  className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                    active
                      ? "bg-primary/10"
                      : "bg-transparent group-hover:bg-muted/70"
                  }`}
                />

                {/* Label */}
                <span className="relative z-10">{link.label}</span>

                {/* Active underline dot */}
                {active && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-scale-in" />
                )}

                {/* Hover underline slide */}
                <span
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-primary/50 transition-all duration-300 ${
                    active ? "w-0" : "w-0 group-hover:w-4"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl hover:bg-muted transition-all duration-200 hover:scale-105 active:scale-95 group"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold px-1 animate-bounce-in shadow-md shadow-primary/30">
                {totalItems}
              </span>
            )}
          </button>

          {/* User */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl hover:bg-muted transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none group">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-7 h-7 rounded-full ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all"
                />
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-all group-data-[state=open]:rotate-180 duration-200" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 animate-fade-in-down">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-2.5">
                    <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full" />
                    <div className="flex flex-col min-w-0">
                      <span className="font-body font-semibold text-sm truncate">{user?.name}</span>
                      <span className="font-body text-xs text-muted-foreground truncate">{user?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={user?.role === "admin" ? "/admin" : "/profile"} className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    {user?.role === "admin" ? "Admin Panel" : "Dashboard"}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-body text-sm font-medium border border-border hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2.5 rounded-xl hover:bg-muted transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="relative w-5 h-5 flex items-center justify-center">
              <X
                className={`absolute w-5 h-5 transition-all duration-300 ${
                  mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
                }`}
              />
              <Menu
                className={`absolute w-5 h-5 transition-all duration-300 ${
                  mobileOpen ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/98 backdrop-blur-xl border-t border-border/50 px-4 py-3 space-y-1">
          {navLinks.map((link, i) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                style={{
                  transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms",
                  transform: mobileOpen ? "translateX(0)" : "translateX(-12px)",
                  opacity: mobileOpen ? 1 : 0,
                  transition: `transform 0.3s ease, opacity 0.3s ease, color 0.2s`,
                }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {active && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                {link.label}
              </Link>
            );
          })}

          <div className="border-t border-border/50 pt-2 mt-2 space-y-1">
            {isLoggedIn ? (
              <>
                <Link
                  to={user?.role === "admin" ? "/admin" : "/profile"}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <User className="w-4 h-4" />
                  {user?.role === "admin" ? "Admin Panel" : "Dashboard"}
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <User className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
