import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import ForgotPassword from "./pages/auth/ForgotPassword.tsx";
import ChefDashboard from "./pages/dashboard/chef/ChefDashboard.tsx";
import ChefOrders from "./pages/dashboard/chef/ChefOrders.tsx";
import ChefMenu from "./pages/dashboard/chef/ChefMenu.tsx";
import ChefAnalytics from "./pages/dashboard/chef/ChefAnalytics.tsx";
import ChefSettings from "./pages/dashboard/chef/ChefSettings.tsx";
import RiderDashboard from "./pages/dashboard/rider/RiderDashboard.tsx";
import ActiveDeliveries from "./pages/dashboard/rider/ActiveDeliveries.tsx";
import RiderEarnings from "./pages/dashboard/rider/RiderEarnings.tsx";
import RiderSettings from "./pages/dashboard/rider/RiderSettings.tsx";
import AdminPanel from "./pages/admin/AdminPanel.tsx";
import UserManagement from "./pages/admin/UserManagement.tsx";
import OrderOverview from "./pages/admin/OrderOverview.tsx";
import AdminAnalytics from "./pages/admin/AdminAnalytics.tsx";
import AdminSettings from "./pages/admin/AdminSettings.tsx";
import Kitchens from "./pages/customer/Kitchens.tsx";
import KitchenDetail from "./pages/customer/KitchenDetail.tsx";
import Marketplace from "./pages/customer/Marketplace.tsx";
import LiveTrack from "./pages/customer/LiveTrack.tsx";
import CustomerProfile from "./pages/customer/CustomerProfile.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          
          {/* Chef Routes */}
          <Route path="/dashboard/chef" element={<ChefDashboard />} />
          <Route path="/dashboard/chef/orders" element={<ChefOrders />} />
          <Route path="/dashboard/chef/menu" element={<ChefMenu />} />
          <Route path="/dashboard/chef/analytics" element={<ChefAnalytics />} />
          <Route path="/dashboard/chef/settings" element={<ChefSettings />} />
          
          {/* Rider Routes */}
          <Route path="/dashboard/rider" element={<RiderDashboard />} />
          <Route path="/dashboard/rider/active" element={<ActiveDeliveries />} />
          <Route path="/dashboard/rider/earnings" element={<RiderEarnings />} />
          <Route path="/dashboard/rider/settings" element={<RiderSettings />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/orders" element={<OrderOverview />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Customer Routes */}
          <Route path="/customer" element={<Navigate to="/customer/kitchens" replace />} />
          <Route path="/customer/kitchens" element={<Kitchens />} />
          <Route path="/customer/kitchens/:id" element={<KitchenDetail />} />
          <Route path="/customer/marketplace" element={<Marketplace />} />
          <Route path="/customer/track" element={<LiveTrack />} />
          <Route path="/customer/track/:orderId" element={<LiveTrack />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
