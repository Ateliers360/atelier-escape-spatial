// Texte néon avec effet de glow
import React from 'react';

interface Props {
  children: React.ReactNode;
  variant?: 'nominal' | 'warning' | 'critical';
  className?: string;
}

export const DigitalGlowText = ({ children, variant = 'nominal', className }: Props) => {
  const colors = {
    nominal: 'text-mission-cyan shadow-[0_0_10px_rgba(34,212,245,0.5)]',
    warning: 'text-mission-amber shadow-[0_0_10px_rgba(245,168,34,0.5)]',
    critical: 'text-mission-red animate-flicker shadow-[0_0_10px_rgba(245,74,34,0.5)]',
  };

  return (
    <span className={`font-mono font-bold uppercase ${colors[variant]} ${className}`}>
      {children}
    </span>
  );
};
