import type { Metadata } from "next";
import { Mail } from "lucide-react";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "お問い合わせ",
  alternates: { canonical: "/contact" },
};

const CONTACT_EMAIL = "nexiary.info@gmail.com";

export default function ContactPage() {
  return (
    <Container className="py-12">
      <Breadcrumbs items={[{ label: "ホーム", href: "/" }, { label: "お問い合わせ" }]} />
      <h1 className="mt-4 font-display text-3xl text-ink">お問い合わせ</h1>
      <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-ink-soft">
        取材・広告掲載・記事内容の誤りのご指摘などは、下記メールアドレスまでお願いいたします。
        件名に用件を書いていただけると確認が早くなります。いただいたメールアドレスは返信のためだけに使い、第三者に提供することはありません（詳細はプライバシーポリシーをご覧ください）。
      </p>
      <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-ink-soft">
        返信について：内容を確認のうえ、数日以内の返信を心がけています。営業目的の一斉送信など、内容によっては返信しない場合があります。
      </p>

      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="catalog-card mt-8 flex w-fit items-center gap-3 px-6 py-4 transition-colors hover:border-stamp"
      >
        <Mail size={18} className="text-stamp" strokeWidth={1.75} />
        <span className="font-mono text-sm text-ink">{CONTACT_EMAIL}</span>
      </a>
    </Container>
  );
}
