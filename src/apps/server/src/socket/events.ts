// Définition des types d'évènements

export interface TelemetryData {
  altitude: number;
  velocity: number;
  fuel: number;
  oxygen: number;
  status: 'NOMINAL' | 'WARNING' | 'CRITICAL' | 'CRASHED' | 'LANDED';
}

export interface Incident {
  id: string;
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'CRITICAL';
  messageKey: string;
}

export interface ServerToClientEvents {
  telemetry_update: (data: TelemetryData) => void;
  emergency_alert: (incident: Incident) => void;
  phase_change: (phase: number) => void;
}

export interface ClientToServerEvents {
  join_session: (sessionId: string) => void;
  thrust_control: (power: number) => void; // 0 to 1
}
