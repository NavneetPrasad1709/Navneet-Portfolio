"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const PROJECTS = [
{
  id: "01",
  image: "/src/images/voxscribe.png", // update with your actual image path
  title: "VoxScribe",
  sub: "AI Transcription App",
  desc: "An AI-powered transcription application that converts audio & video to accurate text in real time with speaker detection, downloadable transcripts, and seamless export options. Built with modern tech for fast performance and clean UX.",
  features: [
    "AI-powered speech-to-text",
    "Speaker identification",
    "Downloadable transcripts",
    "Export to multiple formats",
  ],
  tech: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI APIs"],
  live: "https://voxscribe-ten.vercel.app/",
  github: "#", // add your GitHub repo link here
  year: "2025",
},
  {
    id: "02",
    image: "/src/images/macOS.png",
    title: "macOS Portfolio",
    sub: "Personal Developer Portfolio",
    desc: "A macOS-inspired interactive developer portfolio featuring smooth window animations, glassmorphism UI, and desktop-style navigation to showcase projects and skills.",
    features: [
      "macOS desktop-like experience",
      "Smooth animations & transitions",
      "Dark mode by default",
      "Fully responsive design",
    ],
    tech: [
      "React.js",
      "JavaScript",
      "Tailwind CSS",
      "Zustand",
      "Framer Motion",
    ],
    live: "https://navneet-macos-portfolio.netlify.app/",
    github: "https://github.com/NavneetPrasad1709/MacOS_Portfolio",
  },
  {
    id: "03",
    image: "/src/images/nexus.png",
    title: "Nexus Chat App",
    sub: "Full Stack Application",
    desc: "Production-grade real-time chat app with WebSocket messaging, JWT auth, group channels, DMs, and live typing indicators and Fully responsive design.",
    features: ["Real-time messaging", "JWT Auth", "Live presence", "Fully responsive design"],
    tech: ["React", "Node.js", "Socket.IO", "MongoDB"],
    live: "https://chatapp-ashen-eight.vercel.app",
    github: "https://github.com/NavneetPrasad1709/ChatApp",
    year: "2025",
  },
  {
    id: "04",
    image: "/src/images/pricepulse.png",
    title: "PricePulse",
    sub: "AI-Powered Price Tracking SaaS",
    desc: "Track product prices in real-time and get instant alerts when your target price is reached. Built with Supabase authentication and modern full-stack architecture.",
    features: [
      "Real-time price tracking",
      "Supabase Auth",
      "Server-side scraping",
      "Cloud deployment (Vercel)",
    ],
    tech: ["Next.js 14", "Supabase", "Cheerio", "PostgreSQL"],
    live: "https://pricepulse-ten.vercel.app",
    github: "https://github.com/NavneetPrasad1709/pricepulse",
    year: "2026",
  },
];

function Card({ p }: { p: (typeof PROJECTS)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-60, 60], [7, -7]), {
    stiffness: 150,
    damping: 25,
  });
  const ry = useSpring(useTransform(mx, [-60, 60], [7, -7]), {
    stiffness: 150,
    damping: 25,
  });

  // Only enable mouse tilt on non-touch devices
  const isTouchDevice = typeof window !== "undefined" &&
    window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  const onMove = (e: React.MouseEvent) => {
    if (isTouchDevice) return;
    const r = ref.current!.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: isTouchDevice ? 0 : rx,
        rotateY: isTouchDevice ? 0 : ry,
        transformStyle: "preserve-3d",
        perspective: 900,
      }}
      className="card group flex flex-col overflow-hidden"
    >
      {/* ── Project Image Banner ── */}
      <div className="relative h-40 md:h-48 flex-shrink-0 overflow-hidden">
        {/* Real project screenshot — replace src with p.image */}
        <img
          src={p.image}
          alt={`${p.title} preview`}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark gradient overlay for readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        {/* Year badge — bottom left */}
        {p.year && (
          <span
            className="absolute bottom-2 left-3 font-mono text-[10px] px-2 py-0.5 rounded"
            style={{
              background: "rgba(0,0,0,0.55)",
              color: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(4px)",
            }}
          >
            {p.year}
          </span>
        )}

        {/* Accent bottom strip — glows on hover */}
        <div
          className="absolute bottom-0 inset-x-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "var(--accent)" }}
        />
      </div>

      {/* ── Card Body ── */}
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <div className="mb-3">
          <div
            className="text-label mb-0.5"
            style={{ color: "var(--t-muted-extra)" }}
          >
            {p.sub}
          </div>
          <h3
            className="font-syne font-bold text-base transition-colors"
            style={{ color: "var(--t-bright)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--t-bright)")
            }
          >
            {p.title}
          </h3>
        </div>

        <p
          className="text-sm leading-relaxed mb-4 flex-1"
          style={{ color: "var(--t-medium)" }}
        >
          {p.desc}
        </p>

        <ul className="space-y-1 mb-5">
          {p.features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-2 text-xs"
              style={{ color: "var(--t-muted)" }}
            >
              <div
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: "var(--accent)" }}
              />
              {f}
            </li>
          ))}
        </ul>

        <div
          className="flex flex-wrap gap-1.5 pt-4 mb-4"
          style={{ borderTop: "1px solid var(--base-shade)" }}
        >
          {p.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] px-2 py-0.5 rounded border"
              style={{
                borderColor: "rgba(var(--accent-rgb), 0.2)",
                background: "rgba(var(--accent-rgb), 0.05)",
                color: "var(--t-muted)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* ── Permanent Live & GitHub buttons ── */}
        <div
          className="flex gap-3 pt-4"
          style={{ borderTop: "1px solid var(--base-shade)" }}
        >
          <motion.a
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 flex-1 justify-center py-2 rounded-lg border text-xs font-semibold transition-colors"
            style={{
              background: "var(--accent)",
              borderColor: "var(--accent)",
              color: "#000",
            }}
          >
            <ExternalLink size={13} />
            Live
          </motion.a>
          <motion.a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 flex-1 justify-center py-2 rounded-lg border text-xs font-semibold transition-colors"
            style={{
              background: "transparent",
              borderColor: "var(--base-shade)",
              color: "var(--t-medium)",
            }}
          >
            <Github size={13} />
            GitHub
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current) return;
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".pj"),
        { y: 56, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        },
      );
    })();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-py section-alt">
      <div className="wrap">
        <div className="text-label mb-3">Featured Work</div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <h2 className="text-section">
            Projects that{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
              ship.
            </em>
          </h2>
          <p
            className="text-sm max-w-xs md:text-right"
            style={{ color: "var(--t-muted)" }}
          >
            Impactful work across platforms, products, and systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map((p) => (
            <div key={p.id} className="pj opacity-0">
              <Card p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
