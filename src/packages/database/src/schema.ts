import { pgTable, serial, text, integer, timestamp, uuid, jsonb, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 1. Table des Ateliers (déjà existante dans votre projet)
export const ateliers = pgTable("ateliers", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  // ... autres champs existants
});

// 2. Table des Sessions (Une instance de jeu)
export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  atelierId: integer("atelier_id").references(() => ateliers.id),
  status: text("status").$type<"LOBBY" | "IN_PROGRESS" | "PAUSED" | "FINISHED">().default("LOBBY"),
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  config: jsonb("config").default({}), // Paramètres spécifiques (difficulté, etc.)
  createdAt: timestamp("created_at").defaultNow(),
});

// 3. Table des Équipes
export const teams = pgTable("teams", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id").references(() => sessions.id),
  name: text("name").notNull(),
  role: text("role"), // ex: 'PILOTAGE', 'INGENIERIE'
  score: integer("score").default(0),
  metadata: jsonb("metadata").default({}), // Infos dynamiques (dernière position rover, etc.)
});

// 4. Table des Logs d'Incidents (Historique pour débriefing)
export const incidentLogs = pgTable("incident_logs", {
  id: serial("id").primaryKey(),
  sessionId: uuid("session_id").references(() => sessions.id),
  teamId: uuid("team_id").references(() => teams.id),
  type: text("type").notNull(), // ex: 'FUEL_LEAK'
  severity: text("severity").notNull(),
  triggeredAt: timestamp("triggered_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

// Relations
export const sessionRelations = relations(sessions, ({ many }) => ({
  teams: many(teams),
  logs: many(incidentLogs),
}));
