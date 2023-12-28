import { cn } from "@/lib/utils";

interface LiveBadgeProps {
  className?: string;
}

export const LiveBadge = ({ className }: LiveBadgeProps) => {
  return (
    <div className={cn(
      'bg-rose-500 text-center p-0.5 px-1.5 rounded-md uppercase border border-background text-[10px] font-semibold tracking-wide',
      className
    )}>
      Live
    </div>
  )
}