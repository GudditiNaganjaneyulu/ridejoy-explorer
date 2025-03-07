
export interface Booking {
  id: string;
  name: string;
  email: string;
  address: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export type BookingFormData = Omit<Booking, 'id' | 'status' | 'createdAt'>;

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
}
