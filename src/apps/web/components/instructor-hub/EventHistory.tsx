// Table de logs détaillée pour débriefer la séance plus tard.
// Affiche les incidents et leurs statuts, ainsi que leurs causes et effets.
'use client';

import React from 'react';
import { useMissionStore } from '../../store/useMissionStore';
import { format } from 'date-fns';

export const EventHistory = () => {
  const { logs } = useMissionStore();

  return (
    <div className="w-full overflow-y-auto max-h-[300px] border border-space-800 rounded">
      <table className="w-full text-left text-[11px] font-mono">
        <thead className="bg-space-950 sticky top-0 uppercase opacity-50 border-b border-space-800">
          <tr>
            <th className="p-2">Time</th>
            <th className="p-2">Source</th>
            <th className="p-2">Event</th>
            <th className="p-2 text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-b border-space-900/50 hover:bg-space-800/30">
              <td className="p-2 text-mission-cyan/60">
                {format(new Date(log.timestamp), 'HH:mm:ss')}
              </td>
              <td className="p-2 font-bold">{log.sender}</td>
              <td className={`p-2 ${log.type === 'error' ? 'text-mission-red' : log.type === 'success' ? 'text-mission-green' : ''}`}>
                {log.messageKey}
              </td>
              <td className="p-2 text-right opacity-40 italic">
                Processed
              </td>
            </tr>
          ))}
          {logs.length === 0 && (
            <tr>
              <td colSpan={4} className="p-8 text-center opacity-30 italic">
                Aucun évènement enregistré pour cette session.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
