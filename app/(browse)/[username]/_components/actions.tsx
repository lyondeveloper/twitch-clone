"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const onClick = () => {
    // useTransition hook para hacer el loading mucho mas facil
    startTransition(() => {
      if (!isFollowing) {
        onFollow(userId)
        .then((data) => toast.success(`You are now following ${data.following.username}`))
        .catch((e) => toast.error("Something went wrong"));
      } else {
        onUnfollow(userId)
          .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
          .catch((e) => toast.error("Something went wrong"))
      }
    });
  }

  return (
    <Button disabled={isPending} onClick={onClick} variant='primary'>
      {!isFollowing ? "Follow" : "Unfollow"}
    </Button>
  )
};

