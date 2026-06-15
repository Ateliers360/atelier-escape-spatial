// Jauge d'oxygène pour afficher le niveau de pression atmosphérique.
// Jauge circulaire (Ring Chart).
// Effet : Segmenter la jauge en "blocs" pour un look digital rétro.
// *Utilisant Recharts ou Chart.js avec des styles personnalisés.*
'use client';

import { motion } from 'framer-motion';

export const OxygenGauge = ({ value }: { value: number }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const progress = value / 100;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="relative flex items-center justify-center w-32 h-32">
      <svg className="w-full h-full -rotate-90">
        {/* Background track (segments) */}
        <circle
          cx="64" cy="64" r={radius}
          fill="none" stroke="currentColor"
          strokeWidth="8" strokeDasharray="4, 2"
          className="text-space-800"
        />
        {/* Progress bar */}
        <motion.circle
          cx="64" cy="64" r={radius}
          fill="none" stroke="currentColor"
          strokeWidth="8" strokeDasharray={`${circumference} ${circumference}`}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="butt"
          className={value < 20 ? "text-mission-red" : "text-mission-cyan"}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-mono font-bold">{value.toFixed(0)}%</span>
        <span className="text-[8px] uppercase tracking-widest text-mission-cyan/50">Oxygen</span>
      </div>
    </div>
  );
};
