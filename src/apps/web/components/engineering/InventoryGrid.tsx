// Tableau minimaliste listant les pièces de rechange avec un compteur d'inventaire.
'use client';

import React from 'react';
import { MonoBadge } from '@repo/ui/MonoBadge';

const SPARE_PARTS = [
  { id: 'f-10', name: 'Fusible 10A', qty: 4, critical: false },
  { id: 'c-ir', name: 'Capteur Infra-Rouge', qty: 1, critical: true },
  { id: 'pla-2', name: 'Filament PLA-HT', qty: 2, unit: 'kg', critical: false },
  { id: 'j-cb', name: 'Câbles Jumper', qty: 12, critical: false },
];

export const InventoryGrid = () => {
  return (
    <div className="w-full overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-space-800 text-[9px] uppercase opacity-50 font-mono">
            <th className="pb-2">Composant</th>
            <th className="pb-2 text-center">Quantité</th>
            <th className="pb-2 text-right">Statut</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {SPARE_PARTS.map((part) => (
            <tr key={part.id} className="border-b border-space-800/30 hover:bg-space-800/20 transition-colors">
              <td className="py-3 font-medium">{part.name}</td>
              <td className="py-3 text-center font-mono">
                {part.qty}{part.unit || ''}
              </td>
              <td className="py-3 text-right">
                {part.critical ? (
                  <MonoBadge className="bg-mission-red/20 text-mission-red border-mission-red/30">Stock Critique</MonoBadge>
                ) : (
                  <MonoBadge>Disponible</MonoBadge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 p-2 bg-mission-cyan/5 border border-mission-cyan/10 text-[9px] uppercase text-mission-cyan/60 flex justify-between">
        <span>Dernier inventaire : T+ 00:42:15</span>
        <span className="animate-pulse">Sync avec Base Lunaire OK</span>
      </div>
    </div>
  );
};
