import Link from "next/link";
import type { Metadata } from "next";
import { T } from "@/components/I18nProvider";

export const metadata: Metadata = {
  title: "About — Jiess",
};

export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <Link
        href="/"
        className="font-ui mb-10 inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-60"
        style={{ color: "var(--color-muted)" }}
      >
        <span>←</span>
        <span>
          <T zh="全部作品" en="All works" />
        </span>
      </Link>

      {/* Portrait placeholder */}
      <div
        className="mb-12 overflow-hidden"
        style={{
          backgroundColor: "var(--color-surface)",
          width: "180px",
          height: "180px",
        }}
      >
        <img
          src="/images/about/portrait.jpg"
          alt="Jiess"
          className="h-full w-full object-cover"
        />
      </div>

      <div
        className="mb-10 border-b pb-10"
        style={{ borderColor: "var(--color-border)" }}
      >
        <p
          className="font-ui mb-3 text-xs tracking-[0.25em] uppercase"
          style={{ color: "var(--color-muted)" }}
        >
          <T zh="关于" en="About" />
        </p>
        <h1
          className="font-display text-4xl font-normal sm:text-5xl"
          style={{ color: "var(--color-text)" }}
        >
          Jiess
        </h1>
      </div>

      <div className="space-y-5 font-ui text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
        <p>
          <T zh="自我介绍。" en="artist statement." />
        </p>
      </div>

      {/* Contact */}
      <div
        className="mt-12 border-t pt-12"
        style={{ borderColor: "var(--color-border)" }}
      >
        <p
          className="font-ui mb-4 text-xs tracking-[0.25em] uppercase"
          style={{ color: "var(--color-muted)" }}
        >
          <T zh="联系" en="Contact" />
        </p>
        <div className="font-ui flex flex-col gap-2 text-sm">
          <a
            href="mailto:lyz475223863@hotmail.com"
            className="transition-opacity hover:opacity-60"
            style={{ color: "var(--color-text)" }}
          >
            lyz475223863@hotmail.com
          </a>
          <a
            href="https://www.mihuashi.com/profiles/8237329"
            target="_blank"
            rel="noreferrer"
            className="transition-opacity hover:opacity-60"
            style={{ color: "var(--color-text)" }}
          >
            Mihuashi ↗
          </a>
        </div>
      </div>
    </div>
  );
}
