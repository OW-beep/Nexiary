import { NextRequest, NextResponse } from "next/server";
import { cancelSubscription } from "@/lib/diffflow/payjp-server";

export async function POST(req: NextRequest) {
  let body: { subscriptionId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "リクエストの形式が不正です" }, { status: 400 });
  }

  const subscriptionId = body.subscriptionId?.trim();
  if (!subscriptionId) {
    return NextResponse.json({ error: "ライセンスキー（サブスクリプションID）が必要です" }, { status: 400 });
  }

  try {
    const subscription = await cancelSubscription(subscriptionId);
    return NextResponse.json({ status: subscription.status, canceled: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "解約処理に失敗しました";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
