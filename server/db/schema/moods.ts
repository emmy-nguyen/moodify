import {
  text,
  pgEnum,
  pgTable,
  serial,
  index,
  integer,
  date,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

const moodEnum = pgEnum("mood", ["super", "happy", "meh", "sad", "angry"]);
export { moodEnum };
const categoryEnum = pgEnum("category", [
  "exam",
  "project",
  "study",
  "class",
  "assignment",
]);
export { categoryEnum };

export const moods = pgTable(
  "moods",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    date: date("date").notNull(),
    time: text("time").notNull(),
    mood: moodEnum("mood").notNull(),
    category: categoryEnum("category").notNull(),
    notes: text("notes"),
  },
  (table) => {
    return {
      userIdIndex: index("user_id_idx").on(table.userId),
    };
  }
);

export const insertMoodSchema = createInsertSchema(moods, {
  time: z.string().min(1, { message: "You need to pick the time" }),
  mood: z.enum(["super", "happy", "meh", "sad", "angry"], {
    message: "You need to pick your mood",
  }),
  category: z.enum(["exam", "project", "study", "class", "assignment"], {
    message: "You need to pick a category",
  }),
  notes: z
    .string()
    .min(3, { message: "Your note must be at least 3 characters long" }),
});
export const selectMoodSchema = createSelectSchema(moods, {});
