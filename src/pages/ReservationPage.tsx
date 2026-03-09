import { useState, useEffect } from "react";
import { CalendarDays, Clock, Users, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const ReservationPage = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", guests: "2", date: "", time: "", notes: "" });

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
    
    // TODO: Send reservation to backend
    // await fetch('/api/reservations', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ...form, userId: user.id })
    // });
    
    toast.success("Reservation confirmed! We'll see you soon.");
    setTimeout(() => {
      navigate("/profile/reservations");
    }, 1500);
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
    <main className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container max-w-2xl">
        <div className="mb-10 text-center animate-fade-in-up">
          <p className="font-body text-primary font-semibold text-sm tracking-widest uppercase mb-2">Reserve</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Book a Table</h1>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            Secure your spot for a memorable dining experience. We look forward to hosting you.
          </p>
        </div>

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
    </main>
  );
};

export default ReservationPage;
