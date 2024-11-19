import { z } from "zod";
import { insertMoodSchema } from "./db/schema/moods";

export const moodSchema = insertMoodSchema.omit({
  userId: true,
  createdAt: true,
});

export const createMoodSchema = moodSchema.omit({ id: true });
