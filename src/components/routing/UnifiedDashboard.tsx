import { Navigate } from "react-router-dom";
import { authClient } from "@/lib/auth-client";

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

// Admin Components
import AdminPanel from "@/pages/admin/AdminPanel";
import UserManagement from "@/pages/admin/UserManagement";
import OrderOverview from "@/pages/admin/OrderOverview";
import AdminAnalytics from "@/pages/admin/AdminAnalytics";
import AdminSettings from "@/pages/admin/AdminSettings";

// Customer Components
import CustomerProfile from "@/pages/customer/CustomerProfile";


export const DashboardHome = () => {
  const { data: session } = authClient.useSession();
  const role = session?.user?.role;
  
  if (role === 'chef') return <ChefDashboard />;
  if (role === 'rider') return <RiderDashboard />;
  if (role === 'admin') return <AdminPanel />;
  if (role === 'customer') return <Navigate to="/explore" replace />;
  
  return <div className="p-8 text-center animate-pulse">Loading workspace...</div>;
};

export const DashboardOrders = () => {
  const { data: session } = authClient.useSession();
  const role = session?.user?.role;
  
  if (role === 'chef') return <ChefOrders />;
  if (role === 'rider') return <ActiveDeliveries />;
  if (role === 'admin') return <OrderOverview />;
  if (role === 'customer') return <Navigate to="/customer/profile" replace />;
  
  return <div className="p-8 text-center animate-pulse">Loading workspace...</div>;
};

export const DashboardAnalytics = () => {
  const { data: session } = authClient.useSession();
  const role = session?.user?.role;
  
  if (role === 'chef') return <ChefAnalytics />;
  if (role === 'rider') return <RiderEarnings />;
  if (role === 'admin') return <AdminAnalytics />;
  if (role === 'customer') return <Navigate to="/explore" replace />;
  
  return <div className="p-8 text-center animate-pulse">Loading workspace...</div>;
};

export const DashboardSettings = () => {
  const { data: session } = authClient.useSession();
  const role = session?.user?.role;
  
  if (role === 'chef') return <ChefSettings />;
  if (role === 'rider') return <RiderSettings />;
  if (role === 'admin') return <AdminSettings />;
  if (role === 'customer') return <CustomerProfile />;
  
  return <div className="p-8 text-center animate-pulse">Loading workspace...</div>;
};

export const DashboardMenu = () => {
  const { data: session } = authClient.useSession();
  const role = session?.user?.role;
  
  if (role === 'chef') return <ChefMenu />;
  if (role === 'admin') return <UserManagement />; // Admins see User Management here as a fallback or handle separately
  return <Navigate to="/dashboard" replace />;
};

export const DashboardUsers = () => {
  const { data: session } = authClient.useSession();
  const role = session?.user?.role;
  
  if (role === 'admin') return <UserManagement />;
  return <Navigate to="/dashboard" replace />;
};
