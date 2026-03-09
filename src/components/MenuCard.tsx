import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import type { MenuItem } from "@/data/menuData";

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { addItem } = useCart();

  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border hover-lift transition-all duration-300">
      <Link to={`/dish/${item.id}`} className="block relative overflow-hidden aspect-[4/3]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs font-body font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
          {item.category}
        </span>
      </Link>
      <div className="p-4">
        <Link to={`/dish/${item.id}`}>
          <h3 className="font-display text-lg font-semibold mb-1 hover:text-primary transition-colors duration-300">{item.name}</h3>
        </Link>
        <p className="font-body text-xs text-muted-foreground line-clamp-2 mb-3">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-body text-lg font-bold text-primary gradient-text">₹{item.price}</span>
          <button
            onClick={() => addItem({ id: item.id, name: item.name, price: item.price, image: item.image })}
            className="flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-body font-semibold px-3 py-2 rounded-lg hover:bg-primary/90 transition-all hover-scale active:scale-95"
            aria-label={`Add ${item.name} to cart`}
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
