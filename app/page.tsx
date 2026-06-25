import { T } from "@/components/I18nProvider";
import EnterGalleryOnScroll from "@/components/EnterGalleryOnScroll";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <>
      <section
        id="home"
        className="relative min-h-[calc(100vh-57px)] px-4 pb-36 pt-8 sm:px-6 sm:pb-40 sm:pt-12"
      >
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          <div className="brutal-panel relative overflow-hidden p-6 sm:p-10">
            <div
              className="absolute right-5 top-5 h-16 w-16 border-[4px]"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-cyan)",
              }}
              aria-hidden="true"
            />
            <p className="brass-label font-ui mb-7 text-xs">
              <T zh="插画师" en="Artist" />
            </p>
            <h1 className="font-display max-w-3xl text-7xl font-black uppercase leading-[0.85] sm:text-9xl">
              Jiess
            </h1>
            <div className="mt-8 h-3 w-36 border-[3px]" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-accent)" }} />
            <p className="font-ui mt-8 max-w-xl text-base uppercase leading-relaxed" style={{ color: "var(--color-text)" }}>
              <T zh="插画 · 角色设计" en="Illustration · Character Design" />
            </p>
            <div className="mt-8 max-w-xl space-y-2 border-l-[6px] py-1 pl-5 text-lg font-black leading-8" style={{ borderColor: "var(--color-accent)", color: "var(--color-muted)" }}>
              <p>
                <T zh="吾是jiess！" en="This is Jiess!" />
              </p>
              <p>
                <T zh="吾会努力锻炼绘画技艺的！" en="I will keep working hard to improve my art skills!" />
              </p>
              <p>
                <T zh="吾有口癖！请老大多多包涵！" en="Welcome to my gallery!" />
              </p>
            </div>
            <div className="font-ui mt-10 flex flex-col gap-4 text-xs sm:flex-row">
              <a href="mailto:lyz475223863@hotmail.com" className="brutal-button px-4 py-3">
                Email
              </a>
              <a href="https://www.mihuashi.com/profiles/8237329" target="_blank" rel="noreferrer" className="brutal-button brutal-button-active px-4 py-3">
                <T zh="米画师 ↗" en="Mihuashi ↗" />
              </a>
            </div>
          </div>

          <div className="space-y-5">
            <div className="brutal-tag font-ui inline-flex px-4 py-3 text-xs">
              <T zh="PROFILE CARD" en="PROFILE CARD" />
            </div>
            <div className="brutal-frame relative aspect-square overflow-hidden">
              <img src="/images/about/portrait.jpg" alt="Jiess" className="h-full w-full object-cover" />
            </div>
            <div className="brutal-panel-sm p-4">
              <p className="font-ui text-xs uppercase" style={{ color: "var(--color-muted)" }}>
                <T zh="Available for commissions" en="Available for commissions" />
              </p>
              <p className="mt-2 break-all text-sm font-black" style={{ color: "var(--color-text)" }}>
                lyz475223863@hotmail.com
              </p>
            </div>
          </div>
        </div>
        <EnterGalleryOnScroll />
      </section>
    </>
  );
}
