// Bandeau clignotant en bas d'écran affichant l'alerte la plus prioritaire.
'use client';

import { useMissionStore } from '../../store/useMissionStore';
import { AlertTriangle } from 'lucide-react';

interface IncidentMarqueeProps {
  message: string;
}

export const IncidentMarquee = ({ message }: IncidentMarqueeProps) => {
  const incidents = useMissionStore((state) => state.incidents);
  const activeIncident = incidents.find(i => !i.resolved);

  if (!activeIncident) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-mission-red py-2 z-40 flex items-center overflow-hidden border-t-2 border-white/20">
      <div className="bg-mission-red px-4 z-10 flex items-center gap-2 font-bold text-white uppercase italic animate-pulse">
        <AlertTriangle size={20} />
        DANGER:
      </div>
      <div className="whitespace-nowrap flex animate-marquee">
        {Array(10).fill(0).map((_, i) => (
          <span key={i} className="text-white font-mono uppercase text-lg font-black mx-10">
            {message}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};
