import { NextRequest, NextResponse } from "next/server";
import { createCustomer, createSubscription } from "@/lib/diffflow/payjp-server";

export async function POST(req: NextRequest) {
  let body: { email?: string; token?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "リクエストの形式が不正です" }, { status: 400 });
  }

  const email = body.email?.trim();
  const token = body.token?.trim();

  if (!email || !token) {
    return NextResponse.json({ error: "メールアドレスとカード情報が必要です" }, { status: 400 });
  }

  const planId = process.env.PAYJP_PRO_PLAN_ID;
  if (!planId) {
    return NextResponse.json(
      { error: "サーバー側でPro プランが設定されていません(PAYJP_PRO_PLAN_ID)" },
      { status: 500 }
    );
  }

  try {
    const customer = await createCustomer(email, token);
    const subscription = await createSubscription(customer.id, planId);
    return NextResponse.json({
      subscriptionId: subscription.id,
      status: subscription.status,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "決済処理に失敗しました";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
