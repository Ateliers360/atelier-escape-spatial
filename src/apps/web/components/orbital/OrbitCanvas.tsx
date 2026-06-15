// Un composant utilisant `Three.js` ou `HTML5 Canvas` pour dessiner la trajectoire du module autour de la lune.
// Le module est dessiné en utilisant des points 3D.
'use client';

import React, { useRef, useEffect } from 'react';
import { useMissionStore } from '../../store/useMissionStore';

export const OrbitCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { altitude } = useMissionStore((s) => s.telemetry);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const { width, height } = canvas;
      const centerX = width / 2;
      const centerY = height / 2;
      const moonRadius = 60;

      ctx.clearRect(0, 0, width, height);

      // 1. Dessin de la Lune (Vector Style)
      ctx.beginPath();
      ctx.arc(centerX, centerY, moonRadius, 0, Math.PI * 2);
      ctx.strokeStyle = '#4a7aaa';
      ctx.lineWidth = 1;
      ctx.stroke();
      // Ombrage léger
      ctx.fillStyle = 'rgba(10, 18, 32, 0.8)';
      ctx.fill();

      // 2. Orbite de référence (Dashed line)
      ctx.beginPath();
      ctx.setLineDash([5, 10]);
      ctx.arc(centerX, centerY, moonRadius + 100, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(34, 212, 245, 0.2)';
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. Calcul de la position du module (selon altitude)
      // On simule une rotation lente en plus de l'altitude
      const time = Date.now() * 0.0005;
      const orbitRadius = moonRadius + (altitude / 500); // Mise à l'échelle visuelle
      const moduleX = centerX + Math.cos(time) * orbitRadius;
      const moduleY = centerY + Math.sin(time) * orbitRadius;

      // 4. Trajectoire de descente prévue
      ctx.beginPath();
      ctx.moveTo(moduleX, moduleY);
      ctx.quadraticCurveTo(centerX + moonRadius + 20, centerY - 20, centerX - 30, centerY - moonRadius);
      ctx.strokeStyle = 'rgba(245, 168, 34, 0.4)';
      ctx.stroke();

      // 5. Le Module (Vaisseau)
      ctx.fillStyle = '#22d4f5';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#22d4f5';
      ctx.fillRect(moduleX - 3, moduleY - 3, 6, 6);
      ctx.shadowBlur = 0;

      // Étiquette Altitude
      ctx.font = '10px JetBrains Mono';
      ctx.fillText(`${altitude.toFixed(0)} KM`, moduleX + 10, moduleY);

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [altitude]);

  return (
    <div className="relative h-full w-full bg-space-950/50 rounded-lg border border-space-800 overflow-hidden">
      <canvas ref={canvasRef} width={400} height={400} className="h-full w-full" />
      <div className="absolute top-2 left-2 pointer-events-none">
        <div className="text-[10px] text-mission-cyan opacity-50 uppercase font-mono">Orbital Map v1.0</div>
      </div>
    </div>
  );
};
