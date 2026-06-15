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
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Back */}
      <Link
        href="/gallery"
        className="font-ui brutal-button mb-8 inline-flex items-center gap-2 px-4 py-3 text-xs"
      >
        <span>←</span>
        <span>
          <T zh="全部作品" en="All works" />
        </span>
      </Link>

      {/* Header */}
      <div
        className="brutal-panel mb-10 p-6 sm:p-8"
      >
        <p
          className="brass-label font-ui mb-5 text-xs"
        >
          {work.year} · {work.medium}
        </p>
        <h1
          className="font-display text-5xl font-black uppercase leading-none sm:text-7xl"
          style={{ color: "var(--color-text)" }}
        >
          {work.title}
        </h1>
        {work.description && (
          <p
            className="mt-6 max-w-xl border-l-[6px] py-1 pl-5 text-base font-black leading-7"
            style={{ borderColor: "var(--color-accent)", color: "var(--color-muted)" }}
          >
            {work.description}
          </p>
        )}
      </div>

      {/* Image */}
      <div
        className="brutal-frame relative overflow-hidden"
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
        className="mt-14 grid gap-5 sm:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/works/${prev.slug}`}
            className="brutal-button flex flex-col gap-2 px-5 py-4"
          >
            <span className="font-ui text-xs">
              ← <T zh="上一张" en="Previous" />
            </span>
            <span className="font-display text-2xl font-black uppercase leading-none">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {next ? (
          <Link
            href={`/works/${next.slug}`}
            className="brutal-button flex flex-col items-end gap-2 px-5 py-4 text-right"
          >
            <span className="font-ui text-xs">
              <T zh="下一张" en="Next" /> →
            </span>
            <span className="font-display text-2xl font-black uppercase leading-none">
              {next.title}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </nav>
    </div>
  );
}
