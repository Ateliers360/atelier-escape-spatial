// Grille 2D (CSS Grid) représentant le terrain lunaire.
// Nous combinons la grille de terrain et l'indicateur du rover dans un même espace de coordonnées.
// La grille utilise un motif répétitif CSS et le rover est animé par Framer Motion.
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useMissionStore } from '../../store/useMissionStore';
import { Navigation } from 'lucide-react';

export const TacticalMapGrid = () => {
  // Supposons que notre store contienne la position du rover (x, y de 0 à 100) et son angle
  // Si non présent, on simule pour l'UI
  const roverPos = { x: 45, y: 30, heading: 120 };

  return (
    <div className="relative w-full aspect-square bg-space-950 border border-space-800 overflow-hidden rounded-sm">
      {/* Grille de fond tactique */}
      <div className="absolute inset-0 opacity-20"
           style={{ backgroundImage: 'radial-gradient(circle, #22d4f5 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* Lignes d'axes */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-mission-cyan/10" />
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-mission-cyan/10" />

      {/* Obstacles simulés (Cratères) */}
      <div className="absolute top-[20%] left-[60%] w-16 h-16 border border-mission-amber/30 rounded-full flex items-center justify-center">
        <span className="text-[8px] text-mission-amber font-mono uppercase">Zone Obstacle</span>
      </div>

      {/* Rover Pointer */}
      <motion.div
        className="absolute w-8 h-8 flex items-center justify-center z-10"
        animate={{
          left: `${roverPos.x}%`,
          top: `${roverPos.y}%`,
          rotate: roverPos.heading
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <Navigation className="text-mission-cyan fill-mission-cyan/20" size={24} />
        {/* Vecteur de direction */}
        <div className="absolute top-[-10px] w-[2px] h-4 bg-mission-cyan animate-pulse" />
      </motion.div>

      {/* Coordonnées en temps réel */}
      <div className="absolute bottom-2 right-2 font-mono text-[10px] text-mission-cyan bg-space-950/80 p-1">
        X: {roverPos.x.toFixed(2)} Y: {roverPos.y.toFixed(2)} HDG: {roverPos.heading}°
      </div>
    </div>
  );
};
