import Link from "next/link";
import { works } from "@/lib/works";
import { T } from "@/components/I18nProvider";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      {/* Hero */}
      <section className="mb-16 border-b pb-16" style={{ borderColor: "var(--color-border)" }}>
        <p
          className="font-ui mb-3 text-xs tracking-[0.25em] uppercase"
          style={{ color: "var(--color-muted)" }}
        >
          <T zh="全部作品" en="All Works" />
        </p>
        <h1
          className="font-display text-5xl font-normal leading-tight sm:text-7xl"
          style={{ color: "var(--color-text)" }}
        >
          Jiess
        </h1>
        <p
          className="font-ui mt-4 max-w-md text-sm leading-relaxed"
          style={{ color: "var(--color-muted)" }}
        >
          <T zh="插画 · 角色设计" en="Illustration · Character Design" />
        </p>
      </section>

      {/* Works Grid */}
      <ul className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
        {works.map((work, idx) => (
          <li key={work.slug} className="group">
            <Link href={`/works/${work.slug}`} className="block">
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{
                  backgroundColor: "var(--color-surface)",
                  aspectRatio: idx % 5 === 2 ? "3/4" : "4/5",
                }}
              >
                <img
                  src={work.cover}
                  alt={work.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0 flex items-end p-4"
                  style={{ color: "var(--color-muted)" }}
                >
                  <span className="font-ui text-xs opacity-40">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Meta */}
              <div className="mt-3 space-y-0.5">
                <p
                  className="font-display text-sm font-normal leading-snug transition-opacity group-hover:opacity-60"
                  style={{ color: "var(--color-text)" }}
                >
                  {work.title}
                </p>
                <p
                  className="font-ui text-xs"
                  style={{ color: "var(--color-muted)" }}
                >
                  {work.year} · {work.medium}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
