"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, ArrowUpRight } from "lucide-react";

const ROLES = [
  "Full-Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "UI Specialist",
  "Creative Developer",
];

export default function Hero() {
  const linesRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);

  /* ── GSAP: line-by-line clip reveal ── */
  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      if (!linesRef.current) return;
      const lines = linesRef.current.querySelectorAll(".h-line");
      gsap.fromTo(
        lines,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.13,
          ease: "power4.out",
          delay: 0.25,
        },
      );
    })();
  }, []);

  /* ── GSAP: subtle parallax on image (desktop only) ── */
  useEffect(() => {
    (async () => {
      // Skip parallax on touch/mobile devices — it fights native scroll
      const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      if (isTouchDevice) return;

      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!imgRef.current) return;
      gsap.to(imgRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    })();
  }, []);

  /* ── Typewriter ── */
  useEffect(() => {
    let ri = 0,
      ci = 0,
      dir = 1;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (!roleRef.current) return;
      const w = ROLES[ri];
      if (dir === 1) {
        ci++;
        roleRef.current.textContent = w.slice(0, ci);
        if (ci === w.length) {
          dir = -1;
          t = setTimeout(tick, 1800);
          return;
        }
      } else {
        ci--;
        roleRef.current.textContent = w.slice(0, ci);
        if (ci === 0) {
          dir = 1;
          ri = (ri + 1) % ROLES.length;
        }
      }
      t = setTimeout(tick, dir === 1 ? 58 : 32);
    };
    t = setTimeout(tick, 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden"
    >
      {/* ═══ LEFT — Image 50% ═══════════════════════════ */}
      <div
        ref={imgRef}
        className="relative w-full lg:w-1/2 h-[55vw] min-h-[320px] lg:h-screen lg:min-h-screen flex-shrink-0 overflow-hidden"
        style={{
          backgroundImage: "url('/src/images/Hero.webp')",
          backgroundSize: "cover",
          backgroundPosition: "top 25% center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Bottom fade on mobile */}
        <div
          className="absolute bottom-0 inset-x-0 h-16 lg:hidden pointer-events-none"
          style={{
            background: "linear-gradient(to top, var(--base), transparent)",
          }}
        />
      </div>

      {/* ═══ RIGHT — Text 50% ═════════════════════════ */}

      <div
        className="relative w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-14 xl:px-20 pt-28 pb-16 lg:pt-0 lg:pb-0"
        style={{ background: "var(--base)" }}
      >
        {/* Main headline — clipped lines */}
        <div ref={linesRef} className="mb-4">
          <div className="overflow-hidden">
            <div className="h-line text-hero" style={{ opacity: 0 }}>
              I am a
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="h-line text-hero" style={{ opacity: 0 }}>
              Software
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className="h-line text-hero"
              style={{
                opacity: 0,
                color: "var(--accent)",
                fontStyle: "italic",
              }}
            >
              Developer.
            </div>
          </div>
        </div>

        {/* Typewriter role line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex items-center gap-2 mb-8 h-7"
        >
          <span
            className="font-mono text-xs"
            style={{ color: "var(--t-muted-extra)" }}
          >
            →
          </span>
          <span
            ref={roleRef}
            className="font-mono text-sm"
            style={{ color: "var(--t-medium)" }}
          >
            Software Developer
          </span>
          <span
            className="blink-cursor inline-block w-0.5 h-4"
            style={{ background: "var(--accent)" }}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="text-base leading-relaxed max-w-md mb-10"
          style={{ color: "var(--t-medium)" }}
        >
          3+ years of experience, I’m a{" "}
          <span style={{ color: "var(--t-bright)", fontWeight: 500 }}>
            creative software developer
          </span>
          &nbsp;who loves designing scalable systems and writing clean code and
          building systems that actually hold up in production.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          <a href="#projects" className="btn btn-primary">
            View My Work <ArrowUpRight size={15} />
          </a>
          <a
            href="https://drive.google.com/file/d/1hOpp5DkGcxXLuRc15hddF-73ocN0lb2I/view?usp=sharing"
            className="btn btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download size={15} /> Resume
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex gap-8 pt-8"
          style={{ borderTop: "1px solid var(--base-shade)" }}
        >
          {[
            { n: "3+", label: "Years of Experience" },
            { n: "15+", label: "Production Projects" },
            { n: "100+", label: "APIs Integrated" },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="font-syne text-2xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                {s.n}
              </div>
              <div
                className="font-mono text-[10px] mt-0.5 uppercase tracking-widest"
                style={{ color: "var(--t-muted-extra)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-1.5"
      >
        <span
          className="font-mono text-[10px] uppercase tracking-widest"
          style={{ color: "var(--t-muted-extra)" }}
        >
          scroll
        </span>
        <div
          className="scroll-dot w-1 h-1 rounded-full"
          style={{ background: "var(--accent)" }}
        />
      </motion.div>
    </section>
  );
}
