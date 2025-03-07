
import { Booking, BookingFormData, User } from "@/types/booking";
import { userService } from "./userService";
import { emailService } from "./emailService";

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
    
    // Create user account if one doesn't already exist
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some((user: User) => user.email === bookingData.email);
      
      if (!userExists) {
        // Generate a random password
        const randomPassword = Math.random().toString(36).substring(2, 10);
        
        // Register the new user
        userService.registerUser(
          bookingData.name, 
          bookingData.email, 
          randomPassword
        );
        
        // Send welcome email with login credentials
        emailService.sendEmail({
          to: bookingData.email,
          subject: 'Welcome to RideJoy - Your Account Details',
          body: `
            <h2>Welcome to RideJoy!</h2>
            <p>Your account has been created. Here are your login details:</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Password:</strong> ${randomPassword}</p>
            <p>Please keep this information secure.</p>
            <p>You can now track your booking status by logging in to your account.</p>
          `
        });
      }
      
      // Send booking confirmation email
      emailService.sendEmail({
        to: bookingData.email,
        subject: 'Your Booking Request - RideJoy',
        body: `
          <h2>Booking Request Received</h2>
          <p>Dear ${bookingData.name},</p>
          <p>We have received your booking request. Here are the details:</p>
          <p><strong>Booking ID:</strong> ${newBooking.id.slice(0, 8)}</p>
          <p><strong>Pickup:</strong> ${bookingData.pickupLocation} on ${new Date(bookingData.pickupDate).toLocaleDateString()}</p>
          <p><strong>Return:</strong> ${bookingData.returnLocation} on ${new Date(bookingData.returnDate).toLocaleDateString()}</p>
          <p>Our team will review your request shortly.</p>
        `
      });
      
    } catch (error) {
      console.error('Error during user registration or email sending:', error);
    }
    
    return newBooking;
  },
  
  getBookings: (): Booking[] => {
    return getBookings();
  },
  
  getUserBookings: (email: string): Booking[] => {
    const bookings = getBookings();
    return bookings.filter(booking => booking.email === email);
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
    
    // Send email notification about status change
    const booking = bookings[bookingIndex];
    const statusMessages = {
      confirmed: 'Your booking has been confirmed!',
      cancelled: 'Your booking has been cancelled.',
      completed: 'Your rental has been marked as completed.'
    };
    
    emailService.sendEmail({
      to: booking.email,
      subject: `Booking Update - ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      body: `
        <h2>Booking Status Update</h2>
        <p>Dear ${booking.name},</p>
        <p>${statusMessages[status as keyof typeof statusMessages]}</p>
        <p><strong>Booking ID:</strong> ${booking.id.slice(0, 8)}</p>
        <p><strong>Pickup:</strong> ${booking.pickupLocation} on ${new Date(booking.pickupDate).toLocaleDateString()}</p>
        <p><strong>Return:</strong> ${booking.returnLocation} on ${new Date(booking.returnDate).toLocaleDateString()}</p>
        <p>Thank you for choosing RideJoy!</p>
      `
    });
    
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
