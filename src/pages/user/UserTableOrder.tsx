import { useState, useMemo, useEffect } from "react";
import { menuItems } from "@/data/menuData";
import { useTableOrders } from "@/context/TableOrderContext";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { Plus, Minus, Trash2, UtensilsCrossed, ShoppingBag, Search, Hash, ChevronDown, Leaf, Drumstick } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type SortOption = "default" | "price-low" | "price-high";
type DietFilter = "all" | "veg" | "nonveg";

const filterCategories = ["Starters", "Main Course", "Pizza & Pasta", "Desserts", "Salads", "Biryani"];

const FilterSection = ({ title, isOpen, onToggle, children }: { title: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode }) => (
  <div className="border-b border-border last:border-b-0">
    <button onClick={onToggle} className="flex items-center justify-between w-full py-2.5 px-1 font-body text-xs font-bold text-foreground uppercase tracking-wide hover:text-primary transition-colors">
      {title}
      <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96 pb-2" : "max-h-0"}`}>{children}</div>
  </div>
);

const UserTableOrder = () => {
  const { addTableOrder, tableOrders } = useTableOrders();
  const { user } = useAuth();
  const { getUserReservations } = useOrders();
  const [tableNumber, setTableNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [diet, setDiet] = useState<DietFilter>("all");
  const [sort, setSort] = useState<SortOption>("default");
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Auto-load table number from confirmed reservation
  useEffect(() => {
    if (user) {
      const reservations = getUserReservations(user.id);
      const confirmedWithTable = reservations.find(
        (r) => r.status === "confirmed" && r.assignedTable
      );
      if (confirmedWithTable?.assignedTable) {
        setTableNumber(String(confirmedWithTable.assignedTable));
      }
    }
  }, [user, getUserReservations]);

  const toggleSection = (name: string) => setOpenSection((prev) => (prev === name ? null : name));

  const toggleCategory = (cat: string) =>
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const filteredMenu = useMemo(() => {
    let result = menuItems.filter((i) => {
      if (!i.isAvailable) return false;
      const matchCat = activeCategories.length === 0 || activeCategories.includes(i.category);
      const matchSearch = !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase());
      const matchDiet = diet === "all" || (diet === "veg" ? i.isVeg : !i.isVeg);
      return matchCat && matchSearch && matchDiet;
    });
    if (sort === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    else if (sort === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [search, activeCategories, diet, sort]);

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => {
          const item = menuItems.find((i) => i.id === id);
          return item ? { ...item, qty } : null;
        })
        .filter(Boolean) as (typeof menuItems[0] & { qty: number })[],
    [cart]
  );

  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } else {
      setCart((prev) => ({ ...prev, [id]: qty }));
    }
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handlePlaceOrder = () => {
    const tNum = parseInt(tableNumber, 10);
    if (!tNum || tNum < 1 || tNum > 50) {
      toast.error("Please enter a valid table number (1-50)");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Please add items to your order");
      return;
    }

    addTableOrder({
      tableNumber: tNum,
      customerName: user?.name || "Guest",
      items: cartItems.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty,
        image: i.image,
      })),
      totalPrice,
      notes: notes.trim(),
      status: "active",
    });

    toast.success(`Table order placed for Table #${tNum}!`);
    setCart({});
    setNotes("");
  };

  const myOrders = tableOrders.filter(
    (o) => o.status !== "completed" && o.status !== "cancelled"
  );

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-6">Table Order</h1>
      <p className="font-body text-sm text-muted-foreground mb-8">
        Order directly from your table — no need to wait for a waiter. Select your items, enter your table number, and place your order.
      </p>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Filter Sidebar + Menu Browser */}
        <div className="lg:col-span-2">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="flex gap-4">
            {/* Filter Sidebar */}
            <div className="hidden md:block w-48 shrink-0">
              <div className="sticky top-24 bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2.5 border-b border-border">
                  <h3 className="font-body text-xs font-bold text-foreground">Filters</h3>
                  {(activeCategories.length > 0 || diet !== "all" || sort !== "default") && (
                    <button onClick={() => { setActiveCategories([]); setDiet("all"); setSort("default"); }} className="font-body text-[10px] font-semibold text-primary hover:underline">CLEAR</button>
                  )}
                </div>
                <div className="px-3">
                  <FilterSection title="CATEGORIES" isOpen={openSection === "categories"} onToggle={() => toggleSection("categories")}>
                    <div className="flex flex-col">
                      {filterCategories.map((cat) => {
                        const isChecked = activeCategories.includes(cat);
                        return (
                          <label key={cat} className="flex items-center gap-2 px-1 py-1 cursor-pointer group" onClick={() => toggleCategory(cat)}>
                            <span className={`w-3.5 h-3.5 rounded border-2 flex items-center justify-center transition-all ${isChecked ? "bg-primary border-primary" : "border-muted-foreground/40 group-hover:border-primary"}`}>
                              {isChecked && <svg className="w-2 h-2 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                            </span>
                            <span className={`font-body text-xs ${isChecked ? "font-semibold text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>{cat}</span>
                          </label>
                        );
                      })}
                    </div>
                  </FilterSection>
                  <FilterSection title="DIET" isOpen={openSection === "diet"} onToggle={() => toggleSection("diet")}>
                    <div className="flex flex-col gap-0.5">
                      {([
                        { value: "veg" as DietFilter, label: "Pure Veg", icon: Leaf, color: "text-green-600" },
                        { value: "nonveg" as DietFilter, label: "Non-Veg", icon: Drumstick, color: "text-red-600" },
                      ]).map((opt) => (
                        <label key={opt.value} className="flex items-center gap-2 px-1 py-1 cursor-pointer group" onClick={() => setDiet(diet === opt.value ? "all" : opt.value)}>
                          <span className={`w-3.5 h-3.5 rounded border-2 flex items-center justify-center transition-all ${diet === opt.value ? (opt.value === "veg" ? "bg-green-600 border-green-600" : "bg-red-600 border-red-600") : "border-muted-foreground/40 group-hover:border-primary"}`}>
                            {diet === opt.value && <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                          </span>
                          <span className="flex items-center gap-1">
                            <opt.icon className={`w-3 h-3 ${opt.color}`} />
                            <span className={`font-body text-xs ${diet === opt.value ? "font-semibold text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>{opt.label}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                  <FilterSection title="PRICE" isOpen={openSection === "price"} onToggle={() => toggleSection("price")}>
                    <div className="flex flex-col gap-0.5">
                      {([
                        { value: "default" as SortOption, label: "Relevance" },
                        { value: "price-low" as SortOption, label: "Low to High" },
                        { value: "price-high" as SortOption, label: "High to Low" },
                      ]).map((opt) => (
                        <label key={opt.value} className="flex items-center gap-2 px-1 py-1 cursor-pointer group" onClick={() => setSort(opt.value)}>
                          <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all ${sort === opt.value ? "border-primary" : "border-muted-foreground/40 group-hover:border-primary"}`}>
                            {sort === opt.value && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                          </span>
                          <span className={`font-body text-xs ${sort === opt.value ? "font-semibold text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                </div>
              </div>
            </div>

            {/* Menu Grid */}
            <div className="flex-1 min-w-0">
              {/* Active filter chips */}
              {(activeCategories.length > 0 || diet !== "all" || sort !== "default") && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="font-body text-xs text-muted-foreground">{filteredMenu.length} results</span>
                  {activeCategories.map((cat) => (
                    <span key={cat} className="inline-flex items-center gap-1 bg-primary/10 text-primary font-body text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {cat} <button onClick={() => toggleCategory(cat)} className="hover:bg-primary/20 rounded-full"><Minus className="w-2.5 h-2.5" /></button>
                    </span>
                  ))}
                  {diet !== "all" && (
                    <span className={`inline-flex items-center gap-1 font-body text-[10px] font-semibold px-2 py-0.5 rounded-full ${diet === "veg" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {diet === "veg" ? "Veg" : "Non-Veg"} <button onClick={() => setDiet("all")} className="hover:opacity-70 rounded-full"><Minus className="w-2.5 h-2.5" /></button>
                    </span>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredMenu.map((item) => {
              const inCart = cart[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="font-body text-sm font-semibold truncate">{item.name}</h4>
                        <p className="font-body text-xs text-muted-foreground truncate">{item.category}</p>
                      </div>
                      <span
                        className={`w-3 h-3 rounded-full shrink-0 mt-1 ${
                          item.isVeg ? "bg-green-500" : "bg-red-500"
                        }`}
                        title={item.isVeg ? "Veg" : "Non-Veg"}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-body text-sm font-bold text-primary">
                        ₹{item.price}
                      </span>
                      {inCart > 0 ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQty(item.id, inCart - 1)}
                            className="p-1 rounded bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-body text-sm font-semibold w-5 text-center">
                            {inCart}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, inCart + 1)}
                            className="p-1 rounded bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item.id)}
                          className="flex items-center gap-1 bg-primary/10 text-primary font-body text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Plus className="w-3 h-3" /> Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
            </div>
          </div>
        </div>

        {/* Right: Table Details & Cart Summary */}
        <div>
          <div className="sticky top-24 space-y-4">
            {/* Table Details */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-body text-sm font-bold mb-4 flex items-center gap-2">
                <Hash className="w-4 h-4 text-primary" /> Table Details
              </h3>
              <div className="space-y-3">
                {/* Show logged-in user name */}
                <div className="flex items-center gap-2 p-2.5 bg-muted/50 rounded-lg">
                  <span className="font-body text-xs text-muted-foreground">Name:</span>
                  <span className="font-body text-sm font-semibold">{user?.name || "Guest"}</span>
                </div>
                <div>
                  <label className="font-body text-xs text-muted-foreground mb-1 block">
                    Table Number *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    placeholder="e.g. 5"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="font-body text-xs text-muted-foreground mb-1 block">
                    Special Notes
                  </label>
                  <textarea
                    placeholder="Extra spicy, no onion, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-body text-sm font-bold mb-4 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-primary" /> Your Order
                {cartItems.length > 0 && (
                  <span className="ml-auto bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
                    {cartItems.reduce((s, i) => s + i.qty, 0)} items
                  </span>
                )}
              </h3>

              {cartItems.length === 0 ? (
                <p className="font-body text-sm text-muted-foreground text-center py-4">
                  No items added yet
                </p>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-xs font-semibold truncate">{item.name}</p>
                        <p className="font-body text-xs text-muted-foreground">
                          ₹{item.price} × {item.qty}
                        </p>
                      </div>
                      <span className="font-body text-xs font-bold shrink-0">
                        ₹{item.price * item.qty}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-body text-sm text-muted-foreground">Total</span>
                    <span className="font-body text-lg font-bold text-primary">
                      ₹{totalPrice}
                    </span>
                  </div>
                </div>
              )}

              <Button
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0}
                className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold gap-2"
              >
                <UtensilsCrossed className="w-4 h-4" /> Place Table Order
              </Button>
            </div>

            {/* Active Orders */}
            {myOrders.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-body text-sm font-bold mb-3">Active Table Orders</h3>
                <div className="space-y-2">
                  {myOrders.slice(0, 5).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between gap-2 p-2.5 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <p className="font-body text-xs font-semibold">
                          Table #{order.tableNumber}
                        </p>
                        <p className="font-body text-[10px] text-muted-foreground">
                          {order.items.length} items · ₹{order.totalPrice}
                        </p>
                      </div>
                      <span
                        className={`font-body text-[10px] font-semibold px-2 py-1 rounded-full capitalize ${
                          order.status === "active"
                            ? "bg-primary/20 text-primary"
                            : order.status === "preparing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTableOrder;
