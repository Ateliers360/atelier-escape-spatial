// Sert de composant pour `TrajectoryParamsForm` et `OrbitCanvas`.

export const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`bg-space-900 border-mission-cyan/30 text-mission-cyan focus:border-mission-cyan focus:shadow-[0_0_10px_rgba(34,212,245,0.3)] w-full border p-2 font-mono outline-none transition-all ${className}`}
    {...props}
  />
);

