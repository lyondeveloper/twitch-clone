import { db } from "@/lib/db";
import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const receiver = new WebhookReceiver(process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_API_SECRET!);

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = headers();
  const auth = headerPayload.get('Authorization');
  console.log('data ==>>', { body, headerPayload, auth });
  if (!auth) {
    return new NextResponse("No authorization header", { status: 400 });
  }

  const event = receiver.receive(body, auth);

  if (event.event === 'ingress_started') {
    await db.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId
      }, 
      data: {
        isLive: true,
      }
    });
  }

  if (event.event === 'ingress_ended') {
    await db.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId
      }, 
      data: {
        isLive: false,
      }
    });
  }

  return NextResponse.json({ success: true });
}