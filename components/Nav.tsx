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
      className="fixed left-0 right-0 top-0 z-50 border-b-[4px]"
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto flex h-[57px] max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          onClick={() => cleanupGalleryScroll("/")}
          className="font-display brutal-button brutal-button-active px-3 py-2 text-base leading-none tracking-[-0.04em] sm:px-4"
        >
          JIESS
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            onClick={() => cleanupGalleryScroll("/")}
            className="font-ui brutal-button px-3 py-2 text-[0.68rem] leading-none sm:px-4"
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
            className="font-ui brutal-button px-3 py-2 text-[0.68rem] leading-none sm:px-4"
          >
            <T zh="作品" en="Gallery" />
          </Link>
          <button
            type="button"
            onClick={toggleLang}
            className="font-ui brutal-button px-3 py-2 text-[0.68rem] leading-none"
            aria-label={lang === "zh" ? "Switch to English" : "切换到中文"}
          >
            {lang === "zh" ? "EN" : <span className="font-display">中文</span>}
          </button>
        </nav>
      </div>
    </header>
  );
}
