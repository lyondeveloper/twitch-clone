'use client';

import { useViewerToken } from "@/hooks/useViewerToken";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from '@livekit/components-react';
import { useChatSidebar } from "@/store/useChatSidebar";
import { cn } from "@/lib/utils";
import { Video, VideoSkeleton } from "./video";
import { Chat, ChatSkeleton } from "./chat";
import { ChatToggle } from "./chat-toggle";
import { StreamHeader, StreamHeaderSkeleton } from "./stream-header";
import { StreamInfoCard } from "./stream-info-card";
import { StreamAboutCard } from "./stream-about-card";

interface StreamPlayerProps {
  user: User & { 
    stream: Stream | null;
    _count: { followedBy: number; };
  };
  stream: Stream;
  isFollowing: boolean;
}

export const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
  const {
    token, 
    name,
    identity
  } = useViewerToken(user.id);

  const { collapsed } = useChatSidebar((state) => state);

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />
  } 

  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed right-2 z-50 top-[100px]">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-2 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video 
            hostName={user.username}
            hostIdentity={user.id}
          />
          <StreamHeader
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <StreamInfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
          <StreamAboutCard 
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={user._count.followedBy}
          />      
        </div>
        <div className={cn(
          "col-span-1",
          collapsed && 'hidden'
        )}>
          <Chat
            viewerName={name}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            hostName={user.username}
            hostIdentity={user.id}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  )
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-2 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <StreamHeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  )
}
