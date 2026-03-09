import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const update = (f: string, v: string) => setForm((p) => ({ ...p, [f]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Please fill all fields"); return; }
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container max-w-5xl">
        <div className="text-center mb-12">
          <p className="font-body text-primary font-semibold text-sm tracking-widest uppercase mb-2">Get in Touch</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="font-body text-muted-foreground max-w-md mx-auto">We'd love to hear from you. Drop us a message or visit us.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
            <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your Name" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Email Address" type="email" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <textarea value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Your Message" rows={5} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold gap-2">
              <Send className="w-4 h-4" /> Send Message
            </Button>
          </form>

          <div className="space-y-6">
            {[
              { icon: MapPin, label: "Visit Us", value: "123 Flavor Street, Bandra West, Mumbai 400050" },
              { icon: Phone, label: "Call Us", value: "+91 98765 43210" },
              { icon: Mail, label: "Email", value: "hello@spicegarden.in" },
              { icon: Clock, label: "Hours", value: "Mon–Sun: 11:00 AM – 11:00 PM" },
            ].map((info) => (
              <div key={info.label} className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
                <div className="p-2.5 rounded-lg bg-primary/10"><info.icon className="w-5 h-5 text-primary" /></div>
                <div>
                  <h3 className="font-body text-sm font-semibold mb-1">{info.label}</h3>
                  <p className="font-body text-sm text-muted-foreground">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
