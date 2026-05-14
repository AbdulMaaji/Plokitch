"use client"

import * as React from "react"
import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddVendorModal } from "./AddVendorModal"

export function VendorHeader() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-heading font-bold text-navy tracking-tight">Vendor Operations</h1>
          <p className="text-[15px] font-medium text-subtle/80">Approve new vendors and manage platform kitchen performance.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2 h-11 px-6 shadow-sm"
        >
          <UserPlus size={18} /> ADD NEW VENDOR
        </Button>
      </div>
      <AddVendorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
