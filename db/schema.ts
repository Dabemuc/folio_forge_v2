import { SQL, sql } from "drizzle-orm";
import { AnySQLiteColumn, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

// ---- Tables ----
export const portfoliosTable = sqliteTable("portfoliosTable", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("userId", { mode: "number" }).references(() => usersTable.id),
  description: text("description", { mode: "text" }).notNull(),
  content: text("content", { mode: "json" }).notNull(),
  published: integer("published", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const usersTable = sqliteTable(
  "usersTable",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    email: text("email", { mode: "text" }).unique().notNull(),
    passwordHash: text("passwordHash", { mode: "text" }).notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
  }
  // (table) => ({
  //   emailUniqueIndex: uniqueIndex("emailUniqueIndex").on(lower(table.email)),
  // })
);

// ---- Custom Functions ----
export function lower(email: AnySQLiteColumn): SQL {
  return sql`lower(${email})`;
}
