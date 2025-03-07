
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Booking } from "@/types/booking";
import { bookingService } from "@/services/bookingService";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const BookingStatus = ({ status }: { status: Booking['status'] }) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800"
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bookings when component mounts
    loadBookings();
  }, []);

  const loadBookings = () => {
    setLoading(true);
    try {
      const fetchedBookings = bookingService.getBookings();
      setBookings(fetchedBookings.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    } catch (error) {
      console.error("Error loading bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (bookingId: string, newStatus: Booking['status']) => {
    try {
      const updatedBooking = bookingService.updateBookingStatus(bookingId, newStatus);
      if (updatedBooking) {
        setBookings(prev => 
          prev.map(booking => booking.id === bookingId ? updatedBooking : booking)
        );
        toast.success("Booking status updated");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Failed to update booking status");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse text-center">
                <div className="h-6 w-32 bg-muted rounded mx-auto mb-2"></div>
                <p className="text-muted-foreground">Loading your bookings...</p>
              </div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <h3 className="text-xl font-medium mb-2">No bookings found</h3>
              <p className="text-muted-foreground mb-6">You haven't made any bookings yet.</p>
              <Button onClick={() => window.location.href = '/#booking'}>
                Book a Car Now
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">Booking #{booking.id.slice(0, 8)}</h3>
                        <BookingStatus status={booking.status} />
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">
                          <span className="font-medium text-foreground">Pickup:</span> {booking.pickupLocation} on {format(new Date(booking.pickupDate), "PPP")}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium text-foreground">Return:</span> {booking.returnLocation} on {format(new Date(booking.returnDate), "PPP")}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Created on {format(new Date(booking.createdAt), "PPP")}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {booking.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStatusChange(booking.id, 'confirmed')}
                          >
                            Confirm
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleStatusChange(booking.id, 'cancelled')}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      
                      {booking.status === 'confirmed' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleStatusChange(booking.id, 'completed')}
                        >
                          Mark Completed
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Bookings;
