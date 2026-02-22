interface SectionLabelProps { children: React.ReactNode; }
export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-label mb-4"
      style={{
        borderColor: "rgba(var(--accent-rgb), 0.3)",
        background: "rgba(var(--accent-rgb), 0.07)",
        color: "var(--accent)",
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
      {children}
    </div>
  );
}
