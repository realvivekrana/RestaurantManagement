import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";
import dish5 from "@/assets/dish-5.jpg";
import dish6 from "@/assets/dish-6.jpg";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  isAvailable: boolean;
  ingredients?: string[];
}

export const categories = ["All", "Starters", "Main Course", "Pizza & Pasta", "Desserts", "Salads", "Biryani"];

export const menuItems: MenuItem[] = [
  { id: "1", name: "Butter Chicken", description: "Creamy tomato-based curry with tender chicken pieces, garnished with cream and cilantro.", category: "Main Course", price: 320, image: dish1, isAvailable: true, ingredients: ["Chicken", "Tomato", "Cream", "Butter", "Spices", "Cilantro"] },
  { id: "2", name: "Margherita Pizza", description: "Classic thin-crust pizza with fresh mozzarella, basil, and San Marzano tomato sauce.", category: "Pizza & Pasta", price: 280, image: dish2, isAvailable: true, ingredients: ["Pizza dough", "Mozzarella", "Tomato sauce", "Fresh basil", "Olive oil"] },
  { id: "3", name: "Grilled Salmon", description: "Fresh Atlantic salmon fillet grilled with herbs and served with lemon butter sauce.", category: "Main Course", price: 450, image: dish3, isAvailable: true, ingredients: ["Salmon fillet", "Lemon", "Herbs", "Butter", "Garlic"] },
  { id: "4", name: "Chocolate Lava Cake", description: "Rich dark chocolate cake with a molten center, dusted with powdered sugar.", category: "Desserts", price: 180, image: dish4, isAvailable: true, ingredients: ["Dark chocolate", "Butter", "Eggs", "Sugar", "Flour"] },
  { id: "5", name: "Caesar Salad", description: "Crisp romaine lettuce with parmesan shavings, croutons, and classic Caesar dressing.", category: "Salads", price: 200, image: dish5, isAvailable: true, ingredients: ["Romaine lettuce", "Parmesan", "Croutons", "Caesar dressing", "Anchovies"] },
  { id: "6", name: "Hyderabadi Biryani", description: "Fragrant basmati rice layered with aromatic spices, saffron, and fried onions.", category: "Biryani", price: 350, image: dish6, isAvailable: true, ingredients: ["Basmati rice", "Saffron", "Spices", "Onions", "Yogurt", "Mint"] },
  { id: "7", name: "Paneer Tikka", description: "Marinated cottage cheese cubes grilled in tandoor with bell peppers and onions.", category: "Starters", price: 220, image: dish1, isAvailable: true, ingredients: ["Paneer", "Bell peppers", "Onions", "Yogurt", "Tandoori masala"] },
  { id: "8", name: "Pasta Alfredo", description: "Creamy fettuccine alfredo with parmesan and garlic butter sauce.", category: "Pizza & Pasta", price: 260, image: dish2, isAvailable: true, ingredients: ["Fettuccine", "Parmesan", "Cream", "Garlic", "Butter"] },
];

// Mock orders
export interface Order {
  id: string;
  userId: string;
  customerName: string;
  phone: string;
  address: string;
  items: { menuId: string; name: string; qty: number; price: number }[];
  totalPrice: number;
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
  createdAt: string;
  payment: string;
}

