"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-8 h-8" />;
  const isDark = theme === "dark";
  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileTap={{ scale: 0.9 }}
      className="w-8 h-8 flex items-center justify-center transition-colors"
      style={{ color: "var(--t-muted)" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--t-bright)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--t-muted)")}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
