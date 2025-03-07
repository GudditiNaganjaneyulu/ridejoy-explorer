
export interface Booking {
  id: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export type BookingFormData = Omit<Booking, 'id' | 'status' | 'createdAt'>;
