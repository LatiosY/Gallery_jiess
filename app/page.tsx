import { T } from "@/components/I18nProvider";
import EnterGalleryOnScroll from "@/components/EnterGalleryOnScroll";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <>
      <section
        id="home"
        className="relative min-h-[calc(100vh-57px)] px-6 pb-32 pt-16 sm:pb-36 sm:pt-20"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_320px] lg:items-center">
          <div>
            <p className="brass-label font-ui mb-4 text-xs">
              <T zh="插画师" en="Artist" />
            </p>
            <h1
              className="font-display text-6xl font-semibold leading-none sm:text-8xl"
              style={{
                color: "var(--color-ink)",
                textShadow: "0 1px 0 rgba(255, 255, 255, 0.55)",
              }}
            >
              Jiess
            </h1>
            <p
              className="font-ui mt-6 max-w-md text-sm leading-relaxed"
              style={{ color: "var(--color-muted)" }}
            >
              <T zh="插画 · 角色设计" en="Illustration · Character Design" />
            </p>
            <p
              className="font-ui mt-10 max-w-xl text-sm leading-7"
              style={{ color: "var(--color-muted)" }}
            >
              <T zh="自我介绍。" en="artist statement." />
            </p>
            <div className="font-ui mt-10 flex flex-col gap-2 text-sm sm:flex-row sm:gap-6">
              <a
                href="mailto:lyz475223863@hotmail.com"
                className="brass-link underline transition-colors"
              >
                lyz475223863@hotmail.com
              </a>
              <a
                href="https://www.mihuashi.com/profiles/8237329"
                target="_blank"
                rel="noreferrer"
                className="brass-link underline transition-colors"
              >
                <T zh="米画师 ↗" en="Mihuashi ↗" />
              </a>
            </div>
          </div>

          <div
            className="steam-frame relative h-[260px] w-[260px] overflow-hidden sm:h-[320px] sm:w-[320px]"
          >
            <img
              src="/images/about/portrait.jpg"
              alt="Jiess"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div
          className="font-ui absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase sm:bottom-10"
          style={{ color: "var(--color-muted)" }}
        >
          <img
            src="/images/ui/scroll-arrow.svg"
            alt=""
            className="h-20 w-16 opacity-90"
            aria-hidden="true"
          />
          <span className="tracking-[0.28em]">
            <T zh="向下滑动" en="Scroll Down" />
          </span>
        </div>
      </section>

      <EnterGalleryOnScroll />
    </>
  );
}
