import * as React from "react"
import Image from "next/image"
import { UtensilsCrossed, Plus } from "lucide-react"
import { Button } from "./button"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"

interface FoodCardProps {
  name: string
  description: string
  price: string
  image?: string
  category?: string
  isAvailable?: boolean
  className?: string
}

const FoodCard = ({
  name,
  description,
  price,
  image,
  category,
  isAvailable = true,
  className
}: FoodCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-card shadow-card border border-divider overflow-hidden flex flex-col group transition-all duration-150 hover:shadow-lg",
      className
    )}>
      <div className="relative h-40 w-full bg-navy-50">
        {image ? (
          <Image 
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-subtle opacity-20">
            <UtensilsCrossed size={40} />
          </div>
        )}
        
        {category && (
          <div className="absolute top-3 left-3">
            <Badge variant="action">{category}</Badge>
          </div>
        )}

        {!isAvailable && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <Badge variant="destructive" className="px-4 py-1">Sold Out</Badge>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-grow">
        <div className="flex justify-between items-start">
          <h4 className="font-bold text-navy text-body leading-tight">{name}</h4>
          <span className="font-bold text-action text-body">{price}</span>
        </div>
        <p className="text-caption text-subtle line-clamp-2">{description}</p>
        
        <div className="mt-auto pt-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-between h-9 text-navy border-navy/20 hover:border-action hover:text-action"
            disabled={!isAvailable}
          >
            ADD TO ORDER <Plus size={14} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export { FoodCard }
