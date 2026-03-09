import { useState, useEffect } from "react";
import { useOrders } from "@/context/OrderContext";
import type { Reservation } from "@/context/OrderContext";

const statusColor: Record<string, string> = {
  pending: "bg-yellow-200 text-yellow-800",
  confirmed: "bg-primary/20 text-primary",
  cancelled: "bg-destructive/20 text-destructive",
  completed: "bg-green-200 text-green-800",
};

const AdminReservations = () => {
  const { reservations: allReservations, updateReservationStatus } = useOrders();
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    setReservations(allReservations);
  }, [allReservations]);

  const updateStatus = (id: string, status: Reservation["status"]) => {
    updateReservationStatus(id, status);
    setReservations(allReservations);
  };

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-6">Reservations</h1>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {["ID", "Guest", "Phone", "Guests", "Date", "Time", "Notes", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left font-body text-xs font-semibold text-muted-foreground p-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="font-body text-sm p-3 font-medium">{r.id}</td>
                  <td className="font-body text-sm p-3">{r.name}</td>
                  <td className="font-body text-xs p-3 text-muted-foreground">{r.phone}</td>
                  <td className="font-body text-sm p-3 text-center">{r.guests}</td>
                  <td className="font-body text-sm p-3">{r.date}</td>
                  <td className="font-body text-sm p-3">{r.time}</td>
                  <td className="font-body text-xs p-3 text-muted-foreground max-w-[150px] truncate">{r.notes || "—"}</td>
                  <td className="p-3"><span className={`font-body text-xs px-2.5 py-1 rounded-full capitalize ${statusColor[r.status]}`}>{r.status}</span></td>
                  <td className="p-3">
                    <select
                      value={r.status}
                      onChange={(e) => updateStatus(r.id, e.target.value as Reservation["status"])}
                      className="font-body text-xs border border-border rounded-lg px-2 py-1 bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReservations;
