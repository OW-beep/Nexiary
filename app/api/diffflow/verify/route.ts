import { NextRequest, NextResponse } from "next/server";
import { getSubscription } from "@/lib/diffflow/payjp-server";

const ACTIVE_STATUSES = new Set(["trial", "active"]);

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id")?.trim();
  if (!id) {
    return NextResponse.json({ active: false, error: "idが必要です" }, { status: 400 });
  }

  try {
    const subscription = await getSubscription(id);
    const active = ACTIVE_STATUSES.has(subscription.status);
    return NextResponse.json({ active, status: subscription.status });
  } catch (e) {
    // 存在しないID・削除済みなども含めて「無効」として返す(エラー詳細はログのみ)
    return NextResponse.json({ active: false, status: "not_found" });
  }
}
