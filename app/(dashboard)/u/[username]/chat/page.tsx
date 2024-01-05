import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import { ToggleCard } from "./_components/toggle-card";
import { useMemo } from "react";

const ChatPage = async () => {

  const self = await getSelf();
  const stream = await getStreamByUserId(self?.id || ''); 

  if (!stream) {
    throw new Error("Stream not found");
  }

  const fields = [
    {
      fieldId: 'isChatEnabled',
      label: 'Enabled Chat',
      value: stream.isChatEnabled,
    },
    {
      fieldId: 'isChatDelayed',
      label: 'Delay Chat',
      value: stream.isChatDelayed,
    },
    {
      fieldId: 'isChatFollowersOnly',
      label: 'Must be following to chat',
      value: stream.isChatFollowersOnly,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          Chat Settings
        </h1>
      </div>

      <div className="space-y-4">
        {fields.map(({ fieldId, value, label }) => (
          <ToggleCard
            key={fieldId}
            field={fieldId}
            label={label}
            value={value}
          />
        ))}
      </div>
    </div>
  )
}

export default ChatPage;
