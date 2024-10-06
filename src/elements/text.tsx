"use client"
import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { ComponentProps } from "react"

type TextProps = ComponentProps<typeof motion.span> &
  VariantProps<typeof textVariants>

const textVariants = cva("", {
  variants: {
    variant: {
      default: "font-medium",
      destructive:
        "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      outline:
        "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
      secondary:
        "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "leading-7 [&:not(:first-child)]:mt-6",
      xs: "mt-4 scroll-m-20 text-base font-semibold tracking-tight",
      sm: "mt-6 scroll-m-20 text-lg font-semibold tracking-tight",
      base: "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
      md: "mt-10 scroll-m-20 text-2xl font-semibold tracking-tight",
      lg: "mt-12 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      xl: "mt-12 scroll-m-20 text-4xl font-bold",
      xxl: "text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export function Text({
  className,
  variant,
  size,
  children,
  ...props
}: TextProps) {
  return (
    <motion.span
      className={cn(textVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </motion.span>
  )
}
