import { defineConfig } from "drizzle-kit";

// `drizzle-kit generate` only diffs the schema to produce migration files and
// does not open a database connection. Migrations MUST be written to
// `netlify/database/migrations` so the Netlify platform applies them
// automatically during deploys. The connection string is only used by
// connection-opening commands (which we never run here — Netlify owns
// migration application).
export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./netlify/database/migrations",
  dialect: "postgresql",
});
