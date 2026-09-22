"use client";

import { useEffect, useRef } from "react";

const TARGET_SELECTOR = "a, button, [data-cursor-target]";
const IDLE_SIZE = 26;
const TARGET_PADDING = 7;

function canUseCustomCursor() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function BrutalCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!canUseCustomCursor()) return;

    const cursor = cursorRef.current;
    const frame = frameRef.current;
    if (!cursor || !frame) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let activeTarget: Element | null = null;
    let animationFrame = 0;

    const originalBodyCursor = document.body.style.cursor;
    document.body.style.cursor = "none";
    document.documentElement.classList.add("has-brutal-cursor");

    const syncActiveTarget = () => {
      const element = document.elementFromPoint(mouseX, mouseY);
      activeTarget = element?.closest(TARGET_SELECTOR) ?? null;
    };

    const render = () => {
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      cursor.dataset.visible = "true";
      frame.dataset.visible = "true";

      if (activeTarget && document.body.contains(activeTarget)) {
        const rect = activeTarget.getBoundingClientRect();
        frame.dataset.locked = "true";
        frame.style.width = `${rect.width + TARGET_PADDING * 2}px`;
        frame.style.height = `${rect.height + TARGET_PADDING * 2}px`;
        frame.style.transform = `translate3d(${rect.left - TARGET_PADDING}px, ${rect.top - TARGET_PADDING}px, 0)`;
      } else {
        frame.dataset.locked = "false";
        frame.style.width = `${IDLE_SIZE}px`;
        frame.style.height = `${IDLE_SIZE}px`;
        frame.style.transform = `translate3d(${mouseX - IDLE_SIZE / 2}px, ${mouseY - IDLE_SIZE / 2}px, 0)`;
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      activeTarget = event.target instanceof Element ? event.target.closest(TARGET_SELECTOR) : null;
    };

    const handleMouseDown = () => {
      cursor.dataset.pressed = "true";
      frame.dataset.pressed = "true";
    };

    const handleMouseUp = () => {
      cursor.dataset.pressed = "false";
      frame.dataset.pressed = "false";
    };

    const handleMouseLeave = () => {
      cursor.dataset.visible = "false";
      frame.dataset.visible = "false";
    };

    const handleMouseEnter = () => {
      cursor.dataset.visible = "true";
      frame.dataset.visible = "true";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("scroll", syncActiveTarget, { passive: true });
    window.addEventListener("resize", syncActiveTarget);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("scroll", syncActiveTarget);
      window.removeEventListener("resize", syncActiveTarget);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.classList.remove("has-brutal-cursor");
      document.body.style.cursor = originalBodyCursor;
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="brutal-cursor" aria-hidden="true">
        <div className="brutal-cursor__dot" />
      </div>
      <div ref={frameRef} className="brutal-cursor-frame" aria-hidden="true" />
    </>
  );
}
