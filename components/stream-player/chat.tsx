'use client'

import { ChatVariant, useChatSidebar } from "@/store/useChatSidebar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatCommunity } from "./chat-community";

interface ChatProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatFollowersOnly: boolean;
  isChatDelayed: boolean;
}

export const Chat = ({
  hostIdentity,
  hostName,
  viewerName,
  isChatDelayed,
  isChatEnabled,
  isChatFollowersOnly,
  isFollowing
}: ChatProps) => {

  const matches = useMediaQuery('(max-width: 1024px)');
  const { variant, onExpand } = useChatSidebar((state) => state);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState('');

  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue('');
  }

  const onChange = (value: string) => {
    setValue(value);
  }

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList
            messages={reversedMessages}
            isHidden={isHidden}
          />
          <ChatForm 
            onChange={onChange}
            isHidden={isHidden}
            value={value}
            onSubmit={onSubmit}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}

      {variant === ChatVariant.COMMUNITY && (
        <ChatCommunity
          isHidden={isHidden}
          viewerName={viewerName}
          hostName={hostName}
        />
      )}
    </div>
  )
};

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col border-l border-b pt-0 border-2 h-[calc(100vh - 80px)]">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
};
