import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Utensils,
  Bike,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Users,
  PieChart,
  ShoppingBag,
  Store,
  MapPin,
  RefreshCw,
  ChefHat,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useCart } from "@/context/CartContext";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "chef" | "rider" | "admin" | "customer";
}

const DashboardLayout = ({ children, role: pageRole }: DashboardLayoutProps) => {
  const { data: session } = authClient.useSession();
  const userRole = session?.user?.role as "chef" | "rider" | "admin" | "customer" || pageRole;
  
  const [role, setRole] = useState(pageRole);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);

  // Update role if pageRole changes
  useEffect(() => {
    setRole(pageRole);
  }, [pageRole]);

  const getAllowedRoles = () => {
    // Admin can simulate anything
    // If not admin, use the role from the session
    switch (userRole) {
      case "admin":
        return ["admin", "chef", "rider", "customer"];
      case "chef":
        return ["chef", "customer"];
      case "rider":
        return ["rider", "customer"];
      case "customer":
      default:
        return ["customer"];
    }
  };

  const allowedRoles = getAllowedRoles();


  const menuItems = {
    chef: [
      { icon: LayoutDashboard, label: "Overview", href: "/dashboard/chef" },
      { icon: ShoppingBag, label: "Orders", href: "/dashboard/chef/orders" },
      { icon: Utensils, label: "My Menu", href: "/dashboard/chef/menu" },
      { icon: PieChart, label: "Analytics", href: "/dashboard/chef/analytics" },
      { icon: Settings, label: "Settings", href: "/dashboard/chef/settings" },
    ],
    rider: [
      { icon: LayoutDashboard, label: "Available Deliveries", href: "/dashboard/rider" },
      { icon: Bike, label: "My Deliveries", href: "/dashboard/rider/active" },
      { icon: PieChart, label: "Earnings", href: "/dashboard/rider/earnings" },
      { icon: Settings, label: "Settings", href: "/dashboard/rider/settings" },
    ],
    admin: [
      { icon: LayoutDashboard, label: "System Status", href: "/admin" },
      { icon: Users, label: "User Management", href: "/admin/users" },
      { icon: ShoppingBag, label: "Order Overview", href: "/admin/orders" },
      { icon: PieChart, label: "Global Analytics", href: "/admin/analytics" },
      { icon: Settings, label: "Platform Settings", href: "/admin/settings" },
    ],
    customer: [
      { icon: Store, label: "Kitchens", href: "/customer/kitchens" },
      { icon: ShoppingBag, label: "Marketplace", href: "/customer/marketplace" },
      { icon: MapPin, label: "Track Order", href: "/customer/track" },
      { icon: Settings, label: "Profile", href: "/customer/profile" },
    ]
  };

  const currentMenu = menuItems[role];

  const handleRoleSwitch = (newRole: "chef" | "rider" | "admin" | "customer") => {
    setRole(newRole);
    // In a real app we'd navigate, for demo we just switch UI
    const paths = {
      chef: "/dashboard/chef",
      rider: "/dashboard/rider",
      admin: "/admin",
      customer: "/customer/kitchens"
    };
    navigate(paths[newRole]);
  };

  const handleSignOutConfirm = async () => {
    try {
      await authClient.signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-dark-deep font-body text-foreground flex flex-col md:flex-row">
      {/* Sidebar - Desktop Only */}
      <aside
        className={`${isSidebarOpen ? "w-64" : "w-20"
          } bg-dark-surface border-r border-gold/10 transition-all duration-300 hidden md:flex flex-col z-50 sticky top-0 h-screen`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center shrink-0">
            <Utensils size={18} className="text-background" />
          </div>
          {isSidebarOpen && (
            <span className="font-heading font-bold text-xl text-gold tracking-tight lowercase">Plokitch</span>
          )}
        </div>

        {/* Role Switcher (Admin Only) */}
        {isSidebarOpen && userRole === "admin" && (
          <div className="px-4 mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full border-gold/20 text-gold hover:bg-gold/5 flex justify-between gap-2 overflow-hidden">
                  <span className="truncate flex items-center gap-2">
                    <RefreshCw size={14} />
                    Role: {role}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-dark-surface border-gold/10 text-white w-56">
                <DropdownMenuLabel>Simulation Mode</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gold/10" />
                {allowedRoles.includes("customer") && <DropdownMenuItem onClick={() => handleRoleSwitch("customer")} className="hover:bg-gold/10 cursor-pointer">Customer View</DropdownMenuItem>}
                {allowedRoles.includes("chef") && <DropdownMenuItem onClick={() => handleRoleSwitch("chef")} className="hover:bg-gold/10 cursor-pointer">Chef Dashboard</DropdownMenuItem>}
                {allowedRoles.includes("rider") && <DropdownMenuItem onClick={() => handleRoleSwitch("rider")} className="hover:bg-gold/10 cursor-pointer">Rider Dashboard</DropdownMenuItem>}
                {allowedRoles.includes("admin") && <DropdownMenuItem onClick={() => handleRoleSwitch("admin")} className="hover:bg-gold/10 cursor-pointer">Admin Panel</DropdownMenuItem>}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <nav className="flex-1 px-4 py-6 space-y-2">
          {currentMenu.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === item.href
                  ? "bg-gold text-background shadow-lg shadow-gold/20"
                  : "text-muted-foreground hover:bg-gold/5 hover:text-gold"
                }`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gold/10">
          <Button
            variant="ghost"
            onClick={() => setIsSignOutOpen(true)}
            className="w-full flex items-center justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm">Sign Out</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden pb-20 md:pb-0">
        <header className="h-16 md:h-20 bg-dark-surface/50 backdrop-blur-md border-b border-gold/10 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gold hidden md:flex"
            >
              <Menu size={24} />
            </Button>

            {/* Mobile Title */}
            <div className="flex items-center gap-2 md:hidden">
              <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center shrink-0">
                <Utensils size={16} className="text-background" />
              </div>
              <span className="font-heading font-black text-gold tracking-tight lowercase">Plokitch</span>
            </div>

            <div className="max-w-md w-full relative hidden lg:block ml-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search..."
                className="pl-10 !bg-white/5 backdrop-blur-md border-gold/10 focus:border-gold focus:!bg-white/10 h-10 text-sm rounded-full transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            {role === "customer" && (
              <button 
                onClick={() => navigate("/customer/cart")}
                className="relative text-muted-foreground hover:text-gold transition-colors p-2"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-gold text-background text-[10px] font-black rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            )}
            <button className="relative text-muted-foreground hover:text-gold transition-colors p-2">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-3 md:pl-6 border-l border-gold/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-white capitalize leading-none mb-1">{session?.user?.name || role}</p>
                <p className="text-[10px] font-bold text-gold uppercase tracking-widest opacity-80">{role}</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 md:h-10 md:w-10 border border-gold/20 cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-dark-surface border-gold/10 text-white w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gold/10" />
                  <DropdownMenuItem onClick={() => navigate("/customer/profile")} className="hover:bg-gold/10 cursor-pointer flex gap-2">
                    <User size={16} className="text-gold" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(role === "admin" ? "/admin/settings" : `/dashboard/${role}/settings`)} className="hover:bg-gold/10 cursor-pointer flex gap-2">
                    <Settings size={16} className="text-gold" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gold/10" />
                  <DropdownMenuItem onClick={() => setIsSignOutOpen(true)} className="hover:bg-destructive/10 text-destructive cursor-pointer flex gap-2">
                    <LogOut size={16} /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="p-4 md:p-8"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 bg-dark-surface/90 backdrop-blur-xl border-t border-gold/10 flex items-center justify-between px-2 py-1 z-50 md:hidden">
        {currentMenu.slice(0, 5).map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`flex flex-col items-center gap-1 flex-1 py-2 px-1 rounded-xl transition-all ${location.pathname === item.href
                ? "text-gold"
                : "text-muted-foreground"
              }`}
          >
            <item.icon size={20} className={location.pathname === item.href ? "scale-110" : ""} />
            <span className="text-[10px] font-medium tracking-tight truncate w-full text-center">{item.label}</span>
            {location.pathname === item.href && (
              <motion.div
                layoutId="activeTab"
                className="w-1 h-1 bg-gold rounded-full"
              />
            )}
          </Link>
        ))}
        {/* Role Switcher in Mobile Nav (Admin Only) */}
        {userRole === "admin" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex flex-col items-center gap-1 flex-1 py-2 px-1 text-muted-foreground">
                <RefreshCw size={20} />
                <span className="text-[10px] font-medium">Switch</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="end" className="bg-dark-surface border-gold/10 text-white w-56 mb-2">
              <DropdownMenuLabel>Simulation Mode</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gold/10" />
              {allowedRoles.includes("customer") && <DropdownMenuItem onClick={() => handleRoleSwitch("customer")} className="hover:bg-gold/10 cursor-pointer">Customer View</DropdownMenuItem>}
              {allowedRoles.includes("chef") && <DropdownMenuItem onClick={() => handleRoleSwitch("chef")} className="hover:bg-gold/10 cursor-pointer">Chef Dashboard</DropdownMenuItem>}
              {allowedRoles.includes("rider") && <DropdownMenuItem onClick={() => handleRoleSwitch("rider")} className="hover:bg-gold/10 cursor-pointer">Rider Dashboard</DropdownMenuItem>}
              {allowedRoles.includes("admin") && <DropdownMenuItem onClick={() => handleRoleSwitch("admin")} className="hover:bg-gold/10 cursor-pointer">Admin Panel</DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>

      <AlertDialog open={isSignOutOpen} onOpenChange={setIsSignOutOpen}>
        <AlertDialogContent className="bg-dark-surface border-gold/20 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading font-black text-gold">Ready to leave?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to sign out of your account? You will need to log back in to access your dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/10 hover:bg-white/5 text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSignOutConfirm} className="bg-red-500 text-white hover:bg-red-600 font-bold uppercase tracking-widest">Sign Out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DashboardLayout;
