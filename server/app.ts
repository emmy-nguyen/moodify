import { Hono } from "hono";
import { logger } from "hono/logger";
import { moodRoute } from "./routes/mood";

const app = new Hono();
app.use("*", logger());

app.get("/test", (c) => {
  return c.json({ message: "test" });
});

app.route("/api/mood", moodRoute);

export default app;
