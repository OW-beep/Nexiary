import Link from "next/link";
import Container from "./Container";
import { siteConfig } from "@/lib/site-config";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/privacy-policy", label: "プライバシーポリシー" },
  { href: "/terms", label: "利用規約" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <Container className="grid gap-8 py-12 sm:grid-cols-2">
        <div>
          <p className="font-display text-xl">{siteConfig.name}</p>
          <p className="mt-2 max-w-sm font-body text-sm text-paper/70">
            {siteConfig.tagline}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <nav className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-body text-sm text-paper/70 transition-colors hover:text-paper"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="mt-4 font-mono text-xs text-paper/50">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
