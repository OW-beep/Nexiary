// サーバー専用。PAYJP_SECRET_KEY を使ってPAY.JPのREST APIを呼ぶ薄いラッパー。
// クライアントコンポーネントから直接importしないこと(このファイルはAPI Routeからのみ呼ぶ)。

const PAYJP_API_BASE = "https://api.pay.jp/v1";

function authHeader(): string {
  const secret = process.env.PAYJP_SECRET_KEY;
  if (!secret) {
    throw new Error("サーバーにPAYJP_SECRET_KEYが設定されていません");
  }
  return "Basic " + Buffer.from(`${secret}:`).toString("base64");
}

async function payjpFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${PAYJP_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/x-www-form-urlencoded",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) {
    const message = data?.error?.message ?? `PAY.JP APIエラー(${res.status})`;
    throw new Error(message);
  }
  return data;
}

export type PayjpCustomer = { id: string; email: string | null };
export type PayjpSubscription = {
  id: string;
  status: string; // "trial" | "active" | "canceled" | "paused" | "unpaid" など
  customer: string;
  plan: { id: string };
  current_period_end?: number;
};

export async function createCustomer(email: string, cardToken: string): Promise<PayjpCustomer> {
  const body = new URLSearchParams({
    email,
    card: cardToken,
    description: "DiffFlow Pro",
  });
  return payjpFetch("/customers", { method: "POST", body });
}

export async function createSubscription(customerId: string, planId: string): Promise<PayjpSubscription> {
  const body = new URLSearchParams({ customer: customerId, plan: planId });
  return payjpFetch("/subscriptions", { method: "POST", body });
}

export async function getSubscription(subscriptionId: string): Promise<PayjpSubscription> {
  return payjpFetch(`/subscriptions/${encodeURIComponent(subscriptionId)}`, { method: "GET" });
}

export async function cancelSubscription(subscriptionId: string): Promise<PayjpSubscription> {
  return payjpFetch(`/subscriptions/${encodeURIComponent(subscriptionId)}/cancel`, { method: "POST" });
}
