"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCheck } from "lucide-react";

const EXPERIENCES = [
  {
    company: "Keymantra Consulting LLP",
    role: "Software Developer – Frontend / Full Stack",
    duration: "Jan 2025 — Present",
    location: "Noida, India",
    achievements: [
      "Developing scalable React.js and Next.js applications integrated with REST APIs for production systems",
      "Collaborating closely with backend teams to design clean API contracts and improve data flow efficiency",
      "Improved frontend performance and maintainability through optimized state management and modular architecture",
      "Actively participating in feature planning, debugging production issues, and delivering enhancements based on client feedback",
    ],
  },
  {
    company: "Delta 360 Services Pvt. Ltd.",
    role: "Software Developer – Full Stack",
    duration: "May 2023 — Dec 2024",
    location: "Noida, India",
    achievements: [
      "Built and maintained full-stack web applications using React.js, Node.js, and PostgreSQL for internal business workflows",
      "Designed and optimized backend APIs to improve response consistency and system stability",
      "Worked on database queries and schema updates to enhance performance and reduce redundant data handling",
      "Handled bug fixes, feature upgrades, and production support across multiple live projects",
    ],
  },
  {
    company: "Congruex Asia Pacific LLP",
    role: "UI/UX Developer – Frontend",
    duration: "Mar 2021 — Apr 2023",
    location: "Noida, India",
    achievements: [
      "Developed responsive and user-centric interfaces based on UI/UX wireframes and design systems",
      "Collaborated with designers and stakeholders to translate business requirements into functional UI components",
      "Improved usability and accessibility across modules by refining component structure and styling standards",
      "Maintained and enhanced legacy frontend code while ensuring consistency across multiple project releases",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        gsap.fromTo(".exp-track", { scaleY: 0 }, {
          scaleY: 1, duration: 2, ease: "power3.out",
          scrollTrigger: { trigger: ".exp-track", start: "top 80%", once: true },
        });

        sectionRef.current!.querySelectorAll<HTMLElement>(".exp-card").forEach((card) => {
          gsap.fromTo(card, { y: 48, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
        });
      }, sectionRef.current);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-py" style={{ background: "var(--base)" }}>
      <div className="wrap">
        <div className="text-label mb-3">Experience</div>
        <h2 className="text-section mb-14">
          Where I&apos;ve made{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>impact.</em>
        </h2>

        <div className="max-w-3xl relative">
          <div className="exp-track timeline-track" />

          <div className="pl-10 space-y-8">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={i}
                className="exp-card relative"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="timeline-dot absolute -left-[2.6rem] top-5" />

                <div className="card p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="font-syne font-semibold text-lg mb-1" style={{ color: "var(--t-bright)" }}>
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm" style={{ color: "var(--accent)" }}>{exp.company}</span>
                        <span style={{ color: "var(--base-shade)" }}>·</span>
                        <span className="text-sm" style={{ color: "var(--t-muted)" }}>{exp.location}</span>
                      </div>
                    </div>
                    <div className="badge">{exp.duration}</div>
                  </div>

                  <ul className="space-y-2.5">
                    {exp.achievements.map((a, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--t-medium)" }}>
                        <CheckCheck size={14} className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
