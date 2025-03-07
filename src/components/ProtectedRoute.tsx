
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { userService } from "@/services/userService";
import { User } from "@/types/booking";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole: User['role'];
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = userService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === 'admin' && currentUser.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
