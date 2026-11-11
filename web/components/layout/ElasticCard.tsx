"use client";

import { useEffect, useRef } from "react";

// How hard the sheet resists being pulled (0..1, lower = stiffer)
const RESISTANCE = 0.5;
// Max pull distance as a fraction of the screen height
const MAX_FRACTION = 0.5;
// Spring-back animation after release
const SPRING = "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)";

export function ElasticCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let offset = 0;
    let lastY = 0;
    let releaseTimer: ReturnType<typeof setTimeout> | undefined;

    const currentOffset = () => {
      const t = getComputedStyle(el).transform;
      return t && t !== "none" ? new DOMMatrix(t).m42 : 0;
    };

    const setOffset = (value: number) => {
      offset = value;
      el.style.transition = "none";
      el.style.transform = `translate3d(0, ${value}px, 0)`;
    };

    const release = () => {
      if (offset === 0) return;
      offset = 0;
      el.style.transition = SPRING;
      el.style.transform = "translate3d(0, 0, 0)";
    };

    // delta > 0: user scrolls down, delta < 0: user scrolls up.
    // Returns true when the sheet is being stretched (page scroll is blocked).
    const apply = (delta: number): boolean => {
      const max = window.innerHeight * MAX_FRACTION;
      const atTop = window.scrollY <= 0;
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 1;
      let o = offset !== 0 ? offset : currentOffset();

      if (o > 0 || (o === 0 && atTop && delta < 0)) {
        o =
          delta < 0
            ? o - delta * RESISTANCE * Math.max(0, 1 - o / max)
            : o - delta;
        o = Math.min(max, Math.max(0, o));
      } else if (o < 0 || (o === 0 && atBottom && delta > 0)) {
        o =
          delta > 0
            ? o - delta * RESISTANCE * Math.max(0, 1 + o / max)
            : o - delta;
        o = Math.max(-max, Math.min(0, o));
      } else {
        return false;
      }
      setOffset(o);
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.ctrlKey) return;
      const unit =
        e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      if (apply(e.deltaY * unit)) {
        e.preventDefault();
        clearTimeout(releaseTimer);
        releaseTimer = setTimeout(release, 140);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      lastY = e.touches[0].clientY;
      clearTimeout(releaseTimer);
    };

    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      const delta = lastY - y;
      lastY = y;
      if (apply(delta) && e.cancelable) e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", release);
    window.addEventListener("touchcancel", release);

    return () => {
      clearTimeout(releaseTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", release);
      window.removeEventListener("touchcancel", release);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="mx-auto max-w-[1304px] overflow-hidden rounded-md bg-surface will-change-transform"
    >
      {children}
    </div>
  );
}