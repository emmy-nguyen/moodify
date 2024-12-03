CREATE TYPE "public"."category" AS ENUM('exam', 'project', 'study', 'class', 'assignment');--> statement-breakpoint
CREATE TYPE "public"."mood" AS ENUM('super', 'happy', 'meh', 'sad', 'angry');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "moods" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"date" date NOT NULL,
	"time" text NOT NULL,
	"mood" "mood" NOT NULL,
	"category" "category" NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "moods" USING btree ("user_id");