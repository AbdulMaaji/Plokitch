"use client"

import * as React from "react"
import { X, Loader2 } from "lucide-react"
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
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    cuisineType: "",
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await createVendorAction(formData)
      if (result.success) {
        toast.success("Vendor registered successfully")
        router.refresh()
        onClose()
      } else {
        toast.error(result.error || "Failed to register vendor")
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/40 backdrop-blur-sm">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-lg overflow-hidden border border-divider animate-in fade-in zoom-in duration-200">
        <div className="p-8 border-b border-divider flex justify-between items-center bg-beige/10">
          <div>
            <h2 className="text-2xl font-heading font-bold text-navy">Register New Vendor</h2>
            <p className="text-[13px] font-medium text-subtle mt-1">Create a business profile and user account.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-beige/50 rounded-full transition-colors">
            <X size={20} className="text-subtle" />
          </button>
        </div>

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
      </div>
    </div>
  )
}
