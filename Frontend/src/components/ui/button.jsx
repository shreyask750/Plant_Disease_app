import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-none text-sm font-medium ring-offset-background transition-all duration-100 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-60 shadow-[3px_3px_0px_hsl(var(--foreground)/0.2)] hover:shadow-[4px_4px_0px_hsl(var(--foreground)/0.3)] active:shadow-[1px_1px_0px_hsl(var(--foreground)/0.2)] transform active:translate-x-px active:translate-y-px border-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 border-primary-foreground/50',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 border-destructive-foreground/50',
        outline:
          'border-input bg-transparent hover:bg-accent/10 hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-secondary-foreground/50',
        ghost: 'hover:bg-accent/10 hover:text-accent-foreground border-transparent shadow-none active:shadow-none',
        link: 'text-primary underline-offset-4 hover:underline border-transparent shadow-none active:shadow-none',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-xs', // Smaller text for sm
        lg: 'h-12 px-8 text-base', // Larger padding and text for lg
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };