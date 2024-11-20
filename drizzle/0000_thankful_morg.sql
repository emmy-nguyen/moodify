CREATE TYPE "public"."mood" AS ENUM('super', 'happy', 'meh', 'sad', 'angry');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "moods" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"date" text NOT NULL,
	"time" text NOT NULL,
	"mood" "mood",
	"category_id" integer,
	"notes" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "moods" ADD CONSTRAINT "moods_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "moods" USING btree ("user_id");