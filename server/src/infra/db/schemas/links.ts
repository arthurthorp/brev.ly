import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const links = pgTable("links", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  originalUrl: text("original_url").notNull(),
  shortenedUrl: text("shortened_key").notNull().unique(),
  visitCount: integer("visit_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
