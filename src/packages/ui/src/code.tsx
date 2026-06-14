export const Code = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <pre className={`bg-space-950 border-l-2 border-mission-green/40 p-3 font-mono text-xs text-mission-green shadow-inner ${className}`}>
    <code className="block animate-pulse-slow">
      {children}
    </code>
  </pre>
);
