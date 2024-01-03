"use client";

import { onBlock } from "@/actions/block";
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
  const handleFollow = () => {
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

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) => toast.success(`Blocked the user ${data.blocked.username}`))
        .catch((error) => toast.error("Something went wrong"))
    });
  }

  return (
    <>
      <Button disabled={isPending} onClick={handleFollow} variant='primary'>
        {!isFollowing ? "Follow" : "Unfollow"}
      </Button>
      <Button onClick={handleBlock} disabled={isPending}>
        Block
      </Button>
    </>
  )
};

