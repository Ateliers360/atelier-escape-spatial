// Logique de déclenchement des alertes sonores et visuelles lors d'un incident.
'use client';

import { useEffect } from 'react';
import { useMissionStore } from '../store/useMissionStore';

export const useIncidentManager = () => {
  const incidents = useMissionStore((state) => state.incidents);
  const status = useMissionStore((state) => state.status);

  useEffect(() => {
    if (incidents.length > 0) {
      // 1. Alarme sonore (prévoir le fichier dans public/audio/alerts/)
      const alarm = new Audio('/audio/alerts/emergency.mp3');
      alarm.volume = 0.4;
      alarm.play().catch(() => {});

      // 2. Flash visuel sur l'écran
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 bg-mission-red/20 pointer-events-none z-[100] animate-pulse';
      document.body.appendChild(overlay);

      setTimeout(() => overlay.remove(), 2000);
    }
  }, [incidents.length]);

  useEffect(() => {
    if (status === 'EMERGENCY') {
       document.body.classList.add('shake-effect');
    } else {
       document.body.classList.remove('shake-effect');
    }
  }, [status]);
};
