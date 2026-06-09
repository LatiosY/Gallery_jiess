"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Work } from "@/lib/works";

export default function HorizontalGallery({ works }: { works: Work[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const curtainRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const cleanupRef = useRef<() => void>(() => {});
  const stopAutoplayRef = useRef<() => void>(() => {});
  const startAutoplayRef = useRef<() => void>(() => {});
  const hasCleanedRef = useRef(false);

  const cleanupScrollTrigger = () => {
    if (hasCleanedRef.current) return;
    hasCleanedRef.current = true;
    cleanupRef.current();
    cleanupRef.current = () => {};
  };

  useEffect(() => {
    const isTouchLayout = window.matchMedia("(max-width: 767px)").matches;
    if (isTouchLayout) return;

    const section = sectionRef.current;
    const curtain = curtainRef.current;
    const track = trackRef.current;
    if (!section || !curtain || !track) return;

    const sectionEl = section;
    const curtainEl = curtain;
    const trackEl = track;

    cleanupRef.current = () => {};
    hasCleanedRef.current = false;
    let cancelled = false;
    let autoplayFrame: number | null = null;
    let lastFrameTime: number | null = null;
    let resumeTimeout: number | null = null;

    async function setupScrollTrigger() {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.default;
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        const viewportHeight = () => window.innerHeight - 57;
        const curtainDistance = () => Math.min(220, Math.max(140, viewportHeight() * 0.22));
        const getDistance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth);
        const updateStageHeight = () => {
          sectionEl.style.height = `${viewportHeight() + curtainDistance() + getDistance()}px`;
        };

        updateStageHeight();
        gsap.set(curtainEl, { xPercent: 0 });
        gsap.set(trackEl, { x: 0 });

        let curtainTween: gsap.core.Tween | null = null;

        curtainTween = gsap.to(curtainEl, {
          xPercent: -100,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top+=57",
            end: () => `+=${curtainDistance()}`,
            scrub: 0.4,
            invalidateOnRefresh: true,
            onRefreshInit: updateStageHeight,
            onUpdate: (self) => {
              if (self.progress < 1) return;

              gsap.set(curtainEl, { display: "none", xPercent: -100 });
              curtainTween?.kill();
              self.kill(false);
              curtainTween = null;
            },
          },
        });

        gsap.to(trackEl, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: () => `top+=${curtainDistance()} top+=57`,
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
            onRefreshInit: updateStageHeight,
          },
        });
      }, sectionEl);

      const refresh = () => ScrollTrigger.refresh();
      const stopAutoplay = () => {
        if (resumeTimeout) {
          window.clearTimeout(resumeTimeout);
          resumeTimeout = null;
        }
        if (autoplayFrame) {
          window.cancelAnimationFrame(autoplayFrame);
          autoplayFrame = null;
        }
        lastFrameTime = null;
      };
      stopAutoplayRef.current = stopAutoplay;
      const startAutoplay = () => {
        if (cancelled || autoplayFrame) return;

        const targetY = sectionEl.offsetTop + sectionEl.offsetHeight - window.innerHeight;
        if (targetY <= window.scrollY) return;

        const totalDistance = Math.max(1, targetY - sectionEl.offsetTop);
        const pixelsPerSecond = totalDistance / Math.max(18, works.length * 2.8);

        const step = (time: number) => {
          if (cancelled) return;
          if (lastFrameTime === null) lastFrameTime = time;

          const elapsedSeconds = Math.min((time - lastFrameTime) / 1000, 0.05);
          lastFrameTime = time;

          const nextY = Math.min(window.scrollY + pixelsPerSecond * elapsedSeconds, targetY);
          window.scrollTo(0, nextY);

          if (nextY >= targetY) {
            autoplayFrame = null;
            lastFrameTime = null;
            return;
          }

          autoplayFrame = window.requestAnimationFrame(step);
        };

        autoplayFrame = window.requestAnimationFrame(step);
      };
      startAutoplayRef.current = startAutoplay;
      const resumeAutoplaySoon = () => {
        stopAutoplay();
        resumeTimeout = window.setTimeout(() => {
          resumeTimeout = null;
          startAutoplay();
        }, 1000);
      };

      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);
      window.addEventListener("touchstart", resumeAutoplaySoon, { passive: true });
      ScrollTrigger.refresh();
      window.setTimeout(startAutoplay, 250);

      cleanupRef.current = () => {
        stopAutoplay();
        stopAutoplayRef.current = () => {};
        startAutoplayRef.current = () => {};
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
        window.removeEventListener("touchstart", resumeAutoplaySoon);
        sectionEl.style.height = "";
        context.revert();
      };
    }

    window.addEventListener("gallery:cleanup-scroll", cleanupScrollTrigger);
    setupScrollTrigger();

    return () => {
      window.removeEventListener("gallery:cleanup-scroll", cleanupScrollTrigger);
      cancelled = true;
      cleanupScrollTrigger();
    };
  }, []);

  return (
    <>
      <section className="md:hidden">
        <ul className="flex h-[calc(100dvh-57px)] snap-x snap-mandatory gap-6 overflow-x-auto px-6 py-10">
          {works.map((work, idx) => (
            <li
              key={work.slug}
              className="flex w-[78vw] max-w-sm flex-none snap-center flex-col justify-center"
            >
              <Link href={`/works/${work.slug}`} className="block">
                <div
                  className="steam-frame relative overflow-hidden"
                  style={{ aspectRatio: idx % 5 === 2 ? "3/4" : "4/5" }}
                >
                  <img
                    src={work.cover}
                    alt={work.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0 z-10 flex items-end p-5"
                    style={{ color: "var(--color-muted)" }}
                  >
                    <span className="font-ui text-xs opacity-80">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <p
                    className="font-display text-lg font-semibold leading-snug"
                    style={{ color: "var(--color-text)" }}
                  >
                    {work.title}
                  </p>
                  <p className="font-ui text-xs" style={{ color: "var(--color-muted)" }}>
                    {work.year} · {work.medium}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="gallery" ref={sectionRef} className="horizontal-stage relative hidden md:block">
      <div className="sticky top-[57px] h-[calc(100vh-57px)] overflow-hidden">
        <div
          ref={curtainRef}
          className="absolute inset-0 z-20 flex items-center justify-center px-6"
          style={{
            backgroundColor: "#6bb6d6",
          }}
        >
        </div>

        <div
          className="pointer-events-none absolute left-0 right-0 top-1/2 h-px"
          style={{ backgroundColor: "var(--color-border-soft)" }}
          aria-hidden="true"
        />

        <ul
          ref={trackRef}
          className="flex h-full w-max items-center gap-10 px-[18vw] sm:gap-14"
        >
          {works.map((work, idx) => (
            <li
              key={work.slug}
              className="group flex w-[72vw] max-w-[520px] flex-none flex-col sm:w-[42vw]"
              onMouseEnter={() => stopAutoplayRef.current()}
              onMouseLeave={() => startAutoplayRef.current()}
              style={{ transform: idx % 2 === 0 ? "translateY(-2vh)" : "translateY(4vh)" }}
            >
              <Link
                href={`/works/${work.slug}`}
                className="block"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("gallery:cleanup-scroll"));
                }}
              >
                <div
                  className="steam-frame relative overflow-hidden"
                  style={{ aspectRatio: idx % 5 === 2 ? "3/4" : "4/5" }}
                >
                  <img
                    src={work.cover}
                    alt={work.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 z-10 flex items-end justify-between p-5"
                    style={{ color: "var(--color-muted)" }}
                  >
                    <span className="font-ui text-xs opacity-80">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <p
                    className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-[var(--color-accent)]"
                    style={{ color: "var(--color-text)" }}
                  >
                    {work.title}
                  </p>
                  <p className="font-ui text-xs" style={{ color: "var(--color-muted)" }}>
                    {work.year} · {work.medium}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      </section>
    </>
  );
}
