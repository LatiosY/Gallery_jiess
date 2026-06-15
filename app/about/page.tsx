import Link from "next/link";
import type { Metadata } from "next";
import { T } from "@/components/I18nProvider";

export const metadata: Metadata = {
  title: "About — Jiess",
};

export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="font-ui brutal-button mb-8 inline-flex items-center gap-2 px-4 py-3 text-xs"
      >
        <span>←</span>
        <span>
          <T zh="返回首页" en="Back home" />
        </span>
      </Link>

      <div className="grid gap-8 md:grid-cols-[220px_1fr] md:items-start">
        {/* Portrait */}
        <div className="brutal-frame relative aspect-square overflow-hidden">
          <img
            src="/images/about/portrait.jpg"
            alt="Jiess"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="brutal-panel p-6 sm:p-8">
          <p className="brass-label font-ui mb-5 text-xs">
            <T zh="关于" en="About" />
          </p>
          <h1 className="font-display text-6xl font-black uppercase leading-none sm:text-8xl">
            Jiess
          </h1>

          <div className="mt-8 border-l-[6px] py-1 pl-5 text-base font-black leading-7" style={{ borderColor: "var(--color-accent)", color: "var(--color-muted)" }}>
            <p>
              <T zh="自我介绍。" en="artist statement." />
            </p>
          </div>

          {/* Contact */}
          <div className="font-ui mt-10 flex flex-col gap-4 text-xs sm:flex-row">
            <a
              href="mailto:lyz475223863@hotmail.com"
              className="brutal-button px-4 py-3"
            >
              Email
            </a>
            <a
              href="https://www.mihuashi.com/profiles/8237329"
              target="_blank"
              rel="noreferrer"
              className="brutal-button brutal-button-active px-4 py-3"
            >
              <T zh="米画师 ↗" en="Mihuashi ↗" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
