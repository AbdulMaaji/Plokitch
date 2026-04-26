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
import Restaurants from "./pages/customer/Restaurants.tsx";
import KitchenDetail from "./pages/customer/KitchenDetail.tsx";
import Dishes from "./pages/customer/Dishes.tsx";
import Explore from "./pages/Explore.tsx";
import LiveTrack from "./pages/customer/LiveTrack.tsx";
import CustomerProfile from "./pages/customer/CustomerProfile.tsx";
import Cart from "./pages/customer/Cart.tsx";
import Checkout from "./pages/customer/Checkout.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/dishes" element={<Dishes />} />
          <Route path="/restaurants" element={<Restaurants />} />
          
          {/* Chef Routes (auth-protected) */}
          <Route path="/dashboard/chef" element={<ProtectedRoute requiredRole="chef"><ChefDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/chef/orders" element={<ProtectedRoute requiredRole="chef"><ChefOrders /></ProtectedRoute>} />
          <Route path="/dashboard/chef/menu" element={<ProtectedRoute requiredRole="chef"><ChefMenu /></ProtectedRoute>} />
          <Route path="/dashboard/chef/analytics" element={<ProtectedRoute requiredRole="chef"><ChefAnalytics /></ProtectedRoute>} />
          <Route path="/dashboard/chef/settings" element={<ProtectedRoute requiredRole="chef"><ChefSettings /></ProtectedRoute>} />
          
          {/* Rider Routes (auth-protected) */}
          <Route path="/dashboard/rider" element={<ProtectedRoute requiredRole="rider"><RiderDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/rider/active" element={<ProtectedRoute requiredRole="rider"><ActiveDeliveries /></ProtectedRoute>} />
          <Route path="/dashboard/rider/earnings" element={<ProtectedRoute requiredRole="rider"><RiderEarnings /></ProtectedRoute>} />
          <Route path="/dashboard/rider/settings" element={<ProtectedRoute requiredRole="rider"><RiderSettings /></ProtectedRoute>} />
          
          {/* Admin Routes (auth-protected) */}
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminPanel /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><UserManagement /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute requiredRole="admin"><OrderOverview /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute requiredRole="admin"><AdminAnalytics /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute requiredRole="admin"><AdminSettings /></ProtectedRoute>} />
          
          {/* Customer Routes (auth-protected) */}
          <Route path="/customer" element={<Navigate to="/customer/kitchens" replace />} />
          <Route path="/customer/kitchens" element={<Kitchens />} />
          <Route path="/customer/kitchens/:idOrSlug" element={<KitchenDetail />} />
          <Route path="/customer/marketplace" element={<Navigate to="/dishes" replace />} />
          <Route path="/customer/track" element={<ProtectedRoute><LiveTrack /></ProtectedRoute>} />
          <Route path="/customer/track/:orderId" element={<ProtectedRoute><LiveTrack /></ProtectedRoute>} />
          <Route path="/customer/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/customer/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/customer/profile" element={<ProtectedRoute><CustomerProfile /></ProtectedRoute>} />
          
          {/* Top-level restaurant slug — e.g. /siennas-organic
              MUST be LAST before the catch-all so named routes match first */}
          <Route path="/:slug" element={<KitchenDetail />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
