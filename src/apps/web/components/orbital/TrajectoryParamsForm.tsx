// Groupe d'inputs (Sliders néon) pour modifier la masse, la poussée et l'angle.
// Sert de composant pour `OrbitCanvas`.

'use client';

import { useState } from 'react';
import { Slider } from '@repo/ui/Slider';
import { Button } from '@repo/ui/button';
import { useTranslations } from 'next-intl';

export const TrajectoryParamsForm = () => {
  const t = useTranslations('Orbital');
  const [params, setParams] = useState({
    thrust: 40,
    angle: 12,
    mass: 1500
  });

  return (
    <div className="space-y-6 p-2">
      {/* Poussée Moteur */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <label className="text-xs uppercase text-mission-cyan opacity-70">Poussée (Thrust)</label>
          <span className="text-lg font-mono text-mission-cyan">{params.thrust}%</span>
        </div>
        <Slider
          value={params.thrust}
          onChange={(e) => setParams({...params, thrust: parseInt(e.target.value)})}
        />
      </div>

      {/* Angle d'attaque */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <label className="text-xs uppercase text-mission-cyan opacity-70">Angle d'attaque</label>
          <span className="text-lg font-mono text-mission-cyan">{params.angle}°</span>
        </div>
        <Slider
          min={-45} max={45}
          value={params.angle}
          onChange={(e) => setParams({...params, angle: parseInt(e.target.value)})}
        />
      </div>

      {/* Masse (Lecture seule ou ajustement CO2) */}
      <div className="flex justify-between items-center border-t border-space-800 pt-4">
        <span className="text-xs uppercase opacity-50">Masse Module</span>
        <span className="font-mono text-mission-cyan">{params.mass} KG</span>
      </div>

      <Button variant="nominal" className="w-full mt-4 py-3">
        Calculer Trajectoire
      </Button>
    </div>
  );
};
