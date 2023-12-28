import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LiveBadge } from "./ui/live-badge";

const avatarSizes = cva(
  "",
  { 
    variants: {
      size: {
        default: 'h-8 w-8',
        lg: 'h-14 w-14',
      },
    },
    defaultVariants: {
      size: 'default',
    }
  }
);

interface UserAvatar 
  extends VariantProps<typeof avatarSizes> {
  username: string;
  isLive?: boolean;
  imageUrl: string;
  showBadge?: boolean;
}

export const UserAvatar = ({ isLive, imageUrl, username, showBadge, size }: UserAvatar) => {
  const canShowBadge = showBadge && isLive;
  return (
    <div className="relative">
      <Avatar className={(cn(
        isLive && 'ring-2 ring-rose-500 border border-background',
        avatarSizes({ size })
      ))}>
        <AvatarImage src={imageUrl} className="object-hover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  )
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {};

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
  return (
    <Skeleton className={cn(
      'rounded-full',
      avatarSizes({ size }),
    )} />
  )
}