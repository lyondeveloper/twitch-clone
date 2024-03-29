'use client';

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}

export const Actions = ({
  hostIdentity,
  isFollowing,
  isHost
}: ActionsProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { userId } = useAuth();

  const toggleFollow = () => {
    if (!userId) {
      return router.push('/sign-in');
    }

    if (isHost) return;
    startTransition
    if (isFollowing) {
      startTransition(() => {
        onUnfollow(hostIdentity).then((data) => toast.success(`You have stopped following ${data.following.username}`)).catch(() => toast.error('Something went wrong'))
      })
    } else {
      startTransition(() => {
        onFollow(hostIdentity).then((data) => toast.success(`You are now following ${data.following.username}`)).catch(() => toast.error('Something went wrong'))
      })
    }
  };

  return (
    <Button onClick={toggleFollow} disabled={isPending || isHost} variant='primary' size='sm' className="w-full lg:w-auto">
      <Heart className={cn(
        "h-4 w-4 mr-2",
        isFollowing ? 'fill-white' : 'fill-none'
      )} />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  )
};

export const ActionsSkeleton = () => (
  <Skeleton className="h-10 w-full lg:w-24" />
)