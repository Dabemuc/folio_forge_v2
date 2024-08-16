import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { eq, sql } from "drizzle-orm";
import { lower, portfolio, users } from "./schema";

const sqlite = new Database("sqlite.db");
export const db: BetterSQLite3Database = drizzle(sqlite);

// ---- Create Functions ----
const createUser = async (email: string, password_hash: string) => {
  const newUser: typeof users.$inferInsert = {
    email: email,
    password_hash: password_hash,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now()),
  };
  return await db.insert(users).values(newUser);
};

const createPortfolio = async (user_id: number, content: string) => {
  const newPortfolio: typeof portfolio.$inferInsert = {
    user_id: user_id,
    content: content,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now()),
  };
  return await db.insert(portfolio).values(newPortfolio);
};

// ---- Read Functions ----
const findUserById = async (id: number) => {
  return await db.select().from(users).where(eq(users.id, id));
};

const findUserByEmail = async (email: string) => {
  return await db
    .select()
    .from(users)
    .where(eq(lower(users.email), email.toLowerCase()));
};

const findPortfolioById = async (id: number) => {
  return await db.select().from(portfolio).where(eq(portfolio.id, id));
};

const findPortfoliosByUserId = async (user_id: number) => {
  return await db.select().from(portfolio).where(eq(portfolio.user_id, user_id));
};

// ---- Update Functions ----
const updateUser = async (id: number, email: string | undefined, password_hash: string | undefined) => {
  let userUpdate = {
    updated_at: new Date(Date.now()),
  };
  if (email && password_hash) {
    Object.assign(userUpdate, {
      email: email,
      password_hash: password_hash,
    });
  } else {
    const oldUser = await findUserById(id);
    Object.assign(userUpdate, {
      email: email || oldUser[0].email,
      password_hash: password_hash || oldUser[0].password_hash,
    });
  }
  return await db.update(users).set(userUpdate).where(eq(users.id, id));
};

const updatePortfolio = async (id: number, content: string) => {
  const portfolioUpdate = {
    content: content,
    updated_at: new Date(Date.now()),
  };
  return await db.update(portfolio).set(portfolioUpdate).where(eq(portfolio.id, id));
};

// ---- Delete Functions ----
const deleteUser = async (id: number) => {
  return await db.delete(users).where(eq(users.id, id));
};

const deletePortfolio = async (id: number) => {
  return await db.delete(portfolio).where(eq(portfolio.id, id));
};
