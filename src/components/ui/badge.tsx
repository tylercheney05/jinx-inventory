import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-[#EEF2F7] text-[#5B6470]",
        destructive: "border-transparent bg-[rgba(223,75,68,0.12)] text-jinxRed",
        outline: "text-foreground",
        success: "border-transparent bg-[rgba(16,144,93,0.12)] text-jinxGreen",
        info: "border-transparent bg-[rgba(42,112,233,0.12)] text-jinxBlue",
        warning: "border-transparent bg-[rgba(244,144,44,0.16)] text-[#A35E13]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
