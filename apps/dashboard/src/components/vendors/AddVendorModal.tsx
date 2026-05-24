"use client"

import * as React from "react"
import { X, Loader2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createVendorAction } from "@/app/actions/vendor-actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface AddVendorModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddVendorModal({ isOpen, onClose }: AddVendorModalProps) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [createdCredentials, setCreatedCredentials] = React.useState<{ email: string; tempPassword?: string } | null>(null)
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    cuisineType: "",
  })

  if (!isOpen) return null

  const handleCopy = () => {
    if (!createdCredentials) return
    const text = `Email: ${createdCredentials.email}\nTemporary Password: ${createdCredentials.tempPassword || "Plokitch@2026!"}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success("Credentials copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await createVendorAction(formData)
      if (result.success) {
        toast.success("Vendor registered successfully")
        router.refresh()
        setCreatedCredentials({
          email: formData.email,
          tempPassword: (result.data as any).tempPassword
        })
      } else {
        toast.error(result.error || "Failed to register vendor")
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setCreatedCredentials(null)
    setFormData({
      name: "",
      email: "",
      phone: "",
      businessName: "",
      cuisineType: "",
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/40 backdrop-blur-sm">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-lg overflow-hidden border border-divider animate-in fade-in zoom-in duration-200">
        <div className="p-8 border-b border-divider flex justify-between items-center bg-beige/10">
          <div>
            <h2 className="text-2xl font-heading font-bold text-navy">
              {createdCredentials ? "Credentials Generated" : "Register New Vendor"}
            </h2>
            <p className="text-[13px] font-medium text-subtle mt-1">
              {createdCredentials ? "Share these credentials with the vendor." : "Create a business profile and user account."}
            </p>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-beige/50 rounded-full transition-colors">
            <X size={20} className="text-subtle" />
          </button>
        </div>

        {createdCredentials ? (
          <div className="p-8 flex flex-col gap-6">
            <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/50 space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Operational Identity</p>
                <p className="text-sm font-bold text-navy">{createdCredentials.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Temporary Password</p>
                <p className="text-sm font-mono font-bold text-navy">{createdCredentials.tempPassword || "Plokitch@2026!"}</p>
              </div>
            </div>

            <p className="text-xs text-subtle leading-relaxed">
              The vendor must set their precise kitchen map coordinates on their first login to enable public discovery.
            </p>

            <div className="flex gap-4">
              <Button type="button" onClick={handleCopy} className="flex-1 h-12 border border-divider hover:bg-beige/10 text-navy font-bold rounded-xl flex items-center justify-center gap-2">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "COPIED!" : "COPY CREDENTIALS"}
              </Button>
              <Button type="button" onClick={handleClose} className="flex-1 h-12 bg-navy hover:bg-navy/90 text-white font-bold rounded-xl">
                DONE
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-navy uppercase tracking-widest">Full Name</label>
              <Input 
                required 
                placeholder="Owner Name" 
                className="h-12"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-navy uppercase tracking-widest">Email Address</label>
              <Input 
                required 
                type="email" 
                placeholder="vendor@email.com" 
                className="h-12"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-navy uppercase tracking-widest">Phone Number</label>
            <Input 
              required 
              placeholder="+234..." 
              className="h-12"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-navy uppercase tracking-widest">Business Name</label>
            <Input 
              required 
              placeholder="Restaurant Name" 
              className="h-12 font-bold"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-navy uppercase tracking-widest">Cuisine / Category</label>
            <Input 
              required 
              placeholder="e.g. Gourmet, Local, Fast Food" 
              className="h-12"
              value={formData.cuisineType}
              onChange={(e) => setFormData({ ...formData, cuisineType: e.target.value })}
            />
          </div>

          <div className="flex gap-4 mt-4">
            <Button type="button" variant="ghost" className="flex-1 h-12 rounded-xl" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 h-12 bg-navy hover:bg-navy/90 text-white rounded-xl shadow-lg shadow-navy/20">
              {loading ? <Loader2 className="animate-spin" size={20} /> : "REGISTER VENDOR"}
            </Button>
          </div>
        </form>
        )}
      </div>
    </div>
  )
}
