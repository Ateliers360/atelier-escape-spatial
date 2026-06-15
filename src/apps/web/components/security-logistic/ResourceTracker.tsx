// Tableau listant les ressources critiques (O2, Eau, Nourriture, ...) avec des barres de progression et des alertes de seuil.
// Utiliser le contexte de mission pour afficher les ressources et leur statut.
'use client';

import React from 'react';
import { useMissionStore } from '../../store/useMissionStore';

const RESOURCES = [
  { id: 'o2', name: 'Oxygène (O2)', unit: 'L', threshold: 20 },
  { id: 'h2o', name: 'Eau Potable', unit: 'L', threshold: 15 },
  { id: 'food', name: 'Rations', unit: 'U', threshold: 5 },
  { id: 'energy', name: 'Énergie', unit: '%', threshold: 25 },
];

export const ResourceTracker = () => {
  // On simule des valeurs (à lier au store de mission plus tard)
  const values: Record<string, number> = { o2: 85, h2o: 12, food: 45, energy: 30 };

  const { status } = useMissionStore();

  if (status !== "IN_PROGRESS") {
    //return null;
  }

  // On affiche uniquement si la mission est en cours

  return (
    <div className="space-y-6">
      {RESOURCES.map((res) => {
        const val = values[res.id] ?? 0;
        const isCritical = val <= res.threshold;

        return (
          <div key={res.id} className="space-y-2">
            <div className="flex justify-between items-end font-mono">
              <span className="text-xs uppercase opacity-70">{res.name}</span>
              <span className={`text-sm font-bold ${isCritical ? 'text-mission-red animate-pulse' : 'text-mission-cyan'}`}>
                {val}{res.unit}
              </span>
            </div>

            <div className="h-3 w-full bg-space-800 flex gap-0.5 p-0.5 border border-space-700">
              {/* Barre segmentée style rétro */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 ${
                    i < (val / 5)
                      ? (isCritical ? 'bg-mission-red' : 'bg-mission-cyan')
                      : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
