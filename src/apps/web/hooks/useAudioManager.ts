'use client';

import { useEffect, useRef } from 'react';
import { useMissionStore } from '../store/useMissionStore';

export const useAudioManager = () => {
  const { status, telemetry } = useMissionStore();
  const ambientRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 1. Musique d'ambiance (Vibration de vaisseau)
    if (!ambientRef.current) {
      ambientRef.current = new Audio('/audio/ambient/vessel-hum.mp3');
      ambientRef.current.loop = true;
      ambientRef.current.volume = 0.2;
    }

    if (status === 'IN_PROGRESS' || status === 'EMERGENCY') {
      ambientRef.current.play().catch(() => {});
    } else {
      ambientRef.current.pause();
    }

    // 2. Alerte de proximité (Bip-bip quand l'altitude est basse)
    if (telemetry.altitude < 1000 && telemetry.altitude > 0) {
      const beep = new Audio('/audio/alerts/proximity-beep.mp3');
      beep.volume = 0.3;
      beep.play().catch(() => {});
    }
  }, [status, telemetry.altitude]);

  // 3. Effet sonore pour les crashs / atterrissages
  useEffect(() => {
    if (telemetry.altitude <= 0) {
      const soundFile = telemetry.velocity > 5 ? '/audio/sfx/crash.mp3' : '/audio/sfx/landed-success.mp3';
      const sfx = new Audio(soundFile);
      sfx.play().catch(() => {});
    }
  }, [telemetry.altitude, telemetry.velocity]);
};
