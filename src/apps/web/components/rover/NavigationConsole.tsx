// Groupe de boutons directionnels (D-Pad) envoyant des commandes au serveur.
'use client';

import React from 'react';
import { Button } from '@repo/ui/button';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, CircleStop } from 'lucide-react';
// import { io } from 'socket.io-client'; // À utiliser avec votre hook socket

export const NavigationConsole = () => {
  const sendCommand = (cmd: string) => {
    console.log(`Rover CMD: ${cmd}`);
    // socket.emit('rover_command', { command: cmd });
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      {/* Grille D-Pad */}
      <div className="grid grid-cols-3 gap-2">
        <div />
        <Button onClick={() => sendCommand('FORWARD')} className="p-4">
          <ChevronUp size={20} />
        </Button>
        <div />

        <Button onClick={() => sendCommand('LEFT')} className="p-4">
          <ChevronLeft size={20} />
        </Button>
        <Button variant="critical" onClick={() => sendCommand('STOP')} className="p-4">
          <CircleStop size={20} />
        </Button>
        <Button onClick={() => sendCommand('RIGHT')} className="p-4">
          <ChevronRight size={20} />
        </Button>

        <div />
        <Button onClick={() => sendCommand('BACKWARD')} className="p-4">
          <ChevronDown size={20} />
        </Button>
        <div />
      </div>

      <div className="mt-4 w-full h-[2px] bg-gradient-to-r from-transparent via-mission-cyan/30 to-transparent" />
      <span className="text-[9px] uppercase font-mono opacity-40">Lien Satellite : 420ms Latence</span>
    </div>
  );
};
