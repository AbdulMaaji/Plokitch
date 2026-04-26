import { Navigate } from "react-router-dom";
import { useSession } from "@/lib/auth-client";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "chef" | "rider" | "admin" | "customer";
}

/**
 * Wraps routes that require authentication.
 * Redirects to /auth/login if no active session.
 * Optionally checks for a specific role.
 */
const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session?.user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requiredRole && (session.user as any).role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
