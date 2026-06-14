// Endpoints HTTP (Fastify)
// Routes pour le tableau de bord animateur
import { FastifyInstance } from "fastify";

export default async function adminRoutes(fastify: FastifyInstance) {
  fastify.post("/incident", async (request, reply) => {
    const { sessionId, incident } = request.body as any;

    // Déclencher l'alerte via Socket.io
    fastify.io.to(sessionId).emit("emergency_alert", incident);

    return { status: "Incident pushed to teams" };
  });

  fastify.post("/phase", async (request, reply) => {
    const { sessionId, phase } = request.body as any;
    fastify.io.to(sessionId).emit("phase_change", phase);
    return { status: `Phase ${phase} activated` };
  });
}
