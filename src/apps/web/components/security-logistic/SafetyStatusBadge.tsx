// Badge avec un code couleur (SAFE, CAUTION, DANGER) et une icône correspondante.
'use client';

import React from 'react';
import { ShieldCheck, AlertTriangle, Flame } from 'lucide-react';

type StatusType = 'SAFE' | 'CAUTION' | 'DANGER';

export const SafetyStatusBadge = ({ status }: { status: StatusType }) => {
  const config = {
    SAFE: {
      color: 'text-mission-green',
      bg: 'bg-mission-green/10',
      border: 'border-mission-green/30',
      icon: ShieldCheck,
      label: 'Security Level: CLEAR',
    },
    CAUTION: {
      color: 'text-mission-amber',
      bg: 'bg-mission-amber/10',
      border: 'border-mission-amber/30',
      icon: AlertTriangle,
      label: 'Security Level: CAUTION',
    },
    DANGER: {
      color: 'text-mission-red',
      bg: 'bg-mission-red/10',
      border: 'border-mission-red/30',
      icon: Flame,
      label: 'Security Level: DANGER',
    },
  };

  const { color, bg, border, icon: Icon, label } = config[status];

  return (
    <div className={`flex items-center gap-4 px-4 py-3 border-2 ${bg} ${border} ${status === 'DANGER' ? 'animate-pulse' : ''}`}>
      <Icon className={color} size={28} />
      <div className="flex flex-col">
        <span className={`text-xl font-mono font-black italic tracking-tighter ${color}`}>
          {status}
        </span>
        <span className="text-[10px] uppercase opacity-60 font-mono">{label}</span>
      </div>
    </div>
  );
};
