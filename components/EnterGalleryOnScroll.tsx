"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function EnterGalleryOnScroll() {
  const router = useRouter();
  const isNavigatingRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    const enterGallery = () => {
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;
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

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-[57px] z-40 flex h-[calc(100vh-57px)] items-center justify-center px-6 transition-transform duration-700 ease-out ${
        isEntering ? "translate-y-0" : "translate-y-full"
      }`}
      style={{
        backgroundColor: "#6bb6d6",
      }}
      aria-hidden={!isEntering}
    />
  );
}
