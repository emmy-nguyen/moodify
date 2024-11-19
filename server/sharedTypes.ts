import { z } from "zod";

export const moodSchema = z.object({
  id: z.number().int().positive().min(1),
  date: z.string().datetime(),
  time: z.string().min(1, { message: "You need to pick the time" }),
  mood: z.enum(["super", "happy", "meh", "sad", "angry"], {
    message: "You need to pick your mood",
  }),
  category: z.string(), // leave for now
  notes: z
    .string()
    .min(3, { message: "Your note must be at least 3 characters long" }),
  image: z.string(),
});

export const createMoodSchema = moodSchema.omit({ id: true });
