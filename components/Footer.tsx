"use client";

import { T } from "@/components/I18nProvider";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/gallery") {
    return null;
  }

  return (
    <footer
      className="mt-24 border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 sm:flex-row">
        <span className="font-ui text-xs uppercase" style={{ color: "var(--color-muted)" }}>
          © {new Date().getFullYear()} Jiess. <T zh="版权所有。" en="All rights reserved." />
        </span>
        <span className="font-ui text-xs uppercase" style={{ color: "var(--color-muted)" }}>
          <T zh="约稿 / 合作 —" en="For commissions —" />
          &nbsp;
          <a
            href="mailto:lyz475223863@hotmail.com"
            className="brass-link underline transition-colors"
            style={{ color: "var(--color-text)" }}
          >
            lyz475223863@hotmail.com
          </a>
        </span>
      </div>
    </footer>
  );
}
