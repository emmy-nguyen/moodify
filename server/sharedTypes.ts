import { z } from "zod";
import { insertMoodSchema } from "./db/schema/moods";

export const createMoodSchema = insertMoodSchema.omit({
  userId: true,
  // createdAt: true,
  id: true,
});

export type CreateMood = z.infer<typeof createMoodSchema>;

export type Mood = "happy" | "super" | "meh" | "sad" | "angry";

export type Category = "exam" | "project" | "study" | "class" | "assignment";

export const quoteSchema = z.object({
  quote: z.string(),
  author: z.string(),
  category: z.string().optional(),
});

export type Quote = z.infer<typeof quoteSchema>;
