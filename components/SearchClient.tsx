"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

interface SearchItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  date: string;
  tags: string[];
}

export default function SearchClient({
  items,
  initialQuery = "",
}: {
  items: SearchItem[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return items.filter((item) =>
      [item.title, item.description, item.categoryLabel, ...item.tags]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query, items]);

  return (
    <div>
      <div className="flex items-center gap-2 rounded-card border border-line bg-paper-card px-4 py-3">
        <Search size={16} className="text-ink-soft" strokeWidth={1.75} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="キーワードを入力（例：ChatGPT、VPN、Switch）"
          className="w-full bg-transparent font-body text-sm text-ink outline-none placeholder:text-ink-soft/60"
          autoFocus
        />
      </div>

      {query.trim() && (
        <p className="mt-4 font-mono text-xs text-ink-soft">{results.length}件ヒット</p>
      )}

      <ul className="mt-4 flex flex-col gap-3">
        {results.map((item) => (
          <li key={item.slug} className="catalog-card p-4">
            <Link href={`/posts/${item.slug}`} className="flex flex-col gap-1">
              <span className="index-tab w-fit">{item.categoryLabel}</span>
              <span className="font-display text-base text-ink hover:text-stamp">
                {item.title}
              </span>
              <span className="line-clamp-1 font-body text-sm text-ink-soft">
                {item.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
