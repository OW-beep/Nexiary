"use client";

const STORAGE_KEY = "diffflow:license";

export type LicenseState = {
  subscriptionId: string;
  active: boolean;
  status: string;
  checkedAt: number;
};

export function loadLicense(): { subscriptionId: string } | null {
  if (typeof window === "undefined") return null;
  const id = window.localStorage.getItem(STORAGE_KEY);
  return id ? { subscriptionId: id } : null;
}

export function saveLicense(subscriptionId: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, subscriptionId);
}

export function clearLicense() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

/** サーバー(PAY.JP)に問い合わせて、このサブスクリプションが有効かどうかを確認する */
export async function verifyLicense(subscriptionId: string): Promise<{ active: boolean; status: string }> {
  try {
    const res = await fetch(`/api/diffflow/verify?id=${encodeURIComponent(subscriptionId)}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return { active: Boolean(data.active), status: data.status ?? "unknown" };
  } catch {
    return { active: false, status: "network_error" };
  }
}
