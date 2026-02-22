# 🚀 Navneet Prasad — Premium Developer Portfolio

A premium personal developer portfolio built with **Next.js 14**, **Tailwind CSS**, **GSAP**, and **Framer Motion** — inspired by the Rayo Digital Agency aesthetic.

---

## ✨ Features

- 🎨 Dark & Light mode with animated toggle
- ⚡ GSAP ScrollTrigger animations & parallax
- 🖱️ Framer Motion micro-interactions & tilt effects
- 🧲 Magnetic button hover effects
- 📱 Fully responsive (mobile, tablet, desktop)
- 🔍 SEO-optimized with Next.js metadata
- 🎯 Glassmorphism header with scroll detection
- ✍️ Stagger text reveal animations
- 🃏 3D card tilt on project cards
- ⏳ Animated timeline (experience & education)
- 💌 Contact form with animated states

---

## 📁 Project Structure

\`\`\`
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata + fonts
│   └── page.tsx            # Main page assembling all sections
├── components/
│   ├── sections/
│   │   ├── Header.tsx      # Sticky glass header + mobile menu
│   │   ├── Hero.tsx        # 50/50 split hero with GSAP stagger
│   │   ├── About.tsx       # Story + trait cards
│   │   ├── Skills.tsx      # Skill groups + education timeline
│   │   ├── Experience.tsx  # Vertical work history timeline
│   │   ├── Projects.tsx    # 2-col grid with tilt effect
│   │   ├── Contact.tsx     # Form + social links
│   │   └── Footer.tsx      # Minimal footer
│   └── ui/
│       ├── ThemeProvider.tsx
│       ├── ThemeToggle.tsx
│       ├── MagneticButton.tsx
│       └── SectionLabel.tsx
├── lib/
│   ├── projects.ts         # Sample project data
│   └── experience.ts       # Sample experience + education data
├── styles/
│   └── globals.css         # CSS variables, utilities, animations
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
└── package.json
\`\`\`

---

#
## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| GSAP + ScrollTrigger | Scroll animations & parallax |
| Framer Motion | Micro-interactions & transitions |
| next-themes | Dark/light mode |
| Lucide React | Icons |

---

Built with 💜 — modify freely, deploy with pride.
