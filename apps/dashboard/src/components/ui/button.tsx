import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-button text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action disabled:pointer-events-none disabled:opacity-50 gap-2",
  {
    variants: {
      variant: {
        primary: "bg-action text-white hover:bg-action-hover px-8 py-3.5",
        secondary: "bg-transparent border-[1.5px] border-navy text-navy hover:bg-beige px-8 py-3.5",
        ghost: "hover:bg-beige text-navy px-4 py-2",
        link: "text-action underline-offset-4 hover:underline px-0",
        outline: "border border-divider bg-white hover:bg-beige text-navy px-8 py-3.5",
      },
      size: {
        default: "h-auto",
        sm: "px-3 py-1.5 text-caption",
        lg: "px-10 py-4 text-body",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
