// Horloge massive gérée par un Web Worker (pour la précision) avec affichage des millisecondes.

'use client';

import React, { useEffect, useState } from 'react';
import { useMissionStore } from '../../store/useMissionStore';

export const GlobalCountdown = () => {
  const remainingSeconds = useMissionStore((state) => state.remainingSeconds);
  const status = useMissionStore((state) => state.status);
  const [centiSeconds, setCentiSeconds] = useState(0);

  useEffect(() => {
    const worker = new Worker('/workers/timerWorker.js');
    if (status === 'IN_PROGRESS' || status === 'EMERGENCY') {
      worker.postMessage('START');
    }

    worker.onmessage = () => {
      setCentiSeconds((prev) => (prev <= 0 ? 99 : prev - 1));
    };

    return () => {
      worker.postMessage('STOP');
      worker.terminate();
    };
  }, [status]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return {
      m: m.toString().padStart(2, '0'),
      s: s.toString().padStart(2, '0'),
      c: centiSeconds.toString().padStart(2, '0'),
    };
  };

  const time = formatTime(remainingSeconds);

  return (
    <div className="flex flex-col items-center bg-space-950/50 p-8 border-2 border-mission-cyan shadow-[0_0_30px_rgba(34,212,245,0.2)]">
      <div className="font-mono text-8xl md:text-9xl font-black flex gap-2">
        <span className="text-mission-cyan">{time.m}</span>
        <span className="animate-pulse opacity-50">:</span>
        <span className="text-mission-cyan">{time.s}</span>
        <span className="text-3xl self-end mb-4 text-mission-cyan/50 w-[60px]">{time.c}</span>
      </div>
      <div className="mt-2 text-xs tracking-[0.5em] uppercase text-mission-cyan/60">
        Time to Alunissage
      </div>
    </div>
  );
};
