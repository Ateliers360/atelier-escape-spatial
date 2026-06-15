// Image SVG interactive du vaisseau.
//  Temps réel : Les zones du SVG changent de couleur (Fill) selon les données de santé reçues.

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useMissionStore } from '../../store/useMissionStore';

export const ModuleSchematic = () => {
  // On récupère l'état de santé simulé ou réel des systèmes
  // Dans notre store, nous avions un tableau 'systemHealth' ou des propriétés individuelles
  const { telemetry } = useMissionStore();

  // Fonction utilitaire pour obtenir la couleur CSS selon le pourcentage
  const getStatusColor = (value: number) => {
    if (value > 80) return '#22d4f5'; // Cyan
    if (value > 40) return '#f5a822'; // Orange
    return '#f54a22'; // Rouge
  };

  return (
    <div className="relative flex items-center justify-center h-full p-4">
      <svg viewBox="0 0 200 300" className="h-full w-auto drop-shadow-[0_0_10px_rgba(34,212,245,0.2)]">
        {/* Antenne / Comms */}
        <motion.path
          d="M100 20 L100 50 M85 35 Q100 25 115 35"
          stroke={getStatusColor(85)}
          strokeWidth="3"
          fill="none"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Corps principal (Capsule) */}
        <path
          d="M60 150 L140 150 L125 60 L75 60 Z"
          fill="rgba(6, 12, 20, 0.8)"
          stroke="#1e3a5a"
          strokeWidth="2"
        />

        {/* Zone Avionique / Ordinateur */}
        <motion.rect
          x="80" y="80" width="40" height="30"
          fill={getStatusColor(95)}
          fillOpacity="0.2"
          stroke={getStatusColor(95)}
          strokeWidth="1"
        />

        {/* Réservoirs de Carburant (Latéraux) */}
        <motion.path
          d="M50 140 Q40 180 55 220 L65 220 L60 140 Z"
          fill={getStatusColor(telemetry.fuel)}
          fillOpacity="0.3"
          stroke={getStatusColor(telemetry.fuel)}
          strokeWidth="2"
        />
        <motion.path
          d="M150 140 Q160 180 145 220 L135 220 L140 140 Z"
          fill={getStatusColor(telemetry.fuel)}
          fillOpacity="0.3"
          stroke={getStatusColor(telemetry.fuel)}
          strokeWidth="2"
        />

        {/* Moteur Principal (Bas) */}
        <motion.path
          d="M80 220 L120 220 L130 260 L70 260 Z"
          fill={getStatusColor(telemetry.velocity > 0 ? 90 : 40)}
          fillOpacity="0.4"
          stroke={getStatusColor(90)}
          strokeWidth="2"
        />

        {/* Jambes d'alunissage */}
        <path d="M65 220 L30 280 M135 220 L170 280" stroke="#4a7aaa" strokeWidth="4" strokeLinecap="round" />
        <path d="M20 280 L40 280 M160 280 L180 280" stroke="#4a7aaa" strokeWidth="2" />
      </svg>

      {/* Légendes flottantes */}
      <div className="absolute top-10 right-10 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-mission-cyan" />
          <span className="text-[10px] uppercase opacity-60">Communications</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-mission-amber" />
          <span className="text-[10px] uppercase opacity-60">Propulsion</span>
        </div>
      </div>
    </div>
  );
};
