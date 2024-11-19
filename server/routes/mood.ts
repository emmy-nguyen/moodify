import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getUser } from "../kinde";
import { db } from "../db";
import { moods as moodTable } from "../db/schema/moods";
import { eq, desc, and } from "drizzle-orm";

const moodSchema = z.object({
  id: z.number().int().positive().min(1),
  date: z.string().datetime(),
  time: z.string(),
  mood: z.enum(["super", "happy", "meh", "sad", "angry"]),
  category: z.string(),
  notes: z.string(),
  image: z.string(),
});
type Mood = z.infer<typeof moodSchema>;
const createMoodSchema = moodSchema.omit({ id: true });
const fakeMood: Mood[] = [
  {
    id: 1,
    date: "2024-11-15",
    time: "12:00 PM",
    mood: "happy",
    category: "work",
    notes: "Meeting went well",
    image: "url1",
  },
  {
    id: 2,
    date: "2024-11-14",
    time: "3:00 PM",
    mood: "sad",
    category: "personal",
    notes: "Lost something",
    image: "url2",
  },
  {
    id: 3,
    date: "2024-11-13",
    time: "9:00 AM",
    mood: "super",
    category: "health",
    notes: "Ran 5 miles",
    image: "url3",
  },
];

export const moodRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user;
    const moods = await db
      .select()
      .from(moodTable)
      .where(eq(moodTable.userId, user.id))
      .orderBy(desc(moodTable.date))
      .limit(100);
    return c.json({ moods: moods });
  })
  .post("/", getUser, zValidator("json", createMoodSchema), async (c) => {
    const data = await c.req.valid("json");
    const result = await db
      .insert(moodTable)
      .values({
        userId: c.var.user.id,
        ...data,
      })
      .returning();
    c.status(201);
    return c.json(result);
  })
  .get("/:id{[0-9+]}", getUser, async (c) => {
    const moodId = Number.parseInt(c.req.param("id"));
    const user = c.var.user;
    const mood = await db
      .select()
      .from(moodTable)
      .where(and(eq(moodTable.userId, user.id), eq(moodTable.id, moodId)))
      .orderBy(desc(moodTable.date))
      .then((res) => res[0]);
    if (!mood) {
      return c.notFound();
    }
    return c.json({ moods: mood });
  })
  .get("total-spent", getUser, async (c) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
  })
  .delete("/:id{[0-9+]}", getUser, async (c) => {
    const moodId = Number.parseInt(c.req.param("id"));
    const user = c.var.user;
    const mood = await db
      .delete(moodTable)
      .where(and(eq(moodTable.userId, user.id), eq(moodTable.id, moodId)))
      .returning()
      .then((res) => res[0]);
    if (!mood) {
      return c.notFound();
    }
    return c.json({ moods: mood });
  });
// .put
