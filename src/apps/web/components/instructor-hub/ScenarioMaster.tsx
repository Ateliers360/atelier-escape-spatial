// Sélecteur d'incidents prédéfinis (Panne moteur, Fuite O2, etc.) avec bouton "Trigger Incident" pour chaque incident.
// Utiliser le contexte de mission pour afficher les incidents et leur statut.
'use client';

import React from 'react';
import { Button } from '@repo/ui';
import { Flame, WifiOff, Zap, Wind } from 'lucide-react';

const PRESETS = [
  { id: 'fuel_leak', label: 'Fuite Carburant', icon: Flame, severity: 'CRITICAL', desc: 'Consommation x5 pendant 2 min' },
  { id: 'comm_blackout', label: 'Blackout Radio', icon: WifiOff, severity: 'MEDIUM', desc: 'Coupe le RadioLog Terminal' },
  { id: 'solar_flare', label: 'Éruption Solaire', icon: Zap, severity: 'MEDIUM', desc: 'Parasites sur tous les écrans' },
  { id: 'o2_drop', label: 'Chute Oxygène', icon: Wind, severity: 'CRITICAL', desc: 'Active l\'alarme sonore O2' },
];

export const ScenarioMaster = () => {
  const triggerEvent = (id: string) => {
    console.log(`Scenario: Triggering ${id}`);
    // socket.emit('admin_trigger_incident', { incidentId: id });
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      {PRESETS.map((event) => (
        <div key={event.id} className="group relative bg-space-900 border border-space-700 p-3 hover:border-mission-amber transition-colors">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded bg-space-800 ${event.severity === 'CRITICAL' ? 'text-mission-red' : 'text-mission-amber'}`}>
              <event.icon size={20} />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold uppercase">{event.label}</div>
              <div className="text-[10px] opacity-40 italic">{event.desc}</div>
            </div>
            <Button
              variant={event.severity === 'CRITICAL' ? 'critical' : 'warning'}
              onClick={() => triggerEvent(event.id)}
              className="text-[10px] py-1 h-8"
            >
              Lancer
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
