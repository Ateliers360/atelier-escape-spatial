import { FrameCorner } from "./FrameCorner";

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-space-900/60 border-space-700 relative overflow-hidden border backdrop-blur-sm ${className}`}>
    <FrameCorner position="tl" className="opacity-40" />
    <FrameCorner position="br" className="opacity-40" />
    <div className="p-4">{children}</div>
  </div>
);
