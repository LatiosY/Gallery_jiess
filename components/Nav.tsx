"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { T, useI18n } from "@/components/I18nProvider";

export default function Nav() {
  const { lang, toggleLang } = useI18n();
  const pathname = usePathname();

  const cleanupGalleryScroll = (href: string) => {
    if (pathname === href) return;
    window.dispatchEvent(new CustomEvent("gallery:cleanup-scroll"));
  };

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-md"
      style={{
        backgroundColor: "rgba(238, 247, 251, 0.88)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          onClick={() => cleanupGalleryScroll("/")}
          className="font-display text-base font-semibold tracking-[0.22em] transition-opacity hover:opacity-70"
          style={{ color: "var(--color-text)" }}
        >
          JIESS
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            onClick={() => cleanupGalleryScroll("/")}
            className="font-ui text-xs uppercase underline transition-colors"
            style={{
              color: "var(--color-text)",
              textDecorationColor: "var(--color-brass)",
              textUnderlineOffset: "5px",
            }}
          >
            <T zh="首页" en="Home" />
          </Link>
          <Link
            href="/gallery"
            onClick={(event) => {
              if (pathname === "/gallery") {
                event.preventDefault();
                return;
              }

              cleanupGalleryScroll("/gallery");
            }}
            className="font-ui text-xs uppercase underline transition-colors"
            style={{
              color: "var(--color-text)",
              textDecorationColor: "var(--color-brass)",
              textUnderlineOffset: "5px",
            }}
          >
            <T zh="作品" en="Gallery" />
          </Link>
          <button
            type="button"
            onClick={toggleLang}
            className="font-ui border px-2 py-1 text-xs uppercase transition-colors hover:bg-black/5"
            style={{
              borderColor: "var(--color-border-soft)",
              color: "var(--color-muted)",
            }}
            aria-label={lang === "zh" ? "Switch to English" : "切换到中文"}
          >
            {lang === "zh" ? "EN" : <span className="font-display">中文</span>}
          </button>
        </nav>
      </div>
    </header>
  );
}
