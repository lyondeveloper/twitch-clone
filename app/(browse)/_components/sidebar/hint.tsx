import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HintProps {
  label: string;
  children: React.ReactNode;
  asChild?: boolean;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'end' | 'center'
}

export const Hint = ({ label, asChild, children, side, align }: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>
          {children}
        </TooltipTrigger>
        <TooltipContent className="text-black bg-white" side={side} align={align}>
          <p className="font-semibold">
            {label}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

