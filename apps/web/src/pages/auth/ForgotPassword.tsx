import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate reset link sending
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      toast.success("Recovery link sent!", {
        description: "Please check your email for instructions."
      });
    }, 1500);
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
          to="/auth/login" 
          className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors mb-8 group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Link>

        <Card className="border-gold/20 bg-dark-surface/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 text-gold">
                {isSent ? <ShieldCheck size={24} /> : <Mail size={24} />}
              </div>
            </div>
            <CardTitle className="text-3xl font-heading font-bold tracking-tight text-white">
              {isSent ? "Check your mail" : "Forgot Password?"}
            </CardTitle>
            <CardDescription className="text-muted-foreground font-body">
              {isSent 
                ? "We have sent a password recovery link to your email." 
                : "Enter your email and we'll send you a link to reset your password."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSent ? (
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
                      className="pl-10 bg-dark-deep/50 border-gold/10 focus:border-gold transition-colors"
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gold hover:bg-gold-light text-background font-semibold py-6 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending link..." : "Send Reset Link"}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <Button 
                  onClick={() => navigate("/auth/login")}
                  className="w-full bg-gold hover:bg-gold-light text-background font-semibold py-6 transition-all duration-300"
                >
                  Return to Login
                </Button>
                <button 
                  onClick={() => setIsSent(false)}
                  className="w-full text-center text-xs text-gold hover:underline"
                >
                  Didn't receive the email? Try again
                </button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-gold/10 pt-6">
            <div className="text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link to="/auth/login" className="text-gold font-semibold hover:underline decoration-gold/30 underline-offset-4">
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
