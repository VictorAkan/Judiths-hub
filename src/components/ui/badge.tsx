import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase',
  {
    variants: {
      variant: {
        'pre-loved': 'bg-pink-50 text-pink-600 border border-pink-200',
        recycled: 'bg-rose-50 text-rose-600 border border-rose-200',
        upcycled: 'bg-gradient-to-r from-pink-50 to-rose-50 text-rose-600 border border-pink-200',
        default: 'bg-ink/5 text-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
