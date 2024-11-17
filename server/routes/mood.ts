import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

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
  .get("/", async (c) => {
    return c.json({ moods: fakeMood });
  })
  .post("/", zValidator("json", createMoodSchema), async (c) => {
    const data = await c.req.valid("json");
    console.log(data);
    const mood = createMoodSchema.parse(data);
    fakeMood.push({ ...mood, id: fakeMood.length + 1 });
    c.status(201);
    console.log({ mood });
    return c.json(mood);
  })
  .get("/:id{[0-9+]}", (c) => {
    const expenseId = Number.parseInt(c.req.param("id"));
    const expense = fakeMood.find((expense) => expense.id === expenseId);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .get("total-spent", async (c) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
  })
  .delete("/:id{[0-9+]}", (c) => {
    const moodId = Number.parseInt(c.req.param("id"));
    const index = fakeMood.findIndex((mood) => mood.id === moodId);
    if (index === -1) {
      return c.notFound();
    }
    const deletedMood = fakeMood.splice(index, 1)[0];
    return c.json({ expense: deletedMood });
  });
// .put
