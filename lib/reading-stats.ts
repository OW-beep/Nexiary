// 「累計で読まれた回数」だけを表示するための実データ集計。
// Vercel Marketplace経由でUpstash Redisを接続すると自動的に環境変数が入り、有効化される。
// 未接続の間はAPIが静かに何もしない（AdSense/GA4と同じ「未設定なら出さない」方針）ので、
// この機能をオフのまま使っても壊れない。
//
// 数字を捏造しない、という方針をここで固定している：
// 累計閲覧数 views:{slug} は「本当にページを開いたセッション数」をINCRしたもの。

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

export async function recordView(slug: string): Promise<void> {
  await pipeline([["INCR", `views:${slug}`]]);
}

export async function getReadingStats(slug: string): Promise<{ views: number } | null> {
  const result = await pipeline([["GET", `views:${slug}`]]);
  if (!result) return null;
  const views = Number(result[0]?.result ?? 0) || 0;
  return { views };
}
