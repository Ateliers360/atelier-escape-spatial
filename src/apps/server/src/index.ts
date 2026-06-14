// src/apps/server/src/index.ts
// Entrée (Setup Fastify + Socket.io)
import Fastify from "fastify";
import socketio from "fastify-socket.io";
import cors from "@fastify/cors";
import { Server } from "socket.io";
import { useGameEngine, initSession, updateThrust } from "./game/engine";
import { ClientToServerEvents, ServerToClientEvents } from "./socket/events";

// 1. Augmentation de module pour fixer l'erreur .io
declare module "fastify" {
  interface FastifyInstance {
    io: Server<ClientToServerEvents, ServerToClientEvents>;
  }
}

const fastify = Fastify({ logger: true });

fastify.register(cors, { origin: "*" });
fastify.register(socketio, {
  cors: { origin: "*" }
});

fastify.ready((err) => {
  if (err) throw err;

  fastify.io.on("connection", (socket) => {
    console.log(`Explorer connected: ${socket.id}`);

    socket.on("join_session", (sessionId) => {
      socket.join(sessionId);
      initSession(sessionId); // Initialise la physique pour cette session
      console.log(`Session ${sessionId} initialized`);
    });

    socket.on("thrust_control", (power) => {
      // Trouver la room du socket pour mettre à jour la bonne session
      const sessionId = Array.from(socket.rooms)[1];
      if (sessionId) updateThrust(sessionId, power);
    });

    socket.on("disconnect", () => {
      console.log("Explorer disconnected");
    });
  });

  // Lancement du moteur de simulation
  useGameEngine(fastify.io);
});

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
