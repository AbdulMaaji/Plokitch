import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { PasswordInput } from "@/components/ui/password-input";
import { Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface ChangePasswordDialogProps {
  children?: React.ReactNode;
}

export function ChangePasswordDialog({ children }: ChangePasswordDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setIsSaving(true);
    const { error } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    });
    setIsSaving(false);

    if (error) {
      toast.error(error.message || "Failed to change password.");
    } else {
      toast.success("Password updated successfully!");
      setIsOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" className="w-full justify-start gap-4 h-14 text-muted-foreground hover:text-gold hover:bg-gold/5 font-bold uppercase tracking-widest text-[10px]">
            <Lock size={18} />
            Change Password
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-dark-surface border-gold/20 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black font-heading text-gold">Change Password</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Current Password</Label>
            <PasswordInput 
              id="current-password" 
              placeholder="••••••••" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-dark-deep border-gold/10 focus:border-gold" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-xs font-bold text-muted-foreground uppercase tracking-widest">New Password</Label>
            <PasswordInput 
              id="new-password" 
              placeholder="••••••••" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-dark-deep border-gold/10 focus:border-gold" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Confirm New Password</Label>
            <PasswordInput 
              id="confirm-password" 
              placeholder="••••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-dark-deep border-gold/10 focus:border-gold" 
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={handleSubmit}
            disabled={isSaving}
            className="w-full bg-gold text-background font-black tracking-widest uppercase"
          >
            {isSaving ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
            UPDATE PASSWORD
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
