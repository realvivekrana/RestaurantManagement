import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { menuItems, categories } from "@/data/menuData";
import MenuCard from "@/components/MenuCard";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCat = activeCategory === "All" || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch && item.isAvailable;
    });
  }, [activeCategory, search]);

  return (
    <main className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container">
        <div className="mb-10">
          <p className="font-body text-primary font-semibold text-sm tracking-widest uppercase mb-2 animate-fade-in-down">Our Menu</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">Explore Our Flavors</h1>

          {/* Search */}
          <div className="relative max-w-md mb-6 animate-fade-in-up stagger-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all hover-glow"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 animate-fade-in-up stagger-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-body text-sm font-medium px-4 py-2 rounded-full border transition-all hover-scale ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-lg"
                    : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <p className="font-body text-muted-foreground text-lg">No dishes found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item, i) => (
              <div key={item.id} className={`animate-fade-in-up stagger-${Math.min(i % 4 + 1, 4)}`}>
                <MenuCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MenuPage;
