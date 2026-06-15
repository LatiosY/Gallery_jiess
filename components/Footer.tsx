"use client";

import { T } from "@/components/I18nProvider";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/gallery") {
    return null;
  }

  return (
    <footer className="mx-auto mb-8 mt-24 w-[calc(100%-2rem)] max-w-6xl sm:w-[calc(100%-3rem)]">
      <div className="brutal-panel flex flex-col items-center justify-between gap-4 px-5 py-5 sm:flex-row sm:px-7">
        <span className="font-ui brutal-tag px-3 py-2 text-[0.68rem]">
          © {new Date().getFullYear()} Jiess. <T zh="版权所有。" en="All rights reserved." />
        </span>
        <span className="font-ui text-center text-[0.68rem] uppercase" style={{ color: "var(--color-text)" }}>
          <T zh="约稿 / 合作 —" en="For commissions —" />
          &nbsp;
          <a
            href="mailto:lyz475223863@hotmail.com"
            className="brass-link underline transition-colors"
          >
            lyz475223863@hotmail.com
          </a>
        </span>
      </div>
    </footer>
  );
}
