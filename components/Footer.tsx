export default function Footer() {
  return (
    <footer
      className="mt-24 border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 sm:flex-row">
        <span className="font-ui text-xs" style={{ color: "var(--color-muted)" }}>
          © {new Date().getFullYear()} Jiess. All rights reserved.
        </span>
        <span className="font-ui text-xs" style={{ color: "var(--color-muted)" }}>
          For commissions —&nbsp;
          <a
            href="mailto:lyz475223863@hotmail.com"
            className="transition-opacity hover:opacity-60"
            style={{ color: "var(--color-text)" }}
          >
            lyz475223863@hotmail.com
          </a>
        </span>
      </div>
    </footer>
  );
}
