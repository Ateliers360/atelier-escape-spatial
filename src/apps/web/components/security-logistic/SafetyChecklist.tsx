// Liste de contrôle pré-séance avec des cases à cocher et un bouton de validation.
// Utiliser le contexte de mission pour afficher les contrôle et leur statut.
'use client';

import React, { useState } from 'react';
import { Button } from '@repo/ui/button';
import { CheckSquare, Square } from 'lucide-react';

const CHECKS = [
  { id: 'c1', label: 'Verrouillage des écoutilles de survie' },
  { id: 'c2', label: 'Initialisation du protocole anti-incendie' },
  { id: 'c3', label: 'Calibration des capteurs de pression' },
  { id: 'c4', label: 'Vérification des stocks d\'oxygène de secours' },
];

export const SafetyChecklist = () => {
  const [checked, setChecked] = useState<string[]>([]);

  const toggleCheck = (id: string) => {
    setChecked(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isComplete = checked.length === CHECKS.length;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {CHECKS.map((check) => (
          <div
            key={check.id}
            onClick={() => toggleCheck(check.id)}
            className="flex items-center gap-3 p-3 bg-space-950/20 border border-space-800 cursor-pointer hover:bg-space-800/30 transition-all"
          >
            {checked.includes(check.id) ? (
              <CheckSquare className="text-mission-green" size={18} />
            ) : (
              <Square className="text-space-700" size={18} />
            )}
            <span className={`text-xs uppercase font-mono ${checked.includes(check.id) ? 'opacity-100' : 'opacity-40'}`}>
              {check.label}
            </span>
          </div>
        ))}
      </div>

      <Button
        variant={isComplete ? 'nominal' : 'critical'}
        disabled={!isComplete}
        className="w-full py-4 text-xs tracking-[0.2em]"
      >
        {isComplete ? 'CONFIRMER SÉCURITÉ VOL' : 'PROTOCOLE INCOMPLET'}
      </Button>
    </div>
  );
};
