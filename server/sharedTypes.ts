import { z } from "zod";
import { insertMoodSchema } from "./db/schema/moods";

export const createMoodSchema = insertMoodSchema.omit({
  userId: true,
  // createdAt: true,
  id: true,
});

export type CreateMood = z.infer<typeof createMoodSchema>;
