// Liste des équipes avec boutons de "Force Win", "Trigger Incident", ou "Mute".
// Pour chaque equipe, affiche une liste de membres, ainsi que leur statut.
// Utiliser le contexte de mission pour afficher les membres de l'équipe et leur statut.
'use client';

import React from 'react';
import { useMissionStore } from '../../store/useMissionStore';
import { Button } from '@repo/ui/button';
import { Trophy, ZapOff, VolumeX, Activity } from 'lucide-react';
import { BlinkingDot } from '@repo/ui/BlinkingDot';

export const TeamControlCenter = () => {
  const { teams } = useMissionStore();

  const handleAction = (teamId: string, action: string) => {
    console.log(`GM Action: ${action} on Team ${teamId}`);
    // Ici, envoyer l'event au serveur via socket.emit('admin_team_action', { teamId, action });
  };

  return (
    <div className="space-y-4">
      {teams.map((team) => (
        <div key={team.id} className="bg-space-900/40 border border-space-800 p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <BlinkingDot variant={team.status === 'OK' ? 'nominal' : 'critical'} />
              <span className="font-bold uppercase text-sm tracking-wider">{team.name}</span>
            </div>
            <span className="font-mono text-mission-cyan">{team.score} PTS</span>
          </div>

          {/* Progress Bar de l'équipe */}
          <div className="w-full bg-space-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-mission-cyan transition-all duration-500"
              style={{ width: `${team.progress}%` }}
            />
          </div>

          <div className="flex gap-2 mt-2">
            <Button
              onClick={() => handleAction(team.id, 'FORCE_WIN')}
              className="flex-1 py-1 text-[9px] gap-2"
            >
              <Trophy size={12} /> Win
            </Button>
            <Button
              variant="warning"
              onClick={() => handleAction(team.id, 'TRIGGER_PANNE')}
              className="flex-1 py-1 text-[9px] gap-2"
            >
              <ZapOff size={12} /> Panne
            </Button>
            <Button
              variant="critical"
              onClick={() => handleAction(team.id, 'MUTE')}
              className="py-1 px-3 text-[9px]"
            >
              <VolumeX size={12} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
