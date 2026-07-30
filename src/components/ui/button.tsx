import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium tracking-wide uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-full',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 active:scale-[0.97]',
        secondary:
          'bg-ink text-white hover:bg-ink/90 active:scale-[0.97]',
        outline:
          'border-2 border-pink-200 bg-transparent text-pink-600 hover:bg-pink-50 active:scale-[0.97]',
        ghost:
          'bg-transparent text-ink/60 hover:text-pink-500 hover:bg-pink-50',
        accent:
          'bg-pink-50 text-pink-600 hover:bg-pink-100 active:scale-[0.97]',
      },
      size: {
        sm: 'h-9 px-5 text-xs',
        md: 'h-11 px-7 text-sm',
        lg: 'h-13 px-9 text-sm',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
