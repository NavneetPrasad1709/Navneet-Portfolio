"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ borderTop: "1px solid var(--base-shade)", background: "var(--base-tint)" }}
    >
      <div className="wrap">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 py-7">
          <div className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded flex items-center justify-center text-white text-[9px] font-mono font-bold"
              style={{ background: "var(--accent)" }}
            >
              NP
            </div>
            <span className="text-sm font-syne" style={{ color: "var(--t-muted)" }}>Navneet Prasad</span>
          </div>

          <p className="font-mono text-[11px] order-last sm:order-none" style={{ color: "var(--t-muted-extra)" }}>
            © {new Date().getFullYear()} · Built with precision
          </p>

          <div className="flex items-center gap-4">
            {[
              { Icon: Github,   href: "https://github.com/NavneetPrasad1709" },
              { Icon: Linkedin, href: "https://linkedin.com/in/navneet-prasad8/" },
            
            ].map(({ Icon, href }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="transition-colors"
                style={{ color: "var(--t-muted-extra)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--t-bright)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t-muted-extra)")}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
