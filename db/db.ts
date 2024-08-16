import { drizzle } from "drizzle-orm/libsql";
import { createClient, type Client } from "@libsql/client";
import { eq } from "drizzle-orm";
import { lower, portfoliosTable, usersTable } from "./schema";
import * as schema from "./schema";

/**
 * SETUP DB CONNECTION
 * Cache in development. This avoids creating a new connection on every HMR update.
 */
const globalForDb = globalThis as unknown as {
  client: Client | undefined;
};

export const client =
  globalForDb.client ?? createClient({ url: process.env.DATABASE_URL! });
if (process.env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client, { schema });

// ---- Create Functions ----
export const createUser = async (email: string, passwordHash: string) => {
  const newUser: typeof usersTable.$inferInsert = {
    email: email,
    passwordHash: passwordHash,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  };
  return await db.insert(usersTable).values(newUser);
};

export const createPortfolio = async (userId: number, content: string, description: string) => {
  console.log("Creating portfolio", "userId:", userId, "content:", content, "description:", description);
  const newPortfolio: typeof portfoliosTable.$inferInsert = {
    userId: userId,
    content: content,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    description: description,
  };
  return await db.insert(portfoliosTable).values(newPortfolio);
};

// ---- Read Functions ----
export const findUserById = async (id: number) => {
  return await db.select().from(usersTable).where(eq(usersTable.id, id));
};

export const findUserByEmail = async (email: string) => {
  return await db
    .select()
    .from(usersTable)
    .where(eq(lower(usersTable.email), email.toLowerCase()));
};

export const findPortfolioById = async (id: number) => {
  return await db.select().from(portfoliosTable).where(eq(portfoliosTable.id, id));
};

export const findPortfoliosByUserId = async (userId: number) => {
  return await db.select().from(portfoliosTable).where(eq(portfoliosTable.userId, userId));
};

// ---- Update Functions ----
export const updateUser = async (id: number, email?: string, passwordHash?: string) => {
  if (!email && !passwordHash) {
    return;
  }
  let userUpdate = {
    updatedAt: new Date(Date.now()),
  };
  if (email) {
    Object.assign(userUpdate, { email: email });
  }
  if (passwordHash) {
    Object.assign(userUpdate, { passwordHash: passwordHash });
  }
  return await db.update(usersTable).set(userUpdate).where(eq(usersTable.id, id));
};

export const updatePortfolio = async (id: number, content?: string, description?: string, published?: boolean) => {
  if (!content && !description && published === undefined) {
    return;
  }
  const portfolioUpdate = {
    updatedAt: new Date(Date.now()),
  };
  if (content) {
    Object.assign(portfolioUpdate, { content: content });
  }
  if (description) {
    Object.assign(portfolioUpdate, { description: description });
  }
  if (published !== undefined) {
    Object.assign(portfolioUpdate, { published: published });
  }
  return await db.update(portfoliosTable).set(portfolioUpdate).where(eq(portfoliosTable.id, id));
};

// ---- Delete Functions ----
export const deleteUser = async (id: number) => {
  return await db.delete(usersTable).where(eq(usersTable.id, id));
};

export const deletePortfolio = async (id: number) => {
  return await db.delete(portfoliosTable).where(eq(portfoliosTable.id, id));
};
