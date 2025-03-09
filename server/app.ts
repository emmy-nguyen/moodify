import { Hono } from "hono";
import { logger } from "hono/logger";
import { moodRoute } from "./routes/mood";
import { serveStatic } from "hono/bun";
import { authRoute } from "./routes/auth";
import { quoteRoute } from "./routes/quote";

const app = new Hono();
app.use("*", logger());

const apiRoutes = app
  .basePath("/api")
  .route("/mood", moodRoute)
  .route("/", authRoute)
  .route("/quote", quoteRoute);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
