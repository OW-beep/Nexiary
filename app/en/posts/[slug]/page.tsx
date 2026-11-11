import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Container from "@/components/Container";
import ProductCardEn from "@/components/en/ProductCardEn";
import { siteConfig } from "@/lib/site-config";
import { getAllEnglishPosts, getEnglishPostBySlug } from "@/lib/posts-en";

const mdxComponents = { ProductCardEn };

export function generateStaticParams() {
  return getAllEnglishPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getEnglishPostBySlug(params.slug);
  if (!post) return {};
  const languages: Record<string, string> = { en: `/en/posts/${post.slug}` };
  if (post.frontmatter.jaSlug) languages.ja = `/posts/${post.frontmatter.jaSlug}`;
  return {
    title: { absolute: post.frontmatter.title },
    description: post.frontmatter.description,
    alternates: { canonical: `/en/posts/${post.slug}`, languages },
    openGraph: {
      type: "article",
      url: `/en/posts/${post.slug}`,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updated ?? post.frontmatter.date,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    },
  };
}

export default function EnglishPostPage({ params }: { params: { slug: string } }) {
  const post = getEnglishPostBySlug(params.slug);
  if (!post) notFound();
  const fm = post.frontmatter;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    description: fm.description,
    inLanguage: "en",
    datePublished: fm.date,
    dateModified: fm.updated ?? fm.date,
    mainEntityOfPage: `${siteConfig.url}/en/posts/${post.slug}`,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
  const faqJsonLd = fm.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: "en",
        mainEntity: fm.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <Container className="py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <nav className="font-body text-sm text-ink-soft">
        <Link href="/en" className="hover:text-stamp">
          Nexiary (English)
        </Link>
      </nav>

      <article className="mx-auto mt-6 max-w-3xl">
        <h1 className="font-display text-3xl leading-tight text-ink">{fm.title}</h1>
        <p className="mt-3 font-mono text-xs text-ink-soft/70">
          Published {fm.date}
          {fm.updated && fm.updated !== fm.date ? ` · Updated ${fm.updated}` : ""}
        </p>

        <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-headings:text-ink prose-a:text-stamp">
          <MDXRemote source={post.content} components={mdxComponents} options={{ blockJS: false }} />
        </div>

        {fm.faq && fm.faq.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-xl text-ink">FAQ</h2>
            <div className="mt-5 flex flex-col gap-3">
              {fm.faq.map((item) => (
                <div key={item.q} className="catalog-card p-5">
                  <p className="font-body text-sm font-semibold text-ink">Q. {item.q}</p>
                  <p className="mt-2 font-body text-sm text-ink-soft">A. {item.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <p className="mt-12 border-t border-line pt-6 font-body text-xs text-ink-soft/80">
          Disclosure: some links on this site may be affiliate links. If you buy through them, Nexiary
          may earn a commission at no extra cost to you. This article is based on public information
          (manufacturers&apos; announcements, official rules and news reports), not on hands-on
          testing, unless it says otherwise. Prices, specifications and rules can change, so please
          check the official sources before you buy or travel.
        </p>
        {fm.jaSlug && (
          <p className="mt-4 font-body text-sm">
            <Link href={`/posts/${fm.jaSlug}`} className="text-stamp hover:underline">
              日本語版を読む →
            </Link>
          </p>
        )}
      </article>
    </Container>
  );
}
