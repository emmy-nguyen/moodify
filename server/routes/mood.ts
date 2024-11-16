import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const moodSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});
type Mood = z.infer<typeof moodSchema>;
const createMoodSchema = moodSchema.omit({ id: true });
const fakeMood: Mood[] = [
  { id: 1, title: "Groceries", amount: 40 },
  { id: 2, title: "abc", amount: 40 },
  { id: 3, title: "xyx", amount: 40 },
];

export const moodRoute = new Hono()
  .get("/", async (c) => {
    return c.json({ expenses: fakeMood });
  })
  .post("/", zValidator("json", createMoodSchema), async (c) => {
    const data = await c.req.valid("json");
    const expense = createMoodSchema.parse(data);
    fakeMood.push({ ...expense, id: fakeMood.length + 1 });
    c.status(201);
    console.log({ expense });
    return c.json(expense);
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
