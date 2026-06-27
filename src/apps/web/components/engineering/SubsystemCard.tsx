// Carte unitaire affichant (Nom, % de santé, icône, bouton de diagnostic).
'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button, BlinkingDot } from '@repo/ui';

interface SubsystemCardProps {
  name: string;
  health: number;
  icon: LucideIcon;
  onDiagnostic: () => void;
}

export const SubsystemCard = ({ name, health, icon: Icon, onDiagnostic }: SubsystemCardProps) => {
  const variant = health > 80 ? 'nominal' : health > 40 ? 'warning' : 'critical';

  return (
    <div className="bg-space-900/50 border border-space-800 p-4 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={`p-2 bg-space-800 rounded ${variant === 'critical' ? 'text-mission-red' : 'text-mission-cyan'}`}>
            <Icon size={18} />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wide">{name}</h3>
            <div className="flex items-center gap-2">
              <BlinkingDot variant={variant} />
              <span className="text-[10px] opacity-50 uppercase">{variant}</span>
            </div>
          </div>
        </div>
        <span className="font-mono text-lg">{health}%</span>
      </div>

      {/* Barre de santé segmentée */}
      <div className="flex gap-1 h-1.5">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`flex-1 ${i < health / 10 ? (variant === 'critical' ? 'bg-mission-red' : 'bg-mission-cyan') : 'bg-space-800'}`}
          />
        ))}
      </div>

      <Button
        variant={variant === 'nominal' ? 'nominal' : variant}
        className="text-[10px] py-1 h-8"
        onClick={onDiagnostic}
      >
        Lancer Diagnostic
      </Button>
    </div>
  );
};
