// Endpoints HTTP (Fastify)
// Routes pour le tableau de bord animateur
// apps/server/src/routes/admin.ts
import { FastifyInstance } from "fastify";

export default async function adminRoutes(fastify: FastifyInstance) {
  // Endpoint pour déclencher un incident
  fastify.post("/incident", async (request, reply) => {
    const { sessionId, incident } = request.body as any;

    // On propage l'incident à tous les clients de cette session via Socket.io
    fastify.io.to(sessionId).emit("emergency_alert", incident);

    return { success: true, message: "Incident propage" };
  });

  // Endpoint pour changer de phase (Briefing -> Vol -> Alunissage)
  fastify.post("/phase", async (request, reply) => {
    const { sessionId, phase } = request.body as any;
    fastify.io.to(sessionId).emit("phase_change", phase);
    return { success: true };
  });
}
