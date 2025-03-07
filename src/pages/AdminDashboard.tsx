
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { userService } from "@/services/userService";
import { bookingService } from "@/services/bookingService";
import { emailService } from "@/services/emailService";
import { Booking } from "@/types/booking";
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

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [sentEmails, setSentEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedTab === 'all') {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter(booking => booking.status === selectedTab));
    }
  }, [selectedTab, bookings]);

  const loadData = () => {
    setLoading(true);
    try {
      // Check if current user is admin
      if (!userService.isAdmin()) {
        toast.error("Unauthorized access");
        navigate('/login');
        return;
      }
      
      const fetchedBookings = bookingService.getBookings();
      setBookings(fetchedBookings.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
      
      const emails = emailService.getSentEmails();
      setSentEmails(emails);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load dashboard data");
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
        toast.success(`Booking status updated to ${newStatus}`);
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Failed to update booking status");
    }
  };

  const handleLogout = () => {
    userService.logoutUser();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="flex justify-center py-12">
            <div className="animate-pulse text-center">
              <div className="h-6 w-32 bg-muted rounded mx-auto mb-2"></div>
              <p className="text-muted-foreground">Loading dashboard...</p>
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
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage bookings and user accounts</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>

          <Tabs defaultValue="all" onValueChange={setSelectedTab}>
            <div className="mb-6">
              <TabsList className="grid grid-cols-4 md:w-[400px]">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={selectedTab} className="mt-0">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <h3 className="text-xl font-medium mb-2">No bookings found</h3>
                  <p className="text-muted-foreground">There are no {selectedTab !== 'all' ? selectedTab : ''} bookings at the moment.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredBookings.map((booking) => (
                    <div 
                      key={booking.id}
                      className="bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{booking.name}</h3>
                            <BookingStatus status={booking.status} />
                          </div>
                          
                          <div className="space-y-1 text-sm">
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">Email:</span> {booking.email}
                            </p>
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">Address:</span> {booking.address}
                            </p>
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">Pickup:</span> {booking.pickupLocation} on {format(new Date(booking.pickupDate), "PPP")}
                            </p>
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">Return:</span> {booking.returnLocation} on {format(new Date(booking.returnDate), "PPP")}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Booking #{booking.id.slice(0, 8)} | Created on {format(new Date(booking.createdAt), "PPP")}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {booking.status === 'pending' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200"
                                onClick={() => handleStatusChange(booking.id, 'confirmed')}
                              >
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                                onClick={() => handleStatusChange(booking.id, 'cancelled')}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          
                          {booking.status === 'confirmed' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200"
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
            </TabsContent>
          </Tabs>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Email Notifications</h2>
            
            {sentEmails.length === 0 ? (
              <div className="text-center py-8 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">No emails have been sent yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sentEmails.map((email, index) => (
                  <div key={index} className="bg-white rounded-lg border p-4 text-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-medium">To:</span> {email.to}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(email.sentAt), "PPP p")}
                      </div>
                    </div>
                    <div className="mb-2"><span className="font-medium">Subject:</span> {email.subject}</div>
                    <div className="mt-2 p-3 bg-muted/30 rounded text-xs overflow-hidden text-ellipsis">
                      <div dangerouslySetInnerHTML={{ __html: email.body }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
