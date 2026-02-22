import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import SmoothScroll from "@/components/ui/SmoothScroll";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Navneet Prasad — Software Developer",
  description:
    "Senior Frontend Architect crafting high-performance, beautifully designed web applications. 6+ years, 40+ projects, 5M+ users.",
  keywords: [
    "Frontend Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Navneet Prasad" }],
  openGraph: {
    title: "Navneet Prasad — Software Developer",
    description:
      "Building interactive digital experiences with precision and craft.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
