import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getUser } from "../kinde";
import { db } from "../db";
import { moods as moodTable, insertMoodSchema } from "../db/schema/moods";
import { eq, desc, and } from "drizzle-orm";
import { createMoodSchema } from "../sharedTypes";

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
    const user = c.var.user;
    const data = await c.req.valid("json");
    const validateMood = insertMoodSchema.parse({
      userId: user.id,
      ...data,
    });

    console.log("validateMood", validateMood);
    const result = await db
      .insert(moodTable)
      .values(validateMood)
      .returning()
      .then((res) => res[0]);
    c.status(201);
    return c.json(result);
  })
  .get("/:id{[0-9]+}", getUser, async (c) => {
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
  .delete("/:id{[0-9]+}", getUser, async (c) => {
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
  })
  .put(
    "/:id{[0-9]+}",
    getUser,
    zValidator("json", createMoodSchema),
    async (c) => {
      const moodId = Number.parseInt(c.req.param("id"));
      const user = c.var.user;
      const editedMood = await c.req.valid("json");
      const validateMood = insertMoodSchema.parse({
        userId: user.id,
        ...editedMood,
      });
      const mood = await db
        .update(moodTable)
        .set(validateMood)
        .where(and(eq(moodTable.userId, user.id), eq(moodTable.id, moodId)))
        .returning()
        .then((res) => res[0]);
      if (!mood) {
        return c.notFound();
      }
      c.status(201);
      return c.json({ moods: mood });
    }
  );
