// ./packages/database/drizzle.config.ts
import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
import path from "path";

// On charge le .env situé à la racine du monorepo
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL est manquante dans le fichier .env");
}

export default {
  // 1. Spécifier le dialecte (Obligatoire maintenant)
  dialect: "postgresql",

  // 2. Chemin vers votre schéma
  schema: "./src/schema.ts",

  // 3. Dossier de sortie des migrations
  out: "./drizzle",

  // 4. Informations de connexion
  dbCredentials: {
    url: process.env.DATABASE_URL, // "url" remplace "connectionString"
  },

  // 5. Options de sécurité (recommandé)
  verbose: true,
  strict: true,
} satisfies Config;
