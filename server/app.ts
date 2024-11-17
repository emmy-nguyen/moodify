import { Hono } from "hono";
import { logger } from "hono/logger";
import { moodRoute } from "./routes/mood";
import { serveStatic } from "hono/bun";
import { authRoute } from "./routes/auth";

const app = new Hono();
app.use("*", logger());

const apiRoutes = app
  .basePath("/api")
  .route("/mood", moodRoute)
  .route("/", authRoute);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
