import { NextRequest, NextResponse } from "next/server";
import { recordHeartbeat } from "@/lib/reading-stats";

export async function POST(req: NextRequest) {
  try {
    const { slug, clientId } = (await req.json()) as {
      slug?: string;
      clientId?: string;
    };
    if (!slug || !clientId) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    await recordHeartbeat(slug, clientId);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
