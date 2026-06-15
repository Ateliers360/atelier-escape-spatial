// Moteur du jeu (Logique de base, gestion des états, etc...)
// Le "Tick" (Calcul altitude/fuel par sec)
  import { Server } from "socket.io";
  import { calculateNextState } from "./physics";
  import { TelemetryData } from "../socket/events";
  import { db } from '@repo/database/client';
  import { teams, sessions } from '@repo/database/schema';
  import { eq } from 'drizzle-orm';

  // Stockage en mémoire des sessions actives
  const activeSessions = new Map<string, {
    telemetry: TelemetryData;
    thrust: number;
  }>();

  export const useGameEngine = (io: Server) => {
    const TICK_RATE = 100; // 10Hz pour une fluidité optimale
    const dt = TICK_RATE / 1000;

    setInterval(() => {
      activeSessions.forEach((state, sessionId) => {
        if (state.telemetry.status === 'CRASHED' || state.telemetry.status === 'LANDED') return;

        const nextTelemetry = calculateNextState(state.telemetry, state.thrust, dt);
        state.telemetry = nextTelemetry;

        // Broadcast à la room de la session
        io.to(sessionId).emit("telemetry_update", nextTelemetry);
      });
    }, TICK_RATE);
  };

  // Fonctions utilitaires pour manipuler les sessions
  export const initSession = (id: string) => {
    activeSessions.set(id, {
      telemetry: { altitude: 15000, velocity: 500, fuel: 100, oxygen: 100, status: 'NOMINAL' },
      thrust: 0
    });
  };

  export const updateThrust = (id: string, power: number) => {
    const session = activeSessions.get(id);
    if (session) session.thrust = power;
  };