export const mockOrders: Order[] = [
  { id: "ORD-001", userId: "u1", customerName: "Rahul Sharma", phone: "+91 98765 43210", address: "12, MG Road, Mumbai", items: [{ menuId: "1", name: "Butter Chicken", qty: 2, price: 320 }, { menuId: "6", name: "Hyderabadi Biryani", qty: 1, price: 350 }], totalPrice: 990, status: "preparing", createdAt: "2026-03-05T18:30:00", payment: "COD" },
  { id: "ORD-002", userId: "u2", customerName: "Priya Patel", phone: "+91 87654 32109", address: "45, Park Street, Delhi", items: [{ menuId: "2", name: "Margherita Pizza", qty: 1, price: 280 }, { menuId: "5", name: "Caesar Salad", qty: 1, price: 200 }], totalPrice: 480, status: "pending", createdAt: "2026-03-06T12:15:00", payment: "Razorpay" },
  { id: "ORD-003", userId: "u3", customerName: "Ankit Verma", phone: "+91 76543 21098", address: "78, Lake Road, Bangalore", items: [{ menuId: "3", name: "Grilled Salmon", qty: 1, price: 450 }, { menuId: "4", name: "Chocolate Lava Cake", qty: 2, price: 180 }], totalPrice: 810, status: "delivered", createdAt: "2026-03-04T20:00:00", payment: "COD" },
  { id: "ORD-004", userId: "u1", customerName: "Rahul Sharma", phone: "+91 98765 43210", address: "12, MG Road, Mumbai", items: [{ menuId: "7", name: "Paneer Tikka", qty: 3, price: 220 }], totalPrice: 660, status: "ready", createdAt: "2026-03-06T14:00:00", payment: "COD" },
  { id: "ORD-005", userId: "u4", customerName: "Sneha Gupta", phone: "+91 65432 10987", address: "23, Jubilee Hills, Hyderabad", items: [{ menuId: "8", name: "Pasta Alfredo", qty: 2, price: 260 }], totalPrice: 520, status: "cancelled", createdAt: "2026-03-03T19:45:00", payment: "Razorpay" },
];

// Mock reservations
export interface Reservation {
  id: string;
  userId: string | null;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  notes: string;
  status: "confirmed" | "cancelled" | "completed";
}

export const mockReservations: Reservation[] = [
  { id: "RES-001", userId: "u1", name: "Rahul Sharma", phone: "+91 98765 43210", guests: 4, date: "2026-03-07", time: "19:30", notes: "Anniversary dinner, need a quiet corner", status: "confirmed" },
  { id: "RES-002", userId: null, name: "Meera Iyer", phone: "+91 87654 32100", guests: 2, date: "2026-03-08", time: "20:00", notes: "", status: "confirmed" },
  { id: "RES-003", userId: "u3", name: "Ankit Verma", phone: "+91 76543 21098", guests: 8, date: "2026-03-06", time: "13:00", notes: "Birthday party, need cake arrangement", status: "completed" },
  { id: "RES-004", userId: null, name: "Kavita Singh", phone: "+91 65432 10987", guests: 3, date: "2026-03-09", time: "18:30", notes: "Vegetarian only", status: "confirmed" },
  { id: "RES-005", userId: "u2", name: "Priya Patel", phone: "+91 87654 32109", guests: 6, date: "2026-03-05", time: "21:00", notes: "", status: "cancelled" },
];

// Mock users for admin
export interface AppUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "admin";
  createdAt: string;
  lastLogin: string;
  totalOrders: number;
}

export const mockUsers: AppUser[] = [
  { id: "u1", name: "Rahul Sharma", email: "rahul.sharma@gmail.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul", role: "user", createdAt: "2025-06-15", lastLogin: "2026-03-06", totalOrders: 12 },
  { id: "u2", name: "Priya Patel", email: "priya.patel@gmail.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya", role: "user", createdAt: "2025-09-20", lastLogin: "2026-03-05", totalOrders: 8 },
  { id: "u3", name: "Ankit Verma", email: "ankit.verma@gmail.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ankit", role: "user", createdAt: "2025-11-01", lastLogin: "2026-03-04", totalOrders: 5 },
  { id: "u4", name: "Sneha Gupta", email: "sneha.gupta@gmail.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha", role: "user", createdAt: "2026-01-10", lastLogin: "2026-03-03", totalOrders: 3 },
  { id: "a1", name: "Admin Chef", email: "admin@spicegarden.in", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin", role: "admin", createdAt: "2025-01-01", lastLogin: "2026-03-06", totalOrders: 0 },
];

// Gallery images
export const galleryImages = [dish1, dish2, dish3, dish4, dish5, dish6, dish1, dish2, dish3];
