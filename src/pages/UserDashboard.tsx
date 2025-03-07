
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { userService } from "@/services/userService";
import { bookingService } from "@/services/bookingService";
import { Booking, User } from "@/types/booking";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const UserDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    setLoading(true);
    try {
      const user = userService.getCurrentUser();
      
      if (!user) {
        toast.error("Please log in to view your dashboard");
        navigate('/login');
        return;
      }
      
      setCurrentUser(user);
      
      const userBookings = bookingService.getUserBookings(user.email);
      setBookings(userBookings.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    } catch (error) {
      console.error("Error loading user data:", error);
      toast.error("Failed to load your bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    userService.logoutUser();
    navigate('/login');
  };

  const bookingStatusInfo = {
    pending: {
      title: "Under Review",
      description: "Your booking is being reviewed by our team. We'll notify you once it's confirmed."
    },
    confirmed: {
      title: "Ready for Pickup",
      description: "Your booking is confirmed! You can pick up your vehicle at the scheduled time and location."
    },
    completed: {
      title: "Rental Completed",
      description: "Thank you for using our service! We hope you had a great experience."
    },
    cancelled: {
      title: "Booking Cancelled",
      description: "Unfortunately, your booking has been cancelled. Please contact our support team for more information."
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="flex justify-center py-12">
            <div className="animate-pulse text-center">
              <div className="h-6 w-32 bg-muted rounded mx-auto mb-2"></div>
              <p className="text-muted-foreground">Loading your bookings...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {currentUser?.name}</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => navigate('/#booking')}>
                New Booking
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
            
            {bookings.length === 0 ? (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No bookings found</h3>
                <p className="text-muted-foreground mb-6">You haven't made any bookings yet.</p>
                <Button onClick={() => navigate('/#booking')}>
                  Book a Car Now
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => {
                  const statusInfo = bookingStatusInfo[booking.status];
                  
                  return (
                    <div 
                      key={booking.id}
                      className="bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-grow">
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
                        
                        <div className="bg-muted/30 p-4 rounded-lg lg:w-1/3">
                          <h4 className="font-medium text-sm mb-1">{statusInfo.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {statusInfo.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;
