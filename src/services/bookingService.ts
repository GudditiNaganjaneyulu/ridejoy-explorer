
import { Booking, BookingFormData } from "@/types/booking";

// This simulates what would be MongoDB operations in a real backend
export const bookingService = {
  saveBooking: (bookingData: BookingFormData): Booking => {
    const bookings = getBookings();
    
    const newBooking: Booking = {
      ...bookingData,
      id: generateId(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    return newBooking;
  },
  
  getBookings: (): Booking[] => {
    return getBookings();
  },
  
  getBookingById: (id: string): Booking | undefined => {
    const bookings = getBookings();
    return bookings.find(booking => booking.id === id);
  },
  
  updateBookingStatus: (id: string, status: Booking['status']): Booking | undefined => {
    const bookings = getBookings();
    const bookingIndex = bookings.findIndex(booking => booking.id === id);
    
    if (bookingIndex === -1) return undefined;
    
    bookings[bookingIndex] = {
      ...bookings[bookingIndex],
      status
    };
    
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return bookings[bookingIndex];
  }
};

// Helper functions
function getBookings(): Booking[] {
  const bookingsJson = localStorage.getItem('bookings');
  return bookingsJson ? JSON.parse(bookingsJson) : [];
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}
