// apps/server/src/game/engine.ts
import { Server } from "socket.io";
import { calculateNextState } from "./physics";
import { TelemetryData, ServerToClientEvents, ClientToServerEvents } from "../socket/events";
import { db, teams, sessions } from "@repo/database"; // package DB
import { eq } from "drizzle-orm";

interface SessionState {
  telemetry: TelemetryData;
  thrust: number;
}

const activeSessions = new Map<string, SessionState>();

export const useGameEngine = (io: Server<ClientToServerEvents, ServerToClientEvents>) => {
  const TICK_RATE = 200; // 5 mises à jour par seconde (compromis fluidité/perf)
  const dt = TICK_RATE / 1000;

  setInterval(async () => {
    for (const [sessionId, state] of activeSessions.entries()) {
      if (state.telemetry.status === 'LANDED' || state.telemetry.status === 'CRASHED') {
        // Mission terminée : On enregistre en DB
        await finalizeMission(sessionId, state);
        activeSessions.delete(sessionId);
        continue;
      }

      // Calcul du nouvel état
      state.telemetry = calculateNextState(state.telemetry, state.thrust, dt);

      // Envoi au frontend via la room de la session
      io.to(sessionId).emit("telemetry_update", state.telemetry);
    }
  }, TICK_RATE);
};

// Connexion DB : Sauvegarde du score
async function finalizeMission(sessionId: string, state: SessionState) {
  const score = state.telemetry.status === 'LANDED'
    ? Math.round(state.telemetry.fuel * 100)
    : 0;

  try {
    // 1. Mettre à jour le statut de la session
    await db.update(sessions)
      .set({ status: 'FINISHED', endTime: new Date() })
      .where(eq(sessions.id, sessionId));

    // 2. Mettre à jour le score des équipes
    await db.update(teams)
      .set({ score: score })
      .where(eq(teams.sessionId, sessionId));

    console.log(`Mission ${sessionId} enregistrée. Score: ${score}`);
  } catch (e) {
    console.error("Erreur DB lors de la sauvegarde:", e);
  }
}

export const initSession = (id: string) => {
  activeSessions.set(id, {
    telemetry: { altitude: 12000, velocity: 450, fuel: 100, oxygen: 100, status: 'NOMINAL' },
    thrust: 0
  });
};

export const updateThrust = (id: string, power: number) => {
  const s = activeSessions.get(id);
  if (s) s.thrust = power;
};
