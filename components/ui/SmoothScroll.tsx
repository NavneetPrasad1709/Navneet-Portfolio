"use client";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    // Detect touch/mobile devices — Lenis JS smooth scroll fights native
    // momentum scrolling on iOS/Android and causes the "stuck after a few swipes" bug.
    // On touch devices we use native scroll-behavior: smooth instead.
    const isTouchDevice =
      window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      document.documentElement.style.scrollBehavior = "smooth";

      // Still handle anchor clicks for smooth navigation on mobile
      const onClick = (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']");
        if (!anchor) return;
        const href = anchor.getAttribute("href") || "";
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 72;
          const top =
            target.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      };
      document.addEventListener("click", onClick);
      return () => {
        document.removeEventListener("click", onClick);
        document.documentElement.style.scrollBehavior = "";
      };
    }

    // Desktop only — Lenis smooth scroll
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
          // touchMultiplier intentionally omitted — touch devices skip Lenis entirely
          infinite: false,
        });

        function raf(time: number) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

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
