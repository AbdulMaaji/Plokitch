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
import {
  DashboardHome,
  DashboardOrders,
  DashboardMenu,
  DashboardAnalytics,
  DashboardSettings,
  DashboardUsers
} from "./components/routing/UnifiedDashboard.tsx";
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
          
          {/* Unified Dashboard Routes (auth-protected) */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
          <Route path="/dashboard/chef" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
          <Route path="/dashboard/rider" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
          
          <Route path="/dashboard/orders" element={<ProtectedRoute><DashboardOrders /></ProtectedRoute>} />
          <Route path="/dashboard/menu" element={<ProtectedRoute><DashboardMenu /></ProtectedRoute>} />
          <Route path="/dashboard/analytics" element={<ProtectedRoute><DashboardAnalytics /></ProtectedRoute>} />
          <Route path="/dashboard/settings" element={<ProtectedRoute><DashboardSettings /></ProtectedRoute>} />
          <Route path="/dashboard/users" element={<ProtectedRoute><DashboardUsers /></ProtectedRoute>} />
          
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
