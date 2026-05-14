"use client"

import * as React from "react"
import { Bike } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddRiderModal } from "./AddRiderModal"

export function RiderHeader() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-heading font-bold text-navy tracking-tight">Rider Operations</h1>
          <p className="text-[15px] font-medium text-subtle/80">Monitor fleet activity and dispatch efficiency.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2 h-11 px-6 shadow-sm"
        >
          <Bike size={18} /> REGISTER RIDER
        </Button>
      </div>
      <AddRiderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
