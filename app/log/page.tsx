import type { Metadata } from "next";
import Container from "@/components/Container";
import { siteConfig } from "@/lib/site-config";
import { operationLog } from "@/lib/operation-log";

export const metadata: Metadata = {
  title: "館内日誌",
  description: `${siteConfig.name}の裏側の記録。サイトに何を、いつ、なぜ加えたのかをそのまま公開しています。`,
  alternates: { canonical: "/log" },
};

const tagStyle: Record<string, string> = {
  受入: "bg-moss-light text-moss",
  改装: "bg-stamp/10 text-stamp",
  収益: "bg-stamp/10 text-stamp",
  整理: "bg-moss-light text-moss",
  お知らせ: "bg-line/60 text-ink-soft",
};

export default function OperationLogPage() {
  return (
    <Container className="py-14">
      <span className="index-tab">館内日誌</span>
      <h1 className="mt-4 font-display text-3xl text-ink">裏側の記録</h1>
      <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-ink-soft">
        {siteConfig.name}に何を、いつ、なぜ加えたのか。良かったことも、まだ手が回っていないことも、
        図書館の受入台帳のようにそのまま記録していきます。
      </p>

      <ol className="relative mt-10 flex flex-col gap-6 border-l border-line pl-6">
        {operationLog.map((entry) => (
          <li key={entry.date + entry.title} className="catalog-card relative p-5">
            <span className="absolute -left-[31px] top-6 h-2 w-2 rounded-full bg-stamp" />
            <div className="flex flex-wrap items-center gap-3">
              <time dateTime={entry.date} className="font-mono text-xs text-ink-soft">
                {entry.date}
              </time>
              <span className={`index-tab ${tagStyle[entry.tag] ?? ""}`}>{entry.tag}</span>
            </div>
            <h2 className="mt-3 font-display text-lg text-ink">{entry.title}</h2>
            <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{entry.body}</p>
          </li>
        ))}
      </ol>
    </Container>
  );
}
