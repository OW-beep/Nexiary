// 記事末尾に共通で表示する「この記事を書いた人」。顔出し・実名は不要、
// 「実際に試している」という一貫した姿勢だけを短く伝える。
// 全記事に自動で出すため、page.tsx側で <AuthorBio /> として呼び出す。
export default function AuthorBio() {
  return (
    <div className="not-prose catalog-card mt-12 flex items-start gap-4 p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-moss-light font-display text-lg text-moss">
        N
      </div>
      <div>
        <p className="font-display text-sm text-ink">この記事を書いた人</p>
        <p className="mt-1.5 font-body text-sm leading-relaxed text-ink-soft">
          Webサービス・AI・ガジェットを実際に試しながら、「結局これって必要？」を検証しています。良かった点だけでなく、気になった点もそのまま書くようにしています。
        </p>
      </div>
    </div>
  );
}
