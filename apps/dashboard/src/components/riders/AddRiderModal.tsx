"use client"

import * as React from "react"
import { X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createRiderAction } from "@/app/actions/rider-actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface AddRiderModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddRiderModal({ isOpen, onClose }: AddRiderModalProps) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    vehicleType: "",
    plateNumber: "",
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await createRiderAction(formData)
      if (result.success) {
        toast.success("Rider registered successfully")
        router.refresh()
        onClose()
      } else {
        toast.error(result.error || "Failed to register rider")
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
            <h2 className="text-2xl font-heading font-bold text-navy">Register New Rider</h2>
            <p className="text-[13px] font-medium text-subtle mt-1">Add a new delivery partner to the fleet.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-beige/50 rounded-full transition-colors">
            <X size={20} className="text-subtle" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-navy uppercase tracking-widest">Full Name</label>
            <Input 
              required 
              placeholder="Rider Name" 
              className="h-12"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-navy uppercase tracking-widest">Email Address</label>
              <Input 
                required 
                type="email" 
                placeholder="rider@email.com" 
                className="h-12"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-navy uppercase tracking-widest">Vehicle Type</label>
              <Input 
                required 
                placeholder="e.g. Motorcycle, Bicycle" 
                className="h-12"
                value={formData.vehicleType}
                onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-navy uppercase tracking-widest">Plate Number</label>
              <Input 
                required 
                placeholder="ABC-123-XY" 
                className="h-12 font-bold"
                value={formData.plateNumber}
                onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <Button type="button" variant="ghost" className="flex-1 h-12 rounded-xl" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 h-12 bg-navy hover:bg-navy/90 text-white rounded-xl shadow-lg shadow-navy/20">
              {loading ? <Loader2 className="animate-spin" size={20} /> : "REGISTER RIDER"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
