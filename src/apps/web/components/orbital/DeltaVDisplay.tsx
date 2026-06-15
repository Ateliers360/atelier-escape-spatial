// Calculateur dynamique affichant la différence de vitesse requise par rapport à la trajectoire cible.
'use client';

import { useMissionStore } from '../../store/useMissionStore';
import { motion, AnimatePresence } from 'framer-motion';

export const DeltaVDisplay = () => {
  const { velocity } = useMissionStore((s) => s.telemetry);

  // On simule un delta-v cible (ex: pour l'alunissage on veut réduire la vitesse)
  const targetVelocity = 1.5; // m/s pour un toucher doux
  const deltaV = velocity - targetVelocity;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-space-950/30 rounded border border-mission-cyan/10">
      <div className="text-[10px] text-mission-cyan/50 uppercase tracking-widest mb-1">
        Δv Requis (Maneuver)
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={deltaV}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-4xl font-mono font-bold ${deltaV > 500 ? 'text-mission-red' : 'text-mission-cyan'}`}
        >
          {deltaV.toFixed(1)} <span className="text-sm font-normal opacity-50">M/S</span>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 w-full grid grid-cols-2 gap-2 text-[9px] font-mono uppercase opacity-60">
        <div className="bg-space-800 p-1 flex justify-between">
          <span>Current:</span>
          <span>{velocity.toFixed(1)}</span>
        </div>
        <div className="bg-space-800 p-1 flex justify-between">
          <span>Target:</span>
          <span>{targetVelocity}</span>
        </div>
      </div>
    </div>
  );
};
