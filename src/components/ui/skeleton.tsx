import { cn } from 'src/utilities/cn'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-brand-gray-01', className)} {...props} />
}

export { Skeleton }
