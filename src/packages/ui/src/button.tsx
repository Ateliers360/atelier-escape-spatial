// Bouton style cokpit, avec un effet de survol lumineux et un état "disabled" grisé.
'use client';

import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'nominal' | 'warning' | 'critical';
  appName?: string; // Pour compatibilité avec votre code existant
}

export const Button = ({ children, variant = 'nominal', className, ...props }: ButtonProps) => {
  const colors = {
    nominal: 'border-mission-cyan/50 text-mission-cyan hover:bg-mission-cyan/10 shadow-mission-cyan/20',
    warning: 'border-mission-amber/50 text-mission-amber hover:bg-mission-amber/10 shadow-mission-amber/20',
    critical: 'border-mission-red/50 text-mission-red hover:bg-mission-red/10 shadow-mission-red/20',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative border-2 px-4 py-2 font-mono text-sm font-bold uppercase tracking-widest transition-all hover:shadow-[0_0_15px_currentColor] disabled:opacity-30 ${colors[variant]} ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/5" />
      {children}
    </motion.button>
  );
};
