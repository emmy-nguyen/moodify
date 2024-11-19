import {
  text,
  pgEnum,
  pgTable,
  serial,
  index,
  varchar,
  integer,
  date,
  timestamp,
} from "drizzle-orm/pg-core";
import { categories } from "./categories";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

const moodEnum = pgEnum("mood", ["super", "happy", "meh", "sad", "angry"]);
export { moodEnum };

export const moods = pgTable(
  "moods",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    date: date("date").notNull(),
    time: text("time").notNull(),
    mood: moodEnum("mood"),
    categoryId: integer("category_id").references(() => categories.id),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => {
    return {
      userIdIndex: index("user_id_idx").on(table.userId),
    };
  }
);

type Mood = typeof moods.$inferSelect;
type NewMood = typeof moods.$inferInsert;

export const insertMoodSchema = createInsertSchema(moods, {
  date: z.string().datetime(),
  time: z.string().min(1, { message: "You need to pick the time" }),
  mood: z.enum(["super", "happy", "meh", "sad", "angry"], {
    message: "You need to pick your mood",
  }),
  notes: z
    .string()
    .min(3, { message: "Your note must be at least 3 characters long" }),
});
export const selectMoodSchema = createSelectSchema(moods);
