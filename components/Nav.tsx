"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { T, useI18n } from "@/components/I18nProvider";

export default function Nav() {
  const pathname = usePathname();
  const { lang, toggleLang } = useI18n();

  const links = [
    { href: "/", label: <T zh="作品" en="Works" /> },
    { href: "/about", label: <T zh="关于" en="About" /> },
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-base font-normal tracking-tight transition-opacity hover:opacity-60"
          style={{ color: "var(--color-text)" }}
        >
          Jiess
        </Link>

        <nav className="flex items-center gap-6">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="font-ui text-sm transition-opacity hover:opacity-60"
                style={{
                  color: active ? "var(--color-text)" : "var(--color-muted)",
                  textDecoration: active ? "underline" : "none",
                  textUnderlineOffset: "4px",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={toggleLang}
            className="font-ui text-sm transition-opacity hover:opacity-60"
            style={{ color: "var(--color-muted)" }}
            aria-label={lang === "zh" ? "Switch to English" : "切换到中文"}
          >
            {lang === "zh" ? "EN" : "中文"}
          </button>
        </nav>
      </div>
    </header>
  );
}
