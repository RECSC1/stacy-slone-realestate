import { defineConfig } from "drizzle-kit";

// `drizzle-kit generate` only diffs the schema to produce migration files and
// does not open a database connection, so it must succeed even when no
// DATABASE_URL is available (e.g. during the Netlify build). When the variable
// is set (runtime, `drizzle-kit migrate`), the real connection string is used.
const connectionString =
  process.env.DATABASE_URL ?? "mysql://placeholder:placeholder@localhost:3306/placeholder";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: connectionString,
  },
});
