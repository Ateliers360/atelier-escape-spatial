// src/packages/ui/src/button.tsx
// Bouton style cokpit, avec un effet de survol lumineux et un état "disabled" grisé.
'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// On utilise HTMLMotionProps pour éviter les conflits d'évènements
interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: 'nominal' | 'warning' | 'critical';
  appName?: string;
}

export const Button = ({ children, variant = 'nominal', className, appName, ...props }: ButtonProps) => {
  const colors = {
    nominal: 'border-mission-cyan/50 text-mission-cyan hover:bg-mission-cyan/10 shadow-mission-cyan/20',
    warning: 'border-mission-amber/50 text-mission-amber hover:bg-mission-amber/10 shadow-mission-amber/20',
    critical: 'border-mission-red/50 text-mission-red hover:bg-mission-red/10 shadow-mission-red/20',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative border-2 px-4 py-2 font-mono text-sm font-bold uppercase tracking-widest transition-all",
        "disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_15px_currentColor]",
        colors[variant],
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/5 pointer-events-none" />
      {children}
    </motion.button>
  );
};
