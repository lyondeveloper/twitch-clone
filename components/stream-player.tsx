'use client';

import { useViewerToken } from "@/hooks/useViewerToken";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from '@livekit/components-react';

interface StreamPlayerProps {
  user: User & { stream: Stream | null; };
  stream: Stream;
  isFollowing: boolean;
}

export const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
  const {
    token, 
    name,
    identity
  } = useViewerToken(user.id);

  if (!token || !name || !identity) {
    return (
      <div>
        Cannot watch the stream
      </div>
    )
  } 

  return (
    <div>allowed to watch the stream</div>
  )
}