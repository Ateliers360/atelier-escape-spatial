export type MissionStatus = 'IDLE' | 'IN_PROGRESS' | 'EMERGENCY' | 'SUCCESS' | 'FAILURE';

export interface Team {
  id: string;
  name: string;
  status: 'OK' | 'STUCK' | 'REPAIRING';
  progress: number; // 0 à 100
  score: number;
}

export interface Incident {
  id: string;
  code: string; // ex: "ERR_PROPULSION_01"
  severity: 'LOW' | 'MEDIUM' | 'CRITICAL';
  labelKey: string; // Pour i18n
  resolved: boolean;
}

export interface Telemetry {
  altitude: number;
  velocity: number;
  oxygen: number;
  fuel: number;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  sender: string;
  messageKey: string; // Pour i18n
  type: 'info' | 'warning' | 'error' | 'success';
}
