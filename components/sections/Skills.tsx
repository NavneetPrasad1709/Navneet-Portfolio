"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const SKILLS = {
  Frontend: ["React", "Next.js 14", "TypeScript", "GSAP", "Framer Motion", "CSS/Tailwind", "Tailwind CSS", "WebGL", "Three.js", "WordPress", "Wix Studio", "Shopify", "SAP Fiori UI5"],
  Backend:  ["Node.js", "Express", "PostgreSQL", "Redis", "Supabase", "Prisma", "GraphQL", "REST APIs"],
  Tooling:  ["Vercel", "AWS", "Docker", "Git & GitHub", "Figma", "CI/CD workflows"],
};

const EDUCATION = [
  { inst: "KIET Group of Institutions", degree: "Bachelor of Technology", year: "2017–2021" },
  { inst: "Sanskar The Co-Educational School",       degree: " Senior Secondary Education", year: "2016-2017",      note: "Completed with distinction" },
  
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current) return;

      sectionRef.current.querySelectorAll<HTMLElement>(".sk").forEach((el) => {
        gsap.fromTo(el, { y: 36, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 87%", once: true },
        });
      });

      gsap.fromTo(".edu-track", { scaleY: 0 }, {
        scaleY: 1, duration: 1.6, ease: "power3.out",
        scrollTrigger: { trigger: ".edu-track", start: "top 80%", once: true },
      });
    })();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section-py section-alt">
      <div className="wrap">
        <div className="sk text-label mb-3">Skills & Education</div>
        <h2 className="sk text-section mb-12">
          My <em style={{ fontStyle: "italic", color: "var(--accent)" }}>toolkit</em>
        </h2>

        <div className="grid lg:grid-cols-2 gap-14">
          {/* Skills */}
          <div className="space-y-9">
            {Object.entries(SKILLS).map(([group, list]) => (
              <div key={group} className="sk">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                  <span className="text-label" style={{ color: "var(--t-muted)" }}>{group}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {list.map((s) => (
                    <motion.span key={s} className="skill-tag" whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="relative pl-6">
            <div className="edu-track timeline-track" />
            <div className="space-y-8">
              {EDUCATION.map((e, i) => (
                <motion.div
                  key={i}
                  className="sk relative"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                >
                  <div className="timeline-dot absolute -left-[1.35rem] top-2" />
                  <div className="card p-5 group">
                    <div className="text-label mb-1" style={{ color: "var(--t-muted-extra)" }}>{e.year}</div>
                    <div
                      className="font-syne font-semibold text-sm mb-0.5 transition-colors"
                      style={{ color: "var(--t-bright)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t-bright)")}
                    >
                      {e.inst}
                    </div>
                    <div className="text-sm font-medium mb-1.5" style={{ color: "var(--accent)" }}>{e.degree}</div>
                    <div className="text-xs" style={{ color: "var(--t-muted)" }}>{e.note}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
