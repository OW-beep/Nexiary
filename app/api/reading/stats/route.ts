import { NextRequest, NextResponse } from "next/server";
import { getReadingStats } from "@/lib/reading-stats";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ ok: false }, { status: 400 });

  const stats = await getReadingStats(slug);
  if (!stats) {
    // 未接続の場合は「無効」を明示して返す。フロント側はこれを見て何も表示しない。
    return NextResponse.json({ ok: true, enabled: false, views: null });
  }
  return NextResponse.json({ ok: true, enabled: true, ...stats });
}
