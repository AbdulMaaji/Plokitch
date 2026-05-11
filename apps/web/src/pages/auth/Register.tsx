import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Mail, User, ChefHat, Bike, ShieldCheck } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState("customer");
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    restaurantName: "",
    location: "",
    vehicleType: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    setIsLoading(true);

    const name = `${formData.firstName} ${formData.lastName}`.trim();

    // In a real app with Better Auth, you would pass these extra fields. 
    // If the schema requires specific endpoints to create a Vendor or Rider,
    // you would call them here right after signUp.
    const { data, error } = await signUp.email({
      email: formData.email,
      password: formData.password,
      name,
      role, 
      phone: formData.phone,
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message || "Failed to create account.");
      return;
    }

    if (data) {
      toast.success(`Welcome to Plokitch! Your ${role} account is ready.`);
      if (role === "chef") navigate("/dashboard/chef");
      else if (role === "rider") navigate("/dashboard/rider");
      else navigate("/customer");
    }
  };

  const roles = [
    { id: "customer", label: "Customer", icon: User, description: "Order delicious home-cooked meals" },
    { id: "chef", label: "Chef", icon: ChefHat, description: "Share your culinary talent and earn" },
    { id: "rider", label: "Rider", icon: Bike, description: "Deliver freshness to our community" },
  ];

  return (
    <div className="min-h-screen py-20 flex items-center justify-center bg-dark-deep relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl px-6 z-10"
      >
        {step === 1 && (
          <Link 
            to="/auth/login" 
            className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors mb-8 group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </Link>
        )}

        <Card className="border-gold/20 bg-dark-surface/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-heading font-bold text-white">
              {step === 1 ? "Join Plokitch" : `Create ${role.charAt(0).toUpperCase() + role.slice(1)} Account`}
            </CardTitle>
            <CardDescription className="text-muted-foreground font-body">
              {step === 1 ? "Select how you want to use our platform" : "Fill in your details to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <div className="space-y-8">
                <div className="space-y-4">
                  <RadioGroup 
                    value={role} 
                    onValueChange={setRole}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {roles.map((r) => (
                      <div key={r.id}>
                        <RadioGroupItem value={r.id} id={r.id} className="peer sr-only" />
                        <Label
                          htmlFor={r.id}
                          className="flex flex-col items-center justify-between rounded-xl border-2 border-gold/10 bg-dark-deep/30 p-6 hover:bg-gold/5 peer-data-[state=checked]:border-gold peer-data-[state=checked]:bg-gold/10 cursor-pointer transition-all h-full"
                        >
                          <r.icon className={`mb-4 h-10 w-10 ${role === r.id ? "text-gold" : "text-muted-foreground"}`} />
                          <span className="text-lg font-black text-white mb-2">{r.label}</span>
                          <span className="text-xs text-center text-muted-foreground leading-relaxed">{r.description}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <Button 
                  onClick={() => setStep(2)}
                  className="w-full bg-gold hover:bg-gold-light text-background font-black tracking-widest uppercase py-6"
                >
                  Continue as {role.charAt(0).toUpperCase() + role.slice(1)}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <Button type="button" variant="ghost" size="icon" onClick={() => setStep(1)} className="text-muted-foreground hover:text-white -ml-2">
                    <ChevronLeft size={20} />
                  </Button>
                  <span className="text-xs font-bold text-gold tracking-widest uppercase">Back to Role Selection</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-xs font-bold text-muted-foreground uppercase tracking-widest">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      required 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="bg-dark-deep/50 border-gold/10 focus:border-gold text-white" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      required 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="bg-dark-deep/50 border-gold/10 focus:border-gold text-white" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-dark-deep/50 border-gold/10 focus:border-gold text-white" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+1 (555) 000-0000" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-dark-deep/50 border-gold/10 focus:border-gold text-white" 
                    />
                  </div>
                </div>

                {role === "chef" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-2">
                      <Label htmlFor="restaurantName" className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Restaurant Name</Label>
                      <Input 
                        id="restaurantName" 
                        placeholder="e.g. Andre's Bistro" 
                        required 
                        value={formData.restaurantName}
                        onChange={(e) => setFormData({...formData, restaurantName: e.target.value})}
                        className="bg-dark-deep/50 border-gold/10 focus:border-gold text-white" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Location / City</Label>
                      <Input 
                        id="location" 
                        placeholder="e.g. New York, NY" 
                        required 
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="bg-dark-deep/50 border-gold/10 focus:border-gold text-white" 
                      />
                    </div>
                  </div>
                )}

                {role === "rider" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleType" className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Vehicle Type</Label>
                      <Input 
                        id="vehicleType" 
                        placeholder="e.g. Bicycle, Scooter, Car" 
                        required 
                        value={formData.vehicleType}
                        onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                        className="bg-dark-deep/50 border-gold/10 focus:border-gold text-white" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-xs font-bold text-muted-foreground uppercase tracking-widest">City / Area</Label>
                      <Input 
                        id="location" 
                        placeholder="e.g. Manhattan Area" 
                        required 
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="bg-dark-deep/50 border-gold/10 focus:border-gold text-white" 
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Password</Label>
                    <PasswordInput 
                      id="password" 
                      placeholder="••••••••" 
                      required 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="bg-dark-deep/50 border-gold/10 focus:border-gold text-white" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Confirm Password</Label>
                    <PasswordInput 
                      id="confirmPassword" 
                      placeholder="••••••••" 
                      required 
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="bg-dark-deep/50 border-gold/10 focus:border-gold text-white" 
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gold hover:bg-gold-light text-background font-black tracking-widest uppercase py-6 mt-4"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Complete Registration"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-gold/10 pt-6 text-center">
            <p className="text-xs text-muted-foreground leading-relaxed px-10">
              By clicking "Complete Registration", you agree to our 
              <a href="#" className="text-gold hover:underline mx-1">Terms of Service</a> 
              and 
              <a href="#" className="text-gold hover:underline mx-1">Privacy Policy</a>.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
