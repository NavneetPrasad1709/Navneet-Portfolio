"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const PILLARS = [
  { n: "01", title: "Problem Solving",   body: "I enjoy digging into issues and figuring out what&apos;s actually going wrong. Fixing things properly is more satisfying than quick patches." },
  { n: "02", title: "Clean Code",        body: "I try to write code that&apos;s simple, readable, and easy to build on — so future changes don&apos;t become painful." },
  { n: "03", title: "Big Picture Thinking",    body: "I think about performance, edge cases, and how everything fits together — not just the feature in front of me." },
  { n: "04", title: "From Idea to Reality",    body: "I turn concepts into functional features, making sure they work smoothly beyond just development environments." },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current) return;

      sectionRef.current.querySelectorAll<HTMLElement>(".ar").forEach((el) => {
        gsap.fromTo(el,
          { y: 44, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true } }
        );
      });

      gsap.fromTo(".about-rule",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: "power3.inOut",
          scrollTrigger: { trigger: ".about-rule", start: "top 85%", once: true } }
      );
    })();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-py" style={{ background: "var(--base)" }}>
      
      <div className="wrap">

        {/* Top row */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          
          <div>
            <div className="ar text-label mb-4">About Me</div>
            <h2 className="ar text-section">
              Building the web&apos;s{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>next layer.</em>
            </h2>
          </div>
          
          <div className="ar flex flex-col justify-end">
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--t-medium)" }}>
              I&apos;m Navneet Prasad — a Software Developer with 3+ years of experience building scalable applications and backend-driven systems. I enjoy solving complex problems, writing clean and maintainable code, and turning ideas into reliable, production-ready software.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--t-muted)" }}>
              My experience spans real-world projects where I&apos;ve built APIs, optimized performance, and delivered features that are meant to scale. I believe good software isn&apos;t just about working — it&apos;s about working well, efficiently, and sustainably.
            </p>
          </div>
        </div>

        {/* Rule */}
        <div className="about-rule divider mb-16 origin-left" />

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((p) => (
            <motion.div
              key={p.n}
              className="ar card p-6 group"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <div className="text-label mb-4" style={{ color: "var(--t-muted-extra)" }}>{p.n}</div>
              <h3
                className="font-syne font-semibold text-sm mb-3 transition-colors"
                style={{ color: "var(--t-bright)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t-bright)")}
              >
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--t-muted)" }}>{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
