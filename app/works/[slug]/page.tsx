import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkBySlug, works } from "@/lib/works";

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
        href="/"
        className="font-ui mb-10 inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-60"
        style={{ color: "var(--color-muted)" }}
      >
        <span>←</span>
        <span>All works</span>
      </Link>

      {/* Header */}
      <div
        className="mb-10 border-b pb-10"
        style={{ borderColor: "var(--color-border)" }}
      >
        <p
          className="font-ui mb-2 text-xs tracking-[0.2em] uppercase"
          style={{ color: "var(--color-muted)" }}
        >
          {work.year} · {work.medium}
        </p>
        <h1
          className="font-display text-4xl font-normal leading-tight sm:text-5xl"
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
        className="overflow-hidden rounded-sm"
        style={{ backgroundColor: "var(--color-surface)" }}
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
            className="group flex flex-col gap-1 transition-opacity hover:opacity-60"
          >
            <span className="font-ui text-xs" style={{ color: "var(--color-muted)" }}>
              ← Previous
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
            className="group flex flex-col items-end gap-1 transition-opacity hover:opacity-60"
          >
            <span className="font-ui text-xs" style={{ color: "var(--color-muted)" }}>
              Next →
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
