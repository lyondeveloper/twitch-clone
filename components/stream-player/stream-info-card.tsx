'use client';

import { Pencil } from "lucide-react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { StreamInfoModal } from "./stream-info-modal";

interface StreamInfoCardProps {
  hostIdentity: string;
  thumbnailUrl: string | null;
  name: string;
  viewerIdentity: string;
}

export const StreamInfoCard = ({ hostIdentity, thumbnailUrl, name, viewerIdentity }: StreamInfoCardProps) => {
  const hostAsViewer = `host/${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;
  
  if (!isHost) {
    return null;
  }

  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="rounded-md bg-blue-600 p-2 h-auto w-auto">
            <Pencil className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm lg:text-lg font-semibold capitalize">
              Edit your stream information
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Maximize your visibility
            </p>
          </div>
          <StreamInfoModal 
            initialName={name}
            initialThumbnailUrl={thumbnailUrl}
          />
        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">
              Name
            </h3>
            <p className="text-sm font-semibold">
              {name}
            </p>
          </div>
          

          <div>
            <h3 className="text-sm text-muted-foreground mb-2">
              Thumbnail
            </h3>
            <p className="text-sm font-semibold">
              {thumbnailUrl && (
                <div className="relative aspect-video rounded-mb overflowphidden w-[200px] border border-white/10">
                  <Image
                    className="object-cover"
                    fill
                    src={thumbnailUrl}
                    alt={name}
                  />
                </div>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}