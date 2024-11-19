import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrationConfig = {
  migrationsFolder: "./drizzle",
};
const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });
await migrate(drizzle(migrationClient), migrationConfig);
console.log("migration complete");
