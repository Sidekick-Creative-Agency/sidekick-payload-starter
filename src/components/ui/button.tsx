import { cn } from 'src/utilities/cn'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-md font-light font-basic-sans uppercase tracking-widest leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'py-4 px-8',
        icon: 'h-10 w-10',
        lg: 'py-5 px-8',
        sm: 'py-2 px-4',
      },
      variant: {
        default:
          'border border-brand-navy bg-brand-navy text-white hover:bg-brand-navy/90 no-underline',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 no-underline',
        ghost: 'hover:bg-card hover:text-accent-foreground no-underline',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
        outline:
          'border border-brand-navy bg-transparent hover:bg-brand-navy hover:text-white no-underline',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 no-underline',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
