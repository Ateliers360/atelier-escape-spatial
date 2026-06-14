// Petit élément décoratif aux coins des panneaux pour renforcer l'aspect "interface militaire".

interface FrameCornerProps {
  position: 'tl' | 'tr' | 'bl' | 'br';
  className?: string;
}

export const FrameCorner = ({ position, className }: FrameCornerProps) => {
  const positions = {
    tl: 'top-0 left-0 border-t-2 border-l-2',
    tr: 'top-0 right-0 border-t-2 border-r-2',
    bl: 'bottom-0 left-0 border-b-2 border-l-2',
    br: 'bottom-0 right-0 border-b-2 border-r-2',
  };

  return (
    <div className={`absolute h-3 w-3 border-mission-cyan/40 ${positions[position]} ${className}`} />
  );
};
