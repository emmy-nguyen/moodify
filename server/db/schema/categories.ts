import {
  text,
  pgEnum,
  pgTable,
  serial,
  index,
  varchar,
} from "drizzle-orm/pg-core";

const categoryEnum = pgEnum("category", [
  "exam",
  "group project",
  "study",
  "class",
  "homework",
]);
export { categoryEnum };

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  category: categoryEnum("category").notNull(),
});
