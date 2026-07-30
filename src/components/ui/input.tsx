import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-12 w-full border border-pink-200 bg-white px-4 py-2 text-sm text-ink placeholder:text-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200 focus-visible:border-pink-400 transition-all duration-200 rounded-lg',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
