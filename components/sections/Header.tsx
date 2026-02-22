"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const NAV = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${
          scrolled ? "glass border-b" : ""
        }`}
        style={scrolled ? { borderColor: "var(--base-shade)" } : {}}
      >
        <div className="wrap">
          <div className="flex items-center justify-between h-16 md:h-[4.5rem]">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2.5 group">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-white text-[10px] font-mono font-bold"
                style={{ background: "var(--accent)" }}
              >
                AR
              </div>
              <span className="font-syne text-sm font-semibold tracking-tight" style={{ color: "var(--t-bright)" }}>
                Navneet Prasad
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} className="nav-link">{n.label}</a>
              ))}
            </nav>

            {/* Icons */}
            <div className="hidden md:flex items-center gap-4">
              {[
                { Icon: Github, href: "https://github.com", label: "GitHub" },
                { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -1 }}
                  style={{ color: "var(--t-muted)" }}
                  className="hover:text-[var(--t-bright)] transition-colors"
                  aria-label={label}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
              <div className="w-px h-4" style={{ background: "var(--base-shade)" }} />
              <ThemeToggle />
            </div>

            {/* Mobile */}
            <div className="flex md:hidden items-center gap-3">
              <ThemeToggle />
              <motion.button
                onClick={() => setOpen(!open)}
                whileTap={{ scale: 0.9 }}
                style={{ color: "var(--t-medium)" }}
                aria-label="Menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={open ? "x" : "m"}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.15 }}
                  >
                    {open ? <X size={20} /> : <Menu size={20} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden glass"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2 pt-16">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="font-syne text-3xl font-bold py-3 transition-colors"
                  style={{ color: "var(--t-bright)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t-bright)")}
                >
                  {n.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-5 mt-8"
              >
                <a href="https://github.com/NavneetPrasad1709/NavneetPrasad1709" target="_blank" rel="noopener noreferrer"
                  style={{ color: "var(--t-muted)" }}><Github size={20} /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                  style={{ color: "var(--t-muted)" }}><Linkedin size={20} /></a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
