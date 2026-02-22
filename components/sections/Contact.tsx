"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Send, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelectorAll(".cr"),
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 76%",
            once: true,
          },
        },
      );
    })();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");

    await fetch("https://formspree.io/f/xojnkggr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setState("done");
  };

  const SOCIALS = [
    {
      label: "GitHub",
      href: "https://github.com/NavneetPrasad1709",
      Icon: Github,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/navneet-prasad8/",
      Icon: Linkedin,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-py"
      style={{ background: "var(--base)" }}
    >
      <div className="wrap">
        <div className="cr text-label mb-3">Contact</div>

        <h2 className="cr text-section mb-4">
          Let's build something{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
            meaningful.
          </em>
        </h2>

        <p
          className="cr text-base mb-12 max-w-lg"
          style={{ color: "var(--t-medium)" }}
        >
          I'm open to software development roles, impactful projects, and
          thoughtful collaborations. I usually respond within 24 hours.
        </p>

        <div className="divider mb-12" />

        <div className="grid lg:grid-cols-2 gap-14">
          {/* ================= FORM ================= */}
          <div className="cr">
            <AnimatePresence mode="wait">
              {state === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center gap-4 py-16"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(var(--accent-rgb), 0.1)",
                      border: "1px solid rgba(var(--accent-rgb), 0.3)",
                    }}
                  >
                    <Send size={22} style={{ color: "var(--accent)" }} />
                  </div>

                  <div>
                    <div
                      className="font-semibold text-lg mb-1"
                      style={{ color: "var(--t-bright)" }}
                    >
                      Message received.
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "var(--t-muted)" }}
                    >
                      I'll be in touch within 24 hours.
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} className="space-y-4">
                  {[
                    { id: "name", label: "Name", type: "text", ph: "John Doe" },
                    {
                      id: "email",
                      label: "Email",
                      type: "email",
                      ph: "john@example.com",
                    },
                  ].map((f) => (
                    <div key={f.id}>
                      <label
                        className="block text-label mb-1.5"
                        style={{ color: "var(--t-muted)" }}
                      >
                        {f.label}
                      </label>

                      <input
                        type={f.type}
                        required
                        placeholder={f.ph}
                        value={(form as any)[f.id]}
                        onChange={(e) =>
                          setForm({ ...form, [f.id]: e.target.value })
                        }
                        className="form-input"
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      className="block text-label mb-1.5"
                      style={{ color: "var(--t-muted)" }}
                    >
                      Message
                    </label>

                    <textarea
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="form-input resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={state === "sending"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-primary w-full justify-center disabled:opacity-50"
                  >
                    {state === "sending" ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Send size={14} /> Send Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* ================= INFO COLUMN ================= */}
          <div className="cr space-y-8">
            <div>
              <div
                className="text-label mb-2"
                style={{ color: "var(--t-muted)" }}
              >
                Direct Contact
              </div>

              <a
                href="mailto:Navneetprasad1709@gmail.com"
                className="font-mono text-sm flex items-center gap-1.5 text-[var(--t-bright)] hover:text-[var(--accent)] transition-colors"
              >
                Navneetprasad1709@gmail.com
                <ArrowUpRight size={13} />
              </a>

              <a
                href="tel:+917210297756"
                className="font-mono text-sm block mt-2 text-[var(--t-bright)] hover:text-[var(--accent)] transition-colors"
              >
                +91 7210297756
              </a>
            </div>

            <div>
              <div
                className="text-label mb-4"
                style={{ color: "var(--t-muted)" }}
              >
                Find me on
              </div>

              <div className="space-y-3">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-[var(--t-medium)] hover:text-[var(--accent)] transition-colors"
                  >
                    <Icon size={16} />
                    <span className="text-sm">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div
              className="rounded-xl p-5 border"
              style={{
                background: "rgba(var(--accent-rgb), 0.06)",
                borderColor: "rgba(var(--accent-rgb), 0.22)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-green-400">
                  Available
                </span>
              </div>

              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--t-medium)" }}
              >
                Open to frontend, backend, and full-stack roles, as well as
                product development projects worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
