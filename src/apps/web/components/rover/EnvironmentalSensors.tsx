// Groupe de petits afficheurs digitaux (Température sol, Radiation, Luminosité, Humidité, etc).
'use client';

import React from 'react';
import { Thermometer, Zap, Radiation } from 'lucide-react';
import { BlinkingDot } from '@repo/ui';

const SensorItem = ({ label, value, unit, icon: Icon, variant = 'nominal' }: { label: string; value: string; unit: string; icon: React.ComponentType<{ size: number }>; variant?: 'nominal' | 'warning' }) => (
  <div className="bg-space-900/40 border-l-2 border-space-800 p-2 flex items-center gap-3">
    <div className={`text-mission-cyan ${variant === 'warning' ? 'text-mission-amber' : ''}`}>
      <Icon size={14} />
    </div>
    <div className="flex-1">
      <div className="text-[9px] uppercase opacity-50 font-mono">{label}</div>
      <div className="text-sm font-mono font-bold">
        {value} <span className="text-[10px] opacity-50">{unit}</span>
      </div>
    </div>
    <BlinkingDot variant={variant} />
  </div>
);

export const EnvironmentalSensors = () => {
  return (
    <div className="grid grid-cols-1 gap-2">
      <SensorItem label="Température Sol" value="-173.5" unit="°C" icon={Thermometer} />
      <SensorItem label="Radiation" value="0.45" unit="mSv/h" icon={Radiation} />
      <SensorItem label="Luminosité" value="1240" unit="lux" icon={Zap} variant="warning" />
    </div>
  );
};
