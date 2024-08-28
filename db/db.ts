import { drizzle } from "drizzle-orm/libsql";
import { createClient, type Client } from "@libsql/client";
import { eq, and } from "drizzle-orm";
import { lower, portfoliosTable, usersTable } from "./schema";
import * as schema from "./schema";
import { BlockObject } from "@/types";
import { create } from "domain";

/**
 * SETUP DB CONNECTION
 * Cache in development. This avoids creating a new connection on every HMR update.
 */
const globalForDb = globalThis as unknown as {
  client: Client | undefined;
};

export const client = globalForDb.client ?? createClient({ url: process.env.DATABASE_URL! });
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

export const createPortfolio = async (userId: number, content: BlockObject[], description: string) => {
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

export const findPublishedPortfolioById = async (id: number) => {
  return await db
    .select()
    .from(portfoliosTable)
    .where(and(eq(portfoliosTable.id, id), eq(portfoliosTable.published, true)));
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

export const updatePortfolio = async (
  id: number,
  values: { content?: BlockObject[]; description?: string; published?: boolean }
) => {
  console.log("Updating portfolio with id:", id, "values:", values);
  if (!values.content && !values.description && values.published === undefined) {
    console.error("No values to update");
    return;
  }
  const portfolioUpdate = {
    updatedAt: new Date(Date.now()),
  };
  if (values.content) {
    Object.assign(portfolioUpdate, { content: values.content });
  }
  if (values.description) {
    Object.assign(portfolioUpdate, { description: values.description });
  }
  if (values.published !== undefined) {
    Object.assign(portfolioUpdate, { published: values.published });
  }
  console.log("Pushing update to database:", portfolioUpdate);
  return await db.update(portfoliosTable).set(portfolioUpdate).where(eq(portfoliosTable.id, id));
};

// ---- Delete Functions ----
export const deleteUser = async (id: number) => {
  return await db.delete(usersTable).where(eq(usersTable.id, id));
};

export const deletePortfolio = async (id: number) => {
  return await db.delete(portfoliosTable).where(eq(portfoliosTable.id, id));
};

// ------ CREATE TEST DATA -------
async function createTestData() {
  console.log("########### Creating test data... ###########");
  
  const testUserResult = await findUserById(1)
  if (testUserResult.length > 0) {
    console.log("TestUser already exists:", testUserResult[0]);
  } else {
    console.log("TestUser not found, creating...");
    await createUser("testemail123", "testpassword123");
  }
  
  // createPortfolio(1, [{ id: "h1", props: { text: "TestHeader1" } }], "test");
  
  console.log("########### Test data created! ###########")
}
if (process.env.NODE_ENV === "development" && process.env.CREATE_TEST_DATA === "true") {
  createTestData();
}
