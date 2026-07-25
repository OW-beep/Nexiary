import { NextRequest, NextResponse } from "next/server";
import { recordView } from "@/lib/reading-stats";

export async function POST(req: NextRequest) {
  try {
    const { slug } = (await req.json()) as { slug?: string };
    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    await recordView(slug);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
