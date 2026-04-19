import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Lock, Mail } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await signIn.email({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message || "Failed to sign in. Please check your credentials.");
      return;
    }

    if (data) {
      toast.success("Welcome back!");
      
      // Better Auth returns user in the data object
      // Using type assertion as role is an additional field
      const role = (data.user as any)?.role || "customer";
      
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "chef") {
        navigate("/dashboard/chef");
      } else if (role === "rider") {
        navigate("/dashboard/rider");
      } else {
        navigate("/customer");
      }
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-deep relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md px-6 z-10"
      >
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors mb-8 group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <Card className="border-gold/20 bg-dark-surface/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 text-gold">
                <Lock size={24} />
              </div>
            </div>
            <CardTitle className="text-3xl font-heading font-bold tracking-tight text-white">Welcome Back</CardTitle>
            <CardDescription className="text-muted-foreground font-body">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground/90">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-dark-deep/50 border-gold/10 focus:border-gold transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" title="password" className="text-sm font-medium text-foreground/90">Password</Label>
                  <Link to="/auth/forgot-password" title="forgot password" className="text-xs text-gold hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-dark-deep/50 border-gold/10 focus:border-gold transition-colors"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gold hover:bg-gold-light text-background font-semibold py-6 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-gold/10 pt-6">
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-gold font-semibold hover:underline decoration-gold/30 underline-offset-4">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
