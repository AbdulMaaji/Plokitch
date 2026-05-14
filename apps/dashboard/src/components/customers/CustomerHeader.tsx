"use client"

import * as React from "react"
import { Download, UserCheck, PieChart, Users, TrendingUp, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface CustomerHeaderProps {
  customers: any[]
}

export function CustomerHeader({ customers }: CustomerHeaderProps) {
  const [isExporting, setIsExporting] = React.useState(false)

  const handleExport = () => {
    setIsExporting(true)
    try {
      // 1. Prepare CSV headers
      const headers = ["ID", "Name", "Email", "Segment", "Total Orders", "LTV (₦)", "Joined Date"]
      
      // 2. Prepare rows
      const rows = customers.map(c => [
        c.id.slice(0, 8),
        c.name,
        c.email,
        c.segment,
        c.totalOrders,
        c.ltv,
        new Date(c.created_at).toLocaleDateString()
      ])

      // 3. Convert to CSV string
      const csvContent = [
        headers.join(","),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
      ].join("\n")

      // 4. Trigger Download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `plokitch_customers_${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast.success("Customer data exported successfully")
    } catch (error) {
      toast.error("Failed to export data")
    } finally {
      setIsExporting(false)
    }
  }

  // Calculate segment breakdown for the summary modal
  const segments = {
    VIP: customers.filter(c => c.segment === "VIP").length,
    NEW: customers.filter(c => c.segment === "NEW").length,
    LOYAL: customers.filter(c => c.segment === "LOYAL").length,
    DORMANT: customers.filter(c => c.segment === "DORMANT").length,
    AT_RISK: customers.filter(c => c.segment === "AT_RISK").length,
    REGULAR: customers.filter(c => c.segment === "REGULAR").length,
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-heading font-bold text-navy tracking-tight">Customer Operations</h1>
        <p className="text-[15px] font-medium text-subtle/80">Manage platform users, monitor spending patterns, and handle account flags.</p>
      </div>
      
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 h-11 px-6 border-divider hover:bg-beige/20 transition-all"
          onClick={handleExport}
          disabled={isExporting}
        >
          <Download size={18} className={isExporting ? "animate-bounce" : ""} />
          {isExporting ? "EXPORTING..." : "EXPORT DATA"}
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2 h-11 px-6 shadow-lg shadow-navy/10 transition-all active:scale-95">
              <UserCheck size={18} /> USER SEGMENTS
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white p-0 overflow-hidden border-divider rounded-[24px]">
            <div className="p-8 bg-navy text-white">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <PieChart size={24} className="text-action" />
                  </div>
                  <DialogTitle className="text-2xl font-heading font-bold text-white">Segmentation Summary</DialogTitle>
                </div>
                <DialogDescription className="text-white/60 font-medium">
                  Analysis of your customer base engagement and loyalty tiers.
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="p-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl border border-divider bg-purple-50/30">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-subtle uppercase tracking-widest">VIP Customers</p>
                  <p className="text-xl font-black text-navy">{segments.VIP} <span className="text-[12px] font-medium text-subtle ml-1">users</span></p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-divider bg-green-50/30">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-subtle uppercase tracking-widest">Loyal Users</p>
                  <p className="text-xl font-black text-navy">{segments.LOYAL} <span className="text-[12px] font-medium text-subtle ml-1">users</span></p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-divider bg-blue-50/30">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-subtle uppercase tracking-widest">New Signups</p>
                  <p className="text-xl font-black text-navy">{segments.NEW} <span className="text-[12px] font-medium text-subtle ml-1">users</span></p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-divider bg-red-50/30">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-subtle uppercase tracking-widest">At Risk / Dormant</p>
                  <p className="text-xl font-black text-navy">{segments.AT_RISK + segments.DORMANT} <span className="text-[12px] font-medium text-subtle ml-1">users</span></p>
                </div>
              </div>
            </div>

            <div className="px-8 pb-8 flex flex-col gap-2">
              <p className="text-[11px] font-bold text-subtle uppercase tracking-widest">Segment Intelligence</p>
              <div className="p-4 bg-beige/20 rounded-xl border border-divider">
                <p className="text-[13px] font-medium text-navy leading-relaxed italic">
                  "Your VIP segment represents high-value growth. Consider targeting the 'At Risk' group with a reactivation campaign in the next 48 hours."
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
