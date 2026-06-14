import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useMissionStore } from '../store/useMissionStore';

export const useSocketSync = () => {
  const { setTelemetry, triggerIncident, addLog, setStatus } = useMissionStore();

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3003');

    socket.on('connect', () => {
      console.log('Connected to Mission Control Server');
    });

    // Réception de la télémétrie (Haute fréquence)
    socket.on('telemetry_update', (data) => {
      setTelemetry(data);
    });

    // Réception d'un incident (Événement métier)
    socket.on('new_incident', (incident) => {
      triggerIncident(incident);
      addLog({
        sender: 'SYSTEM',
        messageKey: 'incident_detected',
        type: 'error'
      });
    });

    // Changement de phase globale
    socket.on('phase_change', (phase) => {
      setStatus('IN_PROGRESS');
      addLog({
        sender: 'COMMAND',
        messageKey: `phase_${phase}_start`,
        type: 'info'
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [setTelemetry, triggerIncident, addLog, setStatus]);
};
