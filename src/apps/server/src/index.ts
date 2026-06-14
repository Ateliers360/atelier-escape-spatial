// Entrée (Setup Fastify + Socket.io)
import Fastify from "fastify";
import socketio from "fastify-socket.io";
import { useGameEngine } from "./game/engine";

const fastify = Fastify({ logger: true });

// Setup Socket.io
fastify.register(socketio, {
  cors: { origin: "*" } // À restreindre en prod
});

fastify.ready((err) => {
  if (err) throw err;

  fastify.io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`);

    // Rejoindre une room par Session ID
    socket.on("join_session", (sessionId) => {
      socket.join(sessionId);
    });

    // Évènement de contrôle de l'animateur
    socket.on("admin_trigger_incident", (data) => {
      fastify.io.to(data.sessionId).emit("emergency_alert", data.incident);
    });
  });

  // Lancement du moteur de jeu (Tick de télémétrie)
  useGameEngine(fastify.io);
});

fastify.listen({ port: 3001, host: "0.0.0.0" });
