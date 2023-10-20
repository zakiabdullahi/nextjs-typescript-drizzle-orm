import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const $notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  // imageUrl: text("imageUrl"),
  userId: text("userId").notNull(),
});

export type NoteType = typeof $notes.$inferInsert;
