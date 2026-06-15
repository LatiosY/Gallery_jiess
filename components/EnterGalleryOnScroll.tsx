"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { T } from "@/components/I18nProvider";

export default function EnterGalleryOnScroll() {
  const router = useRouter();
  const isNavigatingRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    const enterGallery = (withCurtain = true) => {
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;

      if (!withCurtain) {
        router.push("/gallery");
        return;
      }

      setIsEntering(true);
      document.body.style.overflow = "hidden";

      timeoutRef.current = window.setTimeout(() => {
        router.push("/gallery");
      }, 760);
    };

    const onWheel = (event: WheelEvent) => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

      if (event.deltaY > 0 && nearBottom) {
        enterGallery();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      document.body.style.overflow = "";
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [router]);

  const handleCueClick = () => {
    const isTouchLayout = window.matchMedia("(max-width: 767px)").matches;
    if (isTouchLayout) {
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;
      router.push("/gallery");
      return;
    }

    setIsEntering(true);
    document.body.style.overflow = "hidden";
    timeoutRef.current = window.setTimeout(() => {
      router.push("/gallery");
    }, 760);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleCueClick}
        className="font-ui absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase transition-opacity hover:opacity-70 sm:bottom-10"
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
      </button>

      <div
        className={`pointer-events-none fixed inset-x-0 top-[57px] z-40 hidden h-[calc(100vh-57px)] items-center justify-center px-6 transition-transform duration-700 ease-out md:flex ${
          isEntering ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          backgroundColor: "#6bb6d6",
        }}
        aria-hidden={!isEntering}
      />
    </>
  );
}
