import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import { getAllEnglishPosts } from "@/lib/posts-en";

export const metadata: Metadata = {
  title: { absolute: "Nexiary (English) | Gadget guides and buying tips from Japan" },
  description:
    "English guides from Nexiary, a Japanese gadget site: flight rules for power banks in Japan, buying guides for mouse skates, and news on new gadgets launching in Japan.",
  alternates: { canonical: "/en", languages: { en: "/en", ja: "/" } },
};

export default function EnglishHome() {
  const posts = getAllEnglishPosts();
  return (
    <Container className="py-12">
      <h1 className="font-display text-3xl text-ink">Nexiary (English)</h1>
      <p className="mt-3 max-w-2xl font-body text-base text-ink-soft">
        Gadget guides, buying tips and new-product news from Japan. These pages are written from
        public information such as manufacturers&apos; announcements and official rules, and each
        article says where its information comes from.
      </p>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {posts.map((p) => (
          <li key={p.slug} className="catalog-card p-5">
            <h2 className="font-display text-lg leading-snug text-ink">
              <Link href={`/en/posts/${p.slug}`} className="hover:text-stamp">
                {p.frontmatter.title}
              </Link>
            </h2>
            <p className="mt-2 line-clamp-3 font-body text-sm text-ink-soft">
              {p.frontmatter.description}
            </p>
            <p className="mt-4 font-mono text-xs text-ink-soft/70">
              {p.frontmatter.updated ?? p.frontmatter.date}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-10 font-body text-sm text-ink-soft">
        <Link href="/" className="text-stamp hover:underline">
          日本語版はこちら
        </Link>
      </p>
    </Container>
  );
}
