import { create } from 'zustand';
import { MissionStatus, Team, Incident, Telemetry, LogEntry } from '../types/mission';

interface MissionState {
  // État
  status: MissionStatus;
  remainingSeconds: number;
  currentPhase: number;
  teams: Team[];
  incidents: Incident[];
  telemetry: Telemetry;
  logs: LogEntry[];

  // Actions
  setStatus: (status: MissionStatus) => void;
  tick: () => void; // Appelé chaque seconde
  setTelemetry: (data: Partial<Telemetry>) => void;
  addLog: (log: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  triggerIncident: (incident: Incident) => void;
  resolveIncident: (id: string) => void;
  updateTeamProgress: (teamId: string, progress: number) => void;
}

export const useMissionStore = create<MissionState>((set) => ({
  // État Initial
  status: 'IDLE',
  remainingSeconds: 2700, // 45 minutes
  currentPhase: 1,
  teams: [],
  incidents: [],
  telemetry: { altitude: 100000, velocity: 0, oxygen: 100, fuel: 100 },
  logs: [],

  // Actions
  setStatus: (status) => set({ status }),

  tick: () => set((state) => ({
    remainingSeconds: state.remainingSeconds > 0 ? state.remainingSeconds - 1 : 0
  })),

  setTelemetry: (data) => set((state) => ({
    telemetry: { ...state.telemetry, ...data }
  })),

  addLog: (log) => set((state) => ({
    logs: [
      { ...log, id: Math.random().toString(36), timestamp: new Date() },
      ...state.logs
    ].slice(0, 50) // On garde les 50 derniers logs
  })),

  triggerIncident: (incident) => set((state) => ({
    incidents: [...state.incidents, incident],
    status: 'EMERGENCY'
  })),

  resolveIncident: (id) => set((state) => ({
    incidents: state.incidents.filter(i => i.id !== id),
    status: state.incidents.length <= 1 ? 'IN_PROGRESS' : 'EMERGENCY'
  })),

  updateTeamProgress: (teamId, progress) => set((state) => ({
    teams: state.teams.map(t => t.id === teamId ? { ...t, progress } : t)
  })),
}));
