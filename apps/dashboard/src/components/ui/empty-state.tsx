import * as React from "react"
import { LucideIcon, Search } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

const EmptyState = ({
  icon: Icon = Search,
  title,
  description,
  actionLabel,
  onAction,
  className
}: EmptyStateProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-12 bg-white rounded-card border border-dashed border-divider",
      className
    )}>
      <div className="w-16 h-16 rounded-full bg-beige flex items-center justify-center mb-6">
        <Icon size={32} className="text-subtle" />
      </div>
      <h3 className="text-h3 font-bold text-navy mb-2">{title}</h3>
      <p className="text-body text-subtle max-w-sm mb-8">{description}</p>
      {actionLabel && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  )
}

export { EmptyState }
