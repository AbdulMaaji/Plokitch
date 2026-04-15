import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import ChefDashboard from "./pages/dashboard/chef/ChefDashboard.tsx";
import RiderDashboard from "./pages/dashboard/rider/RiderDashboard.tsx";
import Kitchens from "./pages/customer/Kitchens.tsx";
import Marketplace from "./pages/customer/Marketplace.tsx";
import LiveTrack from "./pages/customer/LiveTrack.tsx";
import AdminPanel from "./pages/admin/AdminPanel.tsx";

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
          <Route path="/dashboard/chef" element={<ChefDashboard />} />
          <Route path="/dashboard/rider" element={<RiderDashboard />} />
          <Route path="/customer/kitchens" element={<Kitchens />} />
          <Route path="/customer/marketplace" element={<Marketplace />} />
          <Route path="/customer/track" element={<LiveTrack />} />
          <Route path="/admin" element={<AdminPanel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
