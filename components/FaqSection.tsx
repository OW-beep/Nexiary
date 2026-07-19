interface FaqItem {
  q: string;
  a: string;
}

export default function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section className="mt-14 max-w-3xl">
      <h2 className="font-display text-xl text-ink">よくある質問</h2>
      <div className="mt-5 flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.q} className="catalog-card p-5">
            <p className="font-body text-sm font-semibold text-ink">Q. {item.q}</p>
            <p className="mt-2 font-body text-sm text-ink-soft">A. {item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
