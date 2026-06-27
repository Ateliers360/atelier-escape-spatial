// src/apps/server/src/index.ts
// Entrée (Setup Fastify + Socket.io)
// apps/server/src/index.ts
import Fastify from "fastify";
import socketio from "fastify-socket.io";
import cors from "@fastify/cors";
import adminRoutes from "./routes/admin";
import { useGameEngine, initSession, updateThrust } from "./game/engine";
import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "./socket/events";

// Augmentation de type pour TypeScript
declare module "fastify" {
  interface FastifyInstance {
    io: Server<ClientToServerEvents, ServerToClientEvents>;
  }
}

const fastify = Fastify({ logger: true });

// 1. Autoriser le Frontend (Next.js sur le port 3000)
fastify.register(cors, { origin: "http://localhost:3000" });

// 2. Setup Socket.io
fastify.register(socketio, {
  cors: { origin: "http://localhost:3000" }
});

// 3. Enregistrement des routes
fastify.register(adminRoutes, { prefix: "/admin" });

fastify.ready((err) => {
  if (err) throw err;

  fastify.io.on("connection", (socket) => {
    console.log(`Nouveau terminal connecté: ${socket.id}`);

    // Un dashboard rejoint sa session
    socket.on("join_session", (sessionId) => {
      socket.join(sessionId);
      initSession(sessionId); // On démarre la physique pour lui
      console.log(`Session ${sessionId} démarrée.`);
    });

    // Contrôle du moteur par l'élève
    socket.on("thrust_control", (power) => {
      // On récupère le sessionId depuis les rooms du socket
      const sessionId = Array.from(socket.rooms)[1];
      if (sessionId) updateThrust(sessionId, power);
    });

    socket.on("disconnect", () => console.log("Déconnexion terminal."));
  });

  // 4. Lancement du moteur de jeu
  useGameEngine(fastify.io);
});

// Lancement du serveur
fastify.listen({ port: 3001, host: "0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
