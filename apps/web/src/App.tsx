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
import Discover from "./pages/customer/Discover.tsx";
import ChefProfile from "./pages/customer/ChefProfile.tsx";
import CustomerDiscoveryShell from "./components/customer/CustomerDiscoveryShell.tsx";
import LiveTrack from "./pages/customer/LiveTrack.tsx";
import Explore from "./pages/Explore.tsx";
import Dishes from "./pages/customer/Dishes.tsx";
import Restaurants from "./pages/customer/Restaurants.tsx";
import CustomerProfile from "./pages/customer/CustomerProfile.tsx";
import Cart from "./pages/customer/Cart.tsx";
import Checkout from "./pages/customer/Checkout.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

import { CartProvider } from "./context/CartContext";
import { useParams } from "react-router-dom";

const RedirectToChef = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/customer/discover/chef/${slug}`} replace />;
};

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
          <Route path="/dashboard/chef/orders" element={<ProtectedRoute><DashboardOrders /></ProtectedRoute>} />
          <Route path="/dashboard/rider/orders" element={<ProtectedRoute><DashboardOrders /></ProtectedRoute>} />

          <Route path="/dashboard/menu" element={<ProtectedRoute><DashboardMenu /></ProtectedRoute>} />
          <Route path="/dashboard/chef/menu" element={<ProtectedRoute><DashboardMenu /></ProtectedRoute>} />

          <Route path="/dashboard/analytics" element={<ProtectedRoute><DashboardAnalytics /></ProtectedRoute>} />
          <Route path="/dashboard/chef/analytics" element={<ProtectedRoute><DashboardAnalytics /></ProtectedRoute>} />
          <Route path="/dashboard/rider/analytics" element={<ProtectedRoute><DashboardAnalytics /></ProtectedRoute>} />

          <Route path="/dashboard/settings" element={<ProtectedRoute><DashboardSettings /></ProtectedRoute>} />
          <Route path="/dashboard/chef/settings" element={<ProtectedRoute><DashboardSettings /></ProtectedRoute>} />
          <Route path="/dashboard/rider/settings" element={<ProtectedRoute><DashboardSettings /></ProtectedRoute>} />

          <Route path="/dashboard/users" element={<ProtectedRoute><DashboardUsers /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><DashboardUsers /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><DashboardSettings /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute><DashboardAnalytics /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><DashboardOrders /></ProtectedRoute>} />
          
          {/* Customer Routes (auth-protected Operating Environment) */}
          <Route path="/customer" element={<Navigate to="/customer/discover" replace />} />
          
          <Route path="/customer/discover" element={<CustomerDiscoveryShell />}>
            <Route index element={<Discover />} />
            <Route path="chef/:idOrSlug" element={<ChefProfile />} />
            <Route path="orders" element={<ProtectedRoute><LiveTrack /></ProtectedRoute>} />
            <Route path="orders/:orderId" element={<ProtectedRoute><LiveTrack /></ProtectedRoute>} />
            <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><CustomerProfile /></ProtectedRoute>} />
          </Route>

          {/* Legacy & Clean redirects back into the Discover Operating Environment */}
          <Route path="/customer/kitchens" element={<Navigate to="/customer/discover" replace />} />
          <Route path="/customer/kitchens/:idOrSlug" element={<Navigate to="/customer/discover" replace />} />
          <Route path="/customer/marketplace" element={<Navigate to="/customer/discover" replace />} />
          <Route path="/customer/track" element={<Navigate to="/customer/discover/orders" replace />} />
          <Route path="/customer/track/:orderId" element={<Navigate to="/customer/discover/orders/:orderId" replace />} />
          <Route path="/customer/cart" element={<Navigate to="/customer/discover" replace />} />
          <Route path="/customer/checkout" element={<Navigate to="/customer/discover/checkout" replace />} />
          <Route path="/customer/profile" element={<Navigate to="/customer/discover/profile" replace />} />
          
          {/* Top-level restaurant wildcard slug redirects into Discover Environment */}
          <Route path="/:slug" element={<RedirectToChef />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
