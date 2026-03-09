import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
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

  // Hide header on admin pages
  if (location.pathname.startsWith("/admin")) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="font-display text-2xl font-bold text-foreground tracking-tight">
          Spice Garden<span className="text-primary">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                {totalItems}
              </span>
            )}
          </button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 rounded-full hover:bg-muted transition-colors focus:outline-none">
                <img src={user?.avatar} alt={user?.name} className="w-7 h-7 rounded-full" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-body font-semibold">{user?.name}</span>
                    <span className="font-body text-xs text-muted-foreground">{user?.email}</span>
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
            <Link to="/login" className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Login">
              <User className="w-5 h-5 text-foreground" />
            </Link>
          )}

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border pb-4">
          <nav className="container flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`font-body text-sm font-medium py-2 transition-colors hover:text-primary ${
                  location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <Link
                  to={user?.role === "admin" ? "/admin" : "/profile"}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-sm font-medium py-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {user?.role === "admin" ? "Admin Panel" : "Dashboard"}
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="font-body text-sm font-medium py-2 text-destructive hover:text-destructive/80 transition-colors text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="font-body text-sm font-medium py-2 text-muted-foreground hover:text-primary transition-colors"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
