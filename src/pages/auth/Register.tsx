import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Mail, User, ChefHat, Bike, ShieldCheck } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("customer");
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const name = `${firstName} ${lastName}`.trim();

    const { data, error } = await signUp.email({
      email,
      password,
      name,
      // Pass the role using the custom fields configured in backend
      role, 
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message || "Failed to create account.");
      return;
    }

    if (data) {
      toast.success("Account created successfully!");
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
        <Link 
          to="/auth/login" 
          className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors mb-8 group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Link>

        <Card className="border-gold/20 bg-dark-surface/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-heading font-bold text-white">Create Account</CardTitle>
            <CardDescription className="text-muted-foreground font-body">
              Join the Plokitch community today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="John" 
                    required 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-dark-deep/50 border-gold/10 focus:border-gold" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe" 
                    required 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-dark-deep/50 border-gold/10 focus:border-gold" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-dark-deep/50 border-gold/10 focus:border-gold" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-dark-deep/50 border-gold/10 focus:border-gold" 
                />
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium">I want to join as a:</Label>
                <RadioGroup 
                  defaultValue="customer" 
                  onValueChange={setRole}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {roles.map((r) => (
                    <div key={r.id}>
                      <RadioGroupItem value={r.id} id={r.id} className="peer sr-only" />
                      <Label
                        htmlFor={r.id}
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-gold/10 bg-dark-deep/30 p-4 hover:bg-gold/5 peer-data-[state=checked]:border-gold peer-data-[state=checked]:bg-gold/10 cursor-pointer transition-all h-full"
                      >
                        <r.icon className={`mb-3 h-6 w-6 ${role === r.id ? "text-gold" : "text-muted-foreground"}`} />
                        <span className="text-sm font-semibold text-white mb-1">{r.label}</span>
                        <span className="text-[10px] text-center text-muted-foreground leading-tight">{r.description}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gold hover:bg-gold-light text-background font-semibold py-6"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Complete Registration"}
              </Button>
            </form>
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
