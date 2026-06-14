CREATE TABLE "ateliers" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	CONSTRAINT "ateliers_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "incident_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" uuid,
	"team_id" uuid,
	"type" text NOT NULL,
	"severity" text NOT NULL,
	"triggered_at" timestamp DEFAULT now(),
	"resolved_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"atelier_id" integer,
	"status" text DEFAULT 'LOBBY',
	"start_time" timestamp,
	"end_time" timestamp,
	"config" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid,
	"name" text NOT NULL,
	"role" text,
	"score" integer DEFAULT 0,
	"metadata" jsonb DEFAULT '{}'::jsonb
);
--> statement-breakpoint
ALTER TABLE "incident_logs" ADD CONSTRAINT "incident_logs_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incident_logs" ADD CONSTRAINT "incident_logs_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_atelier_id_ateliers_id_fk" FOREIGN KEY ("atelier_id") REFERENCES "public"."ateliers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE no action ON UPDATE no action;