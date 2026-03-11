import { useState, useEffect } from "react";
import { CalendarDays, Clock, Users, LogIn, CheckCircle2, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { useNavigate } from "react-router-dom";

const ReservationPage = () => {
  const { user, isLoggedIn } = useAuth();
  const { addReservation } = useOrders();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", guests: "2", date: "", time: "", notes: "" });
  const [successPopup, setSuccessPopup] = useState<{ show: boolean; bookingId: string }>({ show: false, bookingId: "" });

  // Prefill form with user data if logged in
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || prev.name,
        phone: user.phone || prev.phone,
      }));
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Save reservation to localStorage
    const newReservation = addReservation({
      userId: user!.id,
      name: form.name,
      phone: form.phone,
      guests: parseInt(form.guests),
      date: form.date,
      time: form.time,
      notes: form.notes,
      status: "pending",
    });
    
<<<<<<< HEAD
    setSuccessPopup({ show: true, bookingId: newReservation.id });
=======
    toast.success(`Reservation submitted! Waiting for admin approval. Booking ID: ${newReservation.id}`);
>>>>>>> 5b310c277d1ca2af0107685d2cbb4080e9235d16
    setTimeout(() => {
      setSuccessPopup({ show: false, bookingId: "" });
      navigate("/profile/reservations");
    }, 3000);
  };

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  // Require login before making reservation
  if (!isLoggedIn) {
    return (
      <main className="pt-24 pb-20 min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogIn className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-4">Login Required</h1>
          <p className="font-body text-muted-foreground mb-6">
            Please login to make a table reservation. This helps us manage your bookings and send you confirmations.
          </p>
          <div className="space-y-3">
            <Button 
              onClick={() => navigate("/login", { state: { from: "/reservation" } })} 
              className="w-full bg-primary text-primary-foreground font-body"
            >
              Login to Continue
            </Button>
            <Button 
              onClick={() => navigate("/")} 
              variant="outline"
              className="w-full font-body"
            >
              Back to Home
            </Button>
          </div>
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="font-body text-sm text-muted-foreground">
              <strong>Why login?</strong> Track your reservations, receive confirmations, and manage bookings easily from your profile.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-secondary/80">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-float-delayed pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-primary/5 rounded-full blur-2xl animate-pulse-soft pointer-events-none" />
        <div className="absolute top-24 right-[15%] w-14 h-14 border-2 border-primary/20 rounded-full animate-float-slow pointer-events-none" />
        <div className="absolute bottom-28 left-[20%] w-8 h-8 border border-primary/15 rounded-full animate-pulse-soft pointer-events-none" />
        <div className="absolute inset-0 hero-pattern pointer-events-none" />

        <div className="container relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-5 py-2 mb-6 animate-fade-in-down">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span className="font-body text-primary font-semibold text-xs tracking-widest uppercase">Reserve a Table</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-secondary-foreground mb-6 animate-fade-in-up">
            Book Your <span className="gradient-text">Experience</span>
          </h1>
          <p className="font-body text-secondary-foreground/70 text-lg md:text-xl max-w-xl mx-auto animate-fade-in-up stagger-1">
            Secure your spot for a memorable dining experience. We look forward to hosting you.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      <div className="container max-w-2xl py-12">
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-10 space-y-5 hover-lift animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="font-body text-sm font-medium mb-1.5 block">Name *</label>
              <input value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Your name" />
            </div>
            <div>
              <label className="font-body text-sm font-medium mb-1.5 block">Phone *</label>
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="+91 98765 43210" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="font-body text-sm font-medium mb-1.5 flex items-center gap-1.5"><Users className="w-4 h-4 text-primary" /> Guests</label>
              <select value={form.guests} onChange={(e) => update("guests", e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
              </select>
            </div>
            <div>
              <label className="font-body text-sm font-medium mb-1.5 flex items-center gap-1.5"><CalendarDays className="w-4 h-4 text-primary" /> Date *</label>
              <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} min={new Date().toISOString().split("T")[0]} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="font-body text-sm font-medium mb-1.5 flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> Time *</label>
              <input type="time" value={form.time} onChange={(e) => update("time", e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>

          <div>
            <label className="font-body text-sm font-medium mb-1.5 block">Special Requests</label>
            <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" placeholder="Any dietary needs or special requests?" />
          </div>

          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold py-3 text-base">
            Confirm Reservation
          </Button>
        </form>
      </div>

      {/* Success Popup Overlay */}
      {successPopup.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="relative bg-card border border-border rounded-3xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => { setSuccessPopup({ show: false, bookingId: "" }); navigate("/profile/reservations"); }}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Animated check circle */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Sparkles */}
            <div className="flex justify-center gap-1 mb-3">
              <Sparkles className="w-5 h-5 text-primary animate-bounce" style={{ animationDelay: "0ms" }} />
              <Sparkles className="w-4 h-4 text-yellow-500 animate-bounce" style={{ animationDelay: "150ms" }} />
              <Sparkles className="w-5 h-5 text-primary animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>

            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Table Reserved Successfully!
            </h2>
            <p className="font-body text-muted-foreground mb-4">
              Your reservation has been confirmed. We look forward to hosting you!
            </p>

            <div className="bg-muted/50 rounded-xl px-4 py-3 mb-5">
              <p className="font-body text-xs text-muted-foreground">Booking ID</p>
              <p className="font-body font-bold text-primary text-lg">{successPopup.bookingId}</p>
            </div>

            {/* Progress bar auto-dismiss */}
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-green-500 rounded-full" style={{ animation: "shrink 3s linear forwards" }} />
            </div>
            <p className="font-body text-xs text-muted-foreground mt-2">Redirecting to your reservations...</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </main>
  );
};

export default ReservationPage;
