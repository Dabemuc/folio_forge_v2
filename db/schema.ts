import { SQL, sql } from "drizzle-orm";
import { AnySQLiteColumn, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

// ---- Tables ----
export const portfolio = sqliteTable("portfolio", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  user_id: integer("user_id", { mode: "number" }).references(() => users.id),
  content: text("content", { mode: "json" }),
  created_at: integer("created_at", { mode: "timestamp" }).notNull(),
  updated_at: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const users = sqliteTable(
  "users",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    email: text("email", { mode: "text" }).unique(),
    password_hash: text("password_hash", { mode: "text" }),
    created_at: integer("created_at", { mode: "timestamp" }).notNull(),
    updated_at: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    emailUniqueIndex: uniqueIndex("emailUniqueIndex").on(lower(table.email)),
  })
);

// ---- Custom Functions ----
export function lower(email: AnySQLiteColumn): SQL {
  return sql`lower(${email})`;
}
