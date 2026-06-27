// Client de base de données (src/packages/database/src/client.ts)
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

/**
 * Client de base de données (PostgreSQL)
 * Compatible avec le serveur Fastify et Next.js
 */

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing in .env file");
}

// Connexion pour le client Postgres
const queryClient = postgres(process.env.DATABASE_URL);

// Instance Drizzle
export const db = drizzle(queryClient, { schema });

export default db;
