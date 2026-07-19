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
      <p className="mt-4 max-w-xl font-body text-sm text-ink-soft">
        取材・広告掲載・記事内容に関するご連絡は、下記メールアドレスまでお願いいたします。
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
