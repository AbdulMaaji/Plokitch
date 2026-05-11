import * as React from "react"
import Image from "next/image"
import { Bike, Clock3, ChevronRight, User, MapPin } from "lucide-react"
import { StatusBadge } from "./status-badge"
import { DeliveryStatusPill } from "./delivery-status-pill"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface OrderCardProps {
  id: string
  restaurantName: string
  restaurantImage?: string
  status: string
  customerName: string
  eta: string
  amount: string
  riderName?: string
  className?: string
}

const OrderCard = ({
  id,
  restaurantName,
  restaurantImage,
  status,
  customerName,
  eta,
  amount,
  riderName,
  className
}: OrderCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-card shadow-card overflow-hidden border border-divider flex flex-col transition-all duration-150 hover:shadow-lg",
      className
    )}>
      {/* Header Image Area */}
      <div className="relative h-32 w-full bg-navy-50">
        {restaurantImage ? (
          <Image 
            src={restaurantImage}
            alt={restaurantName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-subtle opacity-20">
            <Bike size={48} />
          </div>
        )}
        
        {/* Floating Status Badge */}
        <div className="absolute bottom-3 left-3">
          <StatusBadge icon={Clock3} label="Preparing Order" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-navy text-h3 leading-tight">{restaurantName}</h3>
            <p className="text-caption text-subtle">Order #{id}</p>
          </div>
          <div className="text-right">
            <span className="font-bold text-navy text-body">{amount}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-2 border-y border-divider">
          <div className="flex items-center gap-2 text-caption text-navy font-medium">
            <User size={14} className="text-subtle" />
            {customerName}
          </div>
          <div className="flex items-center gap-2 text-caption text-navy font-medium">
            <Clock3 size={14} className="text-subtle" />
            ETA: {eta}
          </div>
          {riderName && (
            <div className="flex items-center gap-2 text-caption text-navy font-medium">
              <Bike size={14} className="text-subtle" />
              Rider: {riderName}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-1">
          <DeliveryStatusPill icon={Bike} label={status} />
          <Button variant="ghost" size="sm" className="p-0 h-auto font-bold text-action hover:bg-transparent">
            DETAILS <ChevronRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export { OrderCard }
