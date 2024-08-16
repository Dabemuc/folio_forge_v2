// import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//   schema: "./db/schema.ts",
//   out: "./db/drizzle",
//   dialect: "sqlite",
//   dbCredentials: {
//     url: "./db/sqlite.db",
//   },
// });

import { type Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // tablesFilter: ["test_t3_app_*"],
} satisfies Config;
