"use client";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    let lenis: any = null;
    let rafId: number;

    const init = async () => {
      try {
        const mod = await import("lenis");
        const Lenis = mod.default ?? mod;

        lenis = new Lenis({
          duration: 1.15,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.8,
          infinite: false,
        });

        function raf(time: number) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        // Handle anchor clicks
        const onClick = (e: MouseEvent) => {
          const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']");
          if (!anchor) return;
          const href = anchor.getAttribute("href") || "";
          if (!href || href === "#") return;
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -72, duration: 1.3 });
          }
        };
        document.addEventListener("click", onClick);

        return () => {
          document.removeEventListener("click", onClick);
        };
      } catch {
        // Graceful fallback
        document.documentElement.style.scrollBehavior = "smooth";
        return () => {};
      }
    };

    let cleanup: (() => void) | undefined;
    init().then((fn) => { cleanup = fn; });

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      cleanup?.();
    };
  }, []);

  return null;
}