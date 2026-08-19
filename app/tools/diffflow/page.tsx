import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import DiffFlowApp from "@/components/tools/diffflow/DiffFlowApp";

export const metadata: Metadata = {
  title: "DiffFlow｜Excelの差分比較を自動化",
  description:
    "2つのExcel/CSVを読み込むだけで、追加・削除・変更を自動検出。ファイルはブラウザ内で処理され、サーバーには送信されません。",
  alternates: { canonical: "/tools/diffflow" },
};

export default function DiffFlowPage() {
  return (
    <Container className="py-12">
      <Breadcrumbs
        items={[
          { label: "ホーム", href: "/" },
          { label: "ツール", href: "/tools" },
          { label: "DiffFlow" },
        ]}
      />

      <div className="mt-4 max-w-2xl">
        <span className="index-tab">TOOL</span>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          毎月のExcel比較、
          <br className="sm:hidden" />
          まだ目視していますか？
        </h1>
        <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
          DiffFlowは、新旧2つのExcel・CSVを入れるだけで追加・削除・変更を自動で照合するツールです。
          ファイルは一切サーバーへ送信されず、すべてこのページ内(ブラウザ)だけで完結します。
        </p>
      </div>

      <div className="mt-10">
        <DiffFlowApp />
      </div>
    </Container>
  );
}
