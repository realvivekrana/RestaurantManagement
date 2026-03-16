import { useMemo } from "react";
import { Flame } from "lucide-react";
import { menuItems, featuredMenuItems } from "@/data/menuData";
import { useOrders } from "@/context/OrderContext";
import MenuCard from "@/components/MenuCard";

const TrendingPage = () => {
  const { orders } = useOrders();

  // Tally total qty ordered per menu item across all non-cancelled orders
  const trendingItems = useMemo(() => {
    const tally: Record<string, number> = {};

    orders
      .filter((o) => o.status !== "cancelled")
      .forEach((order) => {
        order.items.forEach((item) => {
          tally[item.id] = (tally[item.id] || 0) + item.qty;
        });
      });

    if (Object.keys(tally).length === 0) {
      // No real orders yet — fall back to curated featured list
      return featuredMenuItems;
    }

    // Sort by total qty descending, take top 8
    return Object.entries(tally)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([id]) => menuItems.find((m) => m.id === id))
      .filter(Boolean) as typeof menuItems;
  }, [orders]);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-secondary/80">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-float-delayed pointer-events-none" />
        <div className="absolute inset-0 hero-pattern pointer-events-none" />

        <div className="container relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-5 py-2 mb-6 animate-fade-in-down">
            <Flame className="w-4 h-4 text-primary" />
            <span className="font-body text-primary font-semibold text-xs tracking-widest uppercase">Most Ordered</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-secondary-foreground mb-6 animate-fade-in-up">
            Trending <span className="gradient-text">Dishes</span>
          </h1>
          <p className="font-body text-secondary-foreground/70 text-lg md:text-xl max-w-xl mx-auto animate-fade-in-up stagger-1">
            Our most loved and frequently ordered dishes — tried, tested, and adored by our guests.
          </p>
          {orders.filter((o) => o.status !== "cancelled").length > 0 && (
            <p className="font-body text-secondary-foreground/50 text-sm mt-3 animate-fade-in-up stagger-2">
              Based on {orders.filter((o) => o.status !== "cancelled").length} real orders
            </p>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Dishes grid */}
      <section className="container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingItems.map((item, i) => (
            <div key={item.id} className={`animate-fade-in-up stagger-${Math.min(i % 4 + 1, 4)}`}>
              <MenuCard item={item} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default TrendingPage;
