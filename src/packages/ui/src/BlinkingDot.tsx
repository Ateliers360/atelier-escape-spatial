// LED de statut
'use client';

import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

interface BlinkingDotProps {
  variant?: 'nominal' | 'warning' | 'critical';
  className?: string;
}

export const BlinkingDot = ({ variant = 'nominal', className }: BlinkingDotProps) => {
  const colors = {
    nominal: 'bg-mission-green',
    warning: 'bg-mission-amber',
    critical: 'bg-mission-red',
  };

  return (
    <div className={cn("relative h-2 w-2", className)}>
      <motion.div
        animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className={cn("h-full w-full rounded-full shadow-[0_0_8px_currentColor]", colors[variant])}
      />
    </div>
  );
};
