// Slider component

export const Slider = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    type="range"
    className={`h-1.5 w-full cursor-pointer appearance-none bg-space-800 accent-mission-cyan hover:accent-mission-cyan/80 ${className}`}
    {...props}
  />
);
