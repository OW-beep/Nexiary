import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard from "@/components/PostCard";
import AdSlot from "@/components/AdSlot";
import AffiliateCard from "@/components/AffiliateCard";
import FloatingAffiliateBar from "@/components/FloatingAffiliateBar";
import FaqSection from "@/components/FaqSection";
import RankingList from "@/components/mdx/RankingList";
import AncWaveDiagram from "@/components/mdx/AncWaveDiagram";
import SpecBarChart from "@/components/mdx/SpecBarChart";
import PenTabletDiagram from "@/components/mdx/PenTabletDiagram";
import ResponseTimeDiagram from "@/components/mdx/ResponseTimeDiagram";
import BackupRuleDiagram from "@/components/mdx/BackupRuleDiagram";
import PostureDiagram from "@/components/mdx/PostureDiagram";
import FocusDipChart from "@/components/mdx/FocusDipChart";
import TwoColumnCompare from "@/components/mdx/TwoColumnCompare";
import ControllerGripDiagram from "@/components/mdx/ControllerGripDiagram";
import EarFitDiagram from "@/components/mdx/EarFitDiagram";
import RewardScheduleChart from "@/components/mdx/RewardScheduleChart";
import DomainStructureDiagram from "@/components/mdx/DomainStructureDiagram";
import MailForwardDiagram from "@/components/mdx/MailForwardDiagram";
import PageSpeedBounceDiagram from "@/components/mdx/PageSpeedBounceDiagram";
import SignalCongestionDiagram from "@/components/mdx/SignalCongestionDiagram";
import UpscaleDiagram from "@/components/mdx/UpscaleDiagram";
import RecordFlowDiagram from "@/components/mdx/RecordFlowDiagram";
import AntivirusWeightDiagram from "@/components/mdx/AntivirusWeightDiagram";
import BeaconNetworkDiagram from "@/components/mdx/BeaconNetworkDiagram";
import RefurbishFlowDiagram from "@/components/mdx/RefurbishFlowDiagram";
import FreezerSpaceDiagram from "@/components/mdx/FreezerSpaceDiagram";
import DataRecoveryDiagram from "@/components/mdx/DataRecoveryDiagram";
import ColorSwatchDiagram from "@/components/mdx/ColorSwatchDiagram";
import SittingTimeChart from "@/components/mdx/SittingTimeChart";
import LaserEngraveDiagram from "@/components/mdx/LaserEngraveDiagram";
import FlowStateChart from "@/components/mdx/FlowStateChart";
import SelfHostVsRentalDiagram from "@/components/mdx/SelfHostVsRentalDiagram";
import PhotocatalystDiagram from "@/components/mdx/PhotocatalystDiagram";
import VirtualizationDiagram from "@/components/mdx/VirtualizationDiagram";
import ReviewTrustDiagram from "@/components/mdx/ReviewTrustDiagram";
import { siteConfig } from "@/lib/site-config";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";

const mdxComponents = {
  AffiliateCard,
  RankingList,
  AncWaveDiagram,
  SpecBarChart,
  PenTabletDiagram,
  ResponseTimeDiagram,
  BackupRuleDiagram,
  PostureDiagram,
  FocusDipChart,
  TwoColumnCompare,
  ControllerGripDiagram,
  EarFitDiagram,
  RewardScheduleChart,
  DomainStructureDiagram,
  MailForwardDiagram,
  PageSpeedBounceDiagram,
  SignalCongestionDiagram,
  UpscaleDiagram,
  RecordFlowDiagram,
  AntivirusWeightDiagram,
  BeaconNetworkDiagram,
  RefurbishFlowDiagram,
  FreezerSpaceDiagram,
  DataRecoveryDiagram,
  ColorSwatchDiagram,
  SittingTimeChart,
  LaserEngraveDiagram,
  FlowStateChart,
  SelfHostVsRentalDiagram,
  PhotocatalystDiagram,
  VirtualizationDiagram,
  ReviewTrustDiagram,
};

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: { canonical: `/posts/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      publishedTime: post.frontmatter.date,
      images: post.frontmatter.cover ? [post.frontmatter.cover] : undefined,
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post || post.frontmatter.draft) notFound();

  const categoryLabel =
    siteConfig.categories.find((c) => c.slug === post.frontmatter.category)?.label ??
    post.frontmatter.category;
  const related = getRelatedPosts(post);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    author: { "@type": "Organization", name: siteConfig.name },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryLabel,
        item: `${siteConfig.url}/category/${post.frontmatter.category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.frontmatter.title,
        item: `${siteConfig.url}/posts/${post.slug}`,
      },
    ],
  };

  const faqJsonLd = post.frontmatter.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.frontmatter.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

  return (
    <Container className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Breadcrumbs
        items={[
          { label: "ホーム", href: "/" },
          { label: categoryLabel, href: `/category/${post.frontmatter.category}` },
          { label: post.frontmatter.title },
        ]}
      />

      <article className={`mt-6 max-w-3xl ${post.frontmatter.floatingAd ? "pb-20" : ""}`}>
        <span className="index-tab">{categoryLabel}</span>
        <h1 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
          {post.frontmatter.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs text-ink-soft">
          <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
          <div className="flex gap-2">
            {post.frontmatter.tags?.map((t) => (
              <a key={t} href={`/tag/${encodeURIComponent(t)}`} className="hover:text-stamp">
                #{t}
              </a>
            ))}
          </div>
        </div>

        <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-headings:text-ink prose-a:text-stamp prose-img:rounded-card">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              // content/posts配下は自分で書いた記事のみを置く前提（第三者の投稿は受け付けない）。
              // RankingList等のコンポーネントにJS式（配列props）を渡すためblockJS:falseにしつつ、
              // blockDangerousJS（デフォルトtrue）でeval/require等の危険なグローバルは引き続きブロックする。
              blockJS: false,
            }}
          />
        </div>

        <AdSlot slot="1234567890" />
      </article>

      {related.length > 0 && (
        <section className="mt-14 max-w-3xl">
          <h2 className="font-display text-xl text-ink">関連記事</h2>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </ul>
        </section>
      )}

      {post.frontmatter.faq && <FaqSection items={post.frontmatter.faq} />}

      {post.frontmatter.floatingAd && <FloatingAffiliateBar {...post.frontmatter.floatingAd} />}
    </Container>
  );
}
