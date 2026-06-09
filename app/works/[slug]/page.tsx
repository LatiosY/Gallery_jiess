import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkBySlug, works } from "@/lib/works";
import { T } from "@/components/I18nProvider";

export const dynamic = "force-static";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props) {
  const work = getWorkBySlug(params.slug);
  return {
    title: work ? `${work.title} — Jiess` : "Work — Jiess",
  };
}

export default function WorkPage({ params }: Props) {
  const work = getWorkBySlug(params.slug);
  if (!work) return notFound();

  const currentIndex = works.findIndex((w) => w.slug === work.slug);
  const prev = works[currentIndex - 1];
  const next = works[currentIndex + 1];

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      {/* Back */}
      <Link
        href="/gallery"
        className="brass-link font-ui mb-10 inline-flex items-center gap-2 text-sm underline transition-colors"
        style={{ color: "var(--color-muted)" }}
      >
        <span>←</span>
        <span>
          <T zh="全部作品" en="All works" />
        </span>
      </Link>

      {/* Header */}
      <div
        className="mb-10 border-b pb-10"
        style={{ borderColor: "var(--color-border-soft)" }}
      >
        <p
          className="brass-label font-ui mb-2 text-xs"
        >
          {work.year} · {work.medium}
        </p>
        <h1
          className="font-display text-4xl font-semibold leading-tight sm:text-5xl"
          style={{ color: "var(--color-text)" }}
        >
          {work.title}
        </h1>
        {work.description && (
          <p
            className="font-ui mt-4 max-w-xl text-sm leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            {work.description}
          </p>
        )}
      </div>

      {/* Image */}
      <div
        className="steam-frame relative overflow-hidden rounded-sm"
      >
        <img
          src={work.cover}
          alt={work.title}
          className="w-full object-contain"
          style={{ maxHeight: "80vh" }}
        />
      </div>

      {/* Prev / Next navigation */}
      <nav
        className="mt-16 flex items-center justify-between border-t pt-10"
        style={{ borderColor: "var(--color-border)" }}
      >
        {prev ? (
          <Link
            href={`/works/${prev.slug}`}
            className="group flex flex-col gap-1 transition-opacity hover:opacity-70"
          >
            <span className="font-ui text-xs" style={{ color: "var(--color-muted)" }}>
              ← <T zh="上一张" en="Previous" />
            </span>
            <span className="font-display text-sm" style={{ color: "var(--color-text)" }}>
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/works/${next.slug}`}
            className="group flex flex-col items-end gap-1 transition-opacity hover:opacity-70"
          >
            <span className="font-ui text-xs" style={{ color: "var(--color-muted)" }}>
              <T zh="下一张" en="Next" /> →
            </span>
            <span className="font-display text-sm" style={{ color: "var(--color-text)" }}>
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
