import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { X, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Reservation } from "@/context/OrderContext";

const statusColor: Record<string, string> = {
  pending: "bg-yellow-200 text-yellow-800",
  confirmed: "bg-primary/20 text-primary",
  cancelled: "bg-destructive/20 text-destructive",
  completed: "bg-green-200 text-green-800",
};

const UserReservations = () => {
  const { user } = useAuth();
  const { getUserReservations, updateReservationStatus } = useOrders();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [cancelReservationId, setCancelReservationId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setReservations(getUserReservations(user.id));
    }

    // Listen for storage changes (when admin updates status)
    const handleStorageChange = () => {
      if (user) {
        setReservations(getUserReservations(user.id));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event for same-tab updates
    window.addEventListener('reservationsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('reservationsUpdated', handleStorageChange);
    };
  }, [user, getUserReservations]);

  const canCancelReservation = (reservation: Reservation) => {
    return reservation.status === "confirmed" || reservation.status === "pending";
  };

  const handleCancelReservation = (reservationId: string) => {
    updateReservationStatus(reservationId, "cancelled");
    setReservations(getUserReservations(user!.id));
    toast.success("Reservation cancelled successfully");
    setCancelReservationId(null);
  };

  if (reservations.length === 0) {
    return (
      <div className="text-center py-12">
        <CalendarDays className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold mb-2">No Reservations Yet</h2>
        <p className="font-body text-muted-foreground mb-6">Book a table for your next dining experience!</p>
        <Button onClick={() => window.location.href = "/reservation"} className="bg-primary text-primary-foreground font-body">
          Make Reservation
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold">My Reservations</h1>
        <p className="font-body text-sm text-muted-foreground">{reservations.length} total reservations</p>
      </div>

      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="bg-card border border-border rounded-xl p-5">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-body text-lg font-bold">{reservation.id}</h3>
                  <span className={`font-body text-xs px-2.5 py-1 rounded-full capitalize ${statusColor[reservation.status]}`}>
                    {reservation.status}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="font-body text-sm">
                    <span className="text-muted-foreground">Date:</span> {reservation.date}
                  </p>
                  <p className="font-body text-sm">
                    <span className="text-muted-foreground">Time:</span> {reservation.time}
                  </p>
                  <p className="font-body text-sm">
                    <span className="text-muted-foreground">Guests:</span> {reservation.guests} people
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="border-t border-border pt-4 mb-4">
              <h4 className="font-body text-sm font-semibold mb-2">Contact Details:</h4>
              <p className="font-body text-sm text-muted-foreground">{reservation.name}</p>
              <p className="font-body text-sm text-muted-foreground">{reservation.phone}</p>
            </div>

            {/* Special Notes */}
            {reservation.notes && (
              <div className="border-t border-border pt-4 mb-4">
                <h4 className="font-body text-sm font-semibold mb-2">Special Notes:</h4>
                <p className="font-body text-sm text-muted-foreground italic">"{reservation.notes}"</p>
              </div>
            )}

            {/* Actions */}
            {canCancelReservation(reservation) && (
              <div className="border-t border-border pt-4">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setCancelReservationId(reservation.id)}
                  className="font-body gap-2"
                >
                  <X className="w-4 h-4" /> Cancel Reservation
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={!!cancelReservationId} onOpenChange={() => setCancelReservationId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Reservation?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this reservation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Keep Reservation</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => cancelReservationId && handleCancelReservation(cancelReservationId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Cancel Reservation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserReservations;
