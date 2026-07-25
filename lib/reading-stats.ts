// 「読まれている記事数」をリアルタイム表示するための実データ集計。
// Vercel Marketplace経由でUpstash Redisを接続すると自動的に環境変数が入り、有効化される。
// 未接続の間はAPIが静かに何もしない（AdSense/GA4と同じ「未設定なら出さない」方針）ので、
// この機能をオフのまま使っても壊れない。
//
// 数字を捏造しない、という方針をここで固定している：
// ・累計閲覧数 views:{slug} は「本当にページを開いたセッション数」をINCRしたもの
// ・現在読んでいる人数 active:{slug} は「直近30秒以内にハートビートが来たクライアント数」
//   （ZADDで時刻を記録し、ZCOUNTで直近分だけ数える。古いエントリはZREMRANGEBYSCOREで間引く）

const KV_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export const readingStatsEnabled = Boolean(KV_URL && KV_TOKEN);

type PipelineResult = { result: string | number | null }[];

async function pipeline(commands: (string | number)[][]): Promise<PipelineResult | null> {
  if (!readingStatsEnabled) return null;
  try {
    const res = await fetch(`${KV_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as PipelineResult;
  } catch {
    return null;
  }
}

const ACTIVE_WINDOW_MS = 30 * 1000; // これ以内のハートビートを「今読んでいる」と見なす
const ACTIVE_PRUNE_MS = 10 * 60 * 1000; // これより古い記録はZセットから間引く

export async function recordView(slug: string): Promise<void> {
  await pipeline([["INCR", `views:${slug}`]]);
}

export async function recordHeartbeat(slug: string, clientId: string): Promise<void> {
  const now = Date.now();
  const key = `active:${slug}`;
  await pipeline([
    ["ZADD", key, String(now), clientId],
    ["ZREMRANGEBYSCORE", key, "0", String(now - ACTIVE_PRUNE_MS)],
    ["EXPIRE", key, "600"],
  ]);
}

export async function getReadingStats(
  slug: string
): Promise<{ views: number; active: number } | null> {
  const now = Date.now();
  const result = await pipeline([
    ["GET", `views:${slug}`],
    ["ZCOUNT", `active:${slug}`, String(now - ACTIVE_WINDOW_MS), String(now)],
  ]);
  if (!result) return null;
  const views = Number(result[0]?.result ?? 0) || 0;
  const active = Number(result[1]?.result ?? 0) || 0;
  return { views, active };
}
