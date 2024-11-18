import {
  text,
  pgEnum,
  pgTable,
  serial,
  index,
  varchar,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  category: varchar("category"),
});
