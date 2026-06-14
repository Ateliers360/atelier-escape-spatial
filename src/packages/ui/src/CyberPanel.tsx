// Panneau avec bordures lumineuses
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CyberPanelProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  variant?: 'nominal' | 'warning' | 'critical';
  className?: string;
  containerClassName?: string;
}

export const CyberPanel = ({
  children,
  title,
  subtitle,
  icon: Icon,
  variant = 'nominal',
  className,
  containerClassName,
}: CyberPanelProps) => {

  const variants = {
    nominal: {
      border: 'border-mission-cyan/30',
      glow: 'shadow-[0_0_15px_rgba(34,212,245,0.1)]',
      text: 'text-mission-cyan',
      bg: 'bg-space-900/80',
      accent: 'bg-mission-cyan',
    },
    warning: {
      border: 'border-mission-amber/40',
      glow: 'shadow-[0_0_15px_rgba(245,168,34,0.15)]',
      text: 'text-mission-amber',
      bg: 'bg-space-900/90',
      accent: 'bg-mission-amber',
    },
    critical: {
      border: 'border-mission-red/50',
      glow: 'shadow-[0_0_20px_rgba(245,74,34,0.2)]',
      text: 'text-mission-red',
      bg: 'bg-mission-red/5',
      accent: 'bg-mission-red',
    },
  };

  const v = variants[variant];

  // Définition du clip-path pour le biseau (Cyber Style)
  const cyberClipPath = "polygon(0% 0%, calc(100% - 20px) 0%, 100% 20px, 100% 100%, 0% 100%)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ clipPath: cyberClipPath }} // Utilisation de l'attribut style standard
      className={cn(
        "relative flex flex-col overflow-hidden border backdrop-blur-md",
        v.border,
        v.glow,
        v.bg,
        containerClassName
      )}
    >
      {/* Header */}
      {(title || Icon) && (
        <div className={cn(
          "flex items-center justify-between border-b px-4 py-2",
          v.border,
          "bg-space-950/50"
        )}>
          <div className="flex items-center gap-3">
            {Icon && <Icon className={cn("h-4 w-4", v.text)} />}
            <div className="flex flex-col">
              <span className={cn("text-xs font-bold uppercase tracking-wider", v.text)}>
                {title}
              </span>
              {subtitle && (
                <span className="text-[10px] uppercase opacity-50 font-mono">
                  {subtitle}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <div className={cn("h-1 w-4 rounded-full opacity-30", v.accent)} />
            <div className={cn("h-1 w-1 rounded-full animate-pulse", v.accent)} />
          </div>
        </div>
      )}

      {/* Content */}
      <div className={cn("relative flex-1 p-4", className)}>
        <div className={cn("absolute top-0 left-0 h-1 w-1 border-t border-l", v.border)} />
        {children}
      </div>

      {/* Footer Decoration */}
      <div className={cn("h-1 w-full flex", v.border, "border-t opacity-20")}>
        <div className={cn("h-full w-1/3", v.accent)} />
      </div>
    </motion.div>
  );
};
