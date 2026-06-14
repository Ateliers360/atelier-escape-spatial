// Badge utilisant une police monospace, fond sombre, texte contrasté pour les étiquettes (ex: T+ 00:45).
export const MonoBadge = (
  { children, className }: { children: React.ReactNode; className?: string },
) => (
  <span
    className={`bg-space-800 border border-mission-cyan/20 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-tighter text-mission-cyan/80 ${className}`}
  >
    {children}
  </span>
);
