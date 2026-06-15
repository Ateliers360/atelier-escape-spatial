// Barre de progression horizontale avec des étapes cliquables (Steppers) et état "Done / In-Progress / Locked".
// Utiliser le contexte de mission pour afficher les étapes et leur statut.
'use client';

import React from 'react';
import { useMissionStore } from '../../store/useMissionStore';
import { motion } from 'framer-motion';

const PHASES = [
  { id: 1, label: 'Briefing' },
  { id: 2, label: 'Calculs' },
  { id: 3, label: 'Prototypage' },
  { id: 4, label: 'Code' },
  { id: 5, label: 'Atterrissage' }
];

export const MissionTimeline = () => {
  const currentPhase = useMissionStore((state) => state.currentPhase);

  return (
    <div className="w-full flex items-center gap-4 px-10 py-6">
      {PHASES.map((phase, idx) => {
        const isDone = currentPhase > phase.id;
        const isCurrent = currentPhase === phase.id;

        return (
          <React.Fragment key={phase.id}>
            <div className="flex flex-col items-center gap-2 relative">
              <div className={`
                w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold transition-all
                ${isDone ? 'bg-mission-cyan border-mission-cyan text-space-950' :
                  isCurrent ? 'border-mission-cyan text-mission-cyan animate-pulse shadow-[0_0_15px_#22d4f5]' :
                  'border-space-700 text-space-700'}
              `}>
                {isDone ? '✓' : phase.id}
              </div>
              <span className={`text-[10px] uppercase absolute -bottom-6 whitespace-nowrap tracking-widest ${isCurrent ? 'text-mission-cyan' : 'text-space-700'}`}>
                {phase.label}
              </span>
            </div>
            {idx !== PHASES.length - 1 && (
              <div className="flex-1 h-[2px] bg-space-800 relative">
                {isDone && <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="h-full bg-mission-cyan" />}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
