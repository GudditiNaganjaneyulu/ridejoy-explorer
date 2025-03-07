
// Current types are fine for MongoDB integration, just need to update our understanding
// that 'id' will become '_id' in MongoDB

export interface Booking {
  id: string;  // Will be _id in MongoDB
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
  id: string;  // Will be _id in MongoDB
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
}
