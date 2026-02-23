"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
}

export default function MagneticButton({ children, className = "", onClick, href, variant = "primary" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Magnetic pull effect uses mousemove which doesn't apply on touch,
    // but the motion.div with animate still runs spring physics that can
    // cause jank. Detect touch once on mount and disable entirely.
    setIsTouch(
      window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0
    );
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (isTouch) return;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    setPos({
      x: (e.clientX - (left + width / 2)) * 0.3,
      y: (e.clientY - (top + height / 2)) * 0.3,
    });
  };

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={isTouch ? undefined : { x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      whileHover={{ scale: isTouch ? 1 : 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`}
    >
      {children}
    </motion.div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : inner;
}
