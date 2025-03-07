
import { User } from "@/types/booking";

export const userService = {
  loginUser: (email: string, password: string): User | null => {
    const users = getUsers();
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    
    return null;
  },
  
  logoutUser: () => {
    localStorage.removeItem('currentUser');
  },
  
  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  },
  
  registerUser: (name: string, email: string, password: string, role: User['role'] = 'user'): User => {
    const users = getUsers();
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 15),
      name,
      email,
      password,
      role
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return newUser;
  },
  
  isAdmin: (): boolean => {
    const currentUser = userService.getCurrentUser();
    return currentUser?.role === 'admin';
  },

  // Initialize with an admin user if none exists
  initializeAdmin: () => {
    const users = getUsers();
    const adminExists = users.some(user => user.role === 'admin');
    
    if (!adminExists) {
      userService.registerUser('Admin', 'admin@ridejoy.com', 'admin123', 'admin');
      console.log('Admin user created');
    }
  }
};

// Helper function
function getUsers(): User[] {
  const usersJson = localStorage.getItem('users');
  return usersJson ? JSON.parse(usersJson) : [];
}
