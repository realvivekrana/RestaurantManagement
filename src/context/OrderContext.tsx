import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    qty: number;
    image: string;
  }>;
  totalPrice: number;
  contact: {
    name: string;
    phone: string;
    address: string;
  };
  payment: string;
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
  cancellationReason?: string;
  createdAt: string;
}

export interface Reservation {
  id: string;
  userId: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  notes: string;
<<<<<<< HEAD
  status: "confirmed" | "cancelled" | "completed";
  assignedTable?: number;
=======
  status: "pending" | "confirmed" | "cancelled" | "completed";
>>>>>>> 5b310c277d1ca2af0107685d2cbb4080e9235d16
  createdAt: string;
}

interface OrderContextType {
  orders: Order[];
  reservations: Reservation[];
  addOrder: (order: Omit<Order, "id" | "createdAt">) => Order;
  addReservation: (reservation: Omit<Reservation, "id" | "createdAt">) => Reservation;
  updateOrderStatus: (orderId: string, status: Order["status"], cancellationReason?: string) => void;
  updateReservationStatus: (reservationId: string, status: Reservation["status"]) => void;
  assignTableToReservation: (reservationId: string, tableNumber: number) => void;
  getUserOrders: (userId: string) => Order[];
  getUserReservations: (userId: string) => Reservation[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    const savedReservations = localStorage.getItem("reservations");
    
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    if (savedReservations) {
      setReservations(JSON.parse(savedReservations));
    }
  }, []);

  // Save to localStorage whenever orders change
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders]);

  // Save to localStorage whenever reservations change
  useEffect(() => {
    if (reservations.length > 0) {
      localStorage.setItem("reservations", JSON.stringify(reservations));
    }
  }, [reservations]);

  const addOrder = useCallback((orderData: Omit<Order, "id" | "createdAt">) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  }, []);

  const addReservation = useCallback((reservationData: Omit<Reservation, "id" | "createdAt">) => {
    const newReservation: Reservation = {
      ...reservationData,
      id: `RES${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setReservations((prev) => [newReservation, ...prev]);
    return newReservation;
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: Order["status"], cancellationReason?: string) => {
    setOrders((prev) =>
      prev.map((order) => 
        order.id === orderId 
          ? { ...order, status, ...(cancellationReason && { cancellationReason }) } 
          : order
      )
    );
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event('ordersUpdated'));
  }, []);

  const updateReservationStatus = useCallback((reservationId: string, status: Reservation["status"]) => {
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === reservationId ? { ...reservation, status } : reservation
      )
    );
    window.dispatchEvent(new Event('reservationsUpdated'));
  }, []);

  const assignTableToReservation = useCallback((reservationId: string, tableNumber: number) => {
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === reservationId ? { ...reservation, assignedTable: tableNumber } : reservation
      )
    );
    window.dispatchEvent(new Event('reservationsUpdated'));
  }, []);

  const getUserOrders = useCallback(
    (userId: string) => {
      return orders.filter((order) => order.userId === userId);
    },
    [orders]
  );

  const getUserReservations = useCallback(
    (userId: string) => {
      return reservations.filter((reservation) => reservation.userId === userId);
    },
    [reservations]
  );

  return (
    <OrderContext.Provider
      value={{
        orders,
        reservations,
        addOrder,
        addReservation,
        updateOrderStatus,
        updateReservationStatus,
        assignTableToReservation,
        getUserOrders,
        getUserReservations,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within OrderProvider");
  }
  return context;
};
