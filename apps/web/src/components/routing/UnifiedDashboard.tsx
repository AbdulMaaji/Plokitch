import { Navigate, useLocation } from "react-router-dom";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";

// Chef Components
import ChefDashboard from "@/pages/dashboard/chef/ChefDashboard";
import ChefOrders from "@/pages/dashboard/chef/ChefOrders";
import ChefMenu from "@/pages/dashboard/chef/ChefMenu";
import ChefAnalytics from "@/pages/dashboard/chef/ChefAnalytics";
import ChefSettings from "@/pages/dashboard/chef/ChefSettings";

// Rider Components
import RiderDashboard from "@/pages/dashboard/rider/RiderDashboard";
import ActiveDeliveries from "@/pages/dashboard/rider/ActiveDeliveries";
import RiderEarnings from "@/pages/dashboard/rider/RiderEarnings";
import RiderSettings from "@/pages/dashboard/rider/RiderSettings";

// Customer Components
import CustomerProfile from "@/pages/customer/CustomerProfile";

/**
 * Redirects admin users to the external Admin Dashboard
 */
const AdminRedirect = () => {
  const adminUrl = import.meta.env.VITE_ADMIN_URL || "http://localhost:3001";
  
  useEffect(() => {
    window.location.href = adminUrl;
  }, [adminUrl]);

  return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
      <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      <div>
        <h2 className="text-2xl font-black text-white uppercase tracking-widest">Redirecting to Admin Portal</h2>
        <p className="text-muted-foreground">Moving you to the single operational control plane...</p>
      </div>
    </div>
  );
};

export const DashboardHome = () => {
  const { data: session } = authClient.useSession();
  const role = (session?.user as any)?.role;
  
  if (role === 'chef') return <ChefDashboard />;
  if (role === 'rider') return <RiderDashboard />;
  if (role === 'admin') return <AdminRedirect />;
  if (role === 'customer') return <Navigate to="/explore" replace />;
  
  return <div className="p-8 text-center animate-pulse">Loading workspace...</div>;
};

export const DashboardOrders = () => {
  const { data: session } = authClient.useSession();
  const role = (session?.user as any)?.role;
  
  if (role === 'chef') return <ChefOrders />;
  if (role === 'rider') return <ActiveDeliveries />;
  if (role === 'admin') return <AdminRedirect />;
  if (role === 'customer') return <Navigate to="/customer/profile" replace />;
  
  return <div className="p-8 text-center animate-pulse">Loading workspace...</div>;
};

export const DashboardAnalytics = () => {
  const { data: session } = authClient.useSession();
  const role = (session?.user as any)?.role;
  
  if (role === 'chef') return <ChefAnalytics />;
  if (role === 'rider') return <RiderEarnings />;
  if (role === 'admin') return <AdminRedirect />;
  if (role === 'customer') return <Navigate to="/explore" replace />;
  
  return <div className="p-8 text-center animate-pulse">Loading workspace...</div>;
};

export const DashboardSettings = () => {
  const { data: session } = authClient.useSession();
  const role = (session?.user as any)?.role;
  
  if (role === 'chef') return <ChefSettings />;
  if (role === 'rider') return <RiderSettings />;
  if (role === 'admin') return <AdminRedirect />;
  if (role === 'customer') return <CustomerProfile />;
  
  return <div className="p-8 text-center animate-pulse">Loading workspace...</div>;
};

export const DashboardMenu = () => {
  const { data: session } = authClient.useSession();
  const role = (session?.user as any)?.role;
  
  if (role === 'chef') return <ChefMenu />;
  if (role === 'admin') return <AdminRedirect />; 
  return <Navigate to="/dashboard" replace />;
};

export const DashboardUsers = () => {
  const { data: session } = authClient.useSession();
  const role = (session?.user as any)?.role;
  
  if (role === 'admin') return <AdminRedirect />;
  return <Navigate to="/dashboard" replace />;
};
