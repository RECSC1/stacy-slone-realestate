import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Postgres schema (Netlify Database / Neon).
 *
 * Migrated from the original MySQL schema so the backend can run on Netlify
 * primitives. Table and column names are kept identical to the previous schema
 * so the rest of the server code is unchanged. Enums are modeled as Postgres
 * enums; `updatedAt` columns refresh via Drizzle's `$onUpdate` hook.
 */

export const roleEnum = pgEnum("role", ["user", "admin"]);
export const leadStatusEnum = pgEnum("lead_status", [
  "new",
  "contacted",
  "archived",
]);
export const listingStatusEnum = pgEnum("listing_status", [
  "active",
  "pending",
  "sold",
  "draft",
]);

/**
 * Core user table backing auth flow.
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Unified leads table for all lead-capture forms.
 * `formName` distinguishes the source form (e.g. stacy-home-valuation,
 * stacy-property-alerts, contact, mortgage-results, resource-download).
 */
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  formName: varchar("formName", { length: 64 }).notNull(),
  name: varchar("name", { length: 200 }),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 40 }),
  propertyAddress: varchar("propertyAddress", { length: 400 }),
  message: text("message"),
  // Flexible bucket for form-specific fields (timeline, price range, beds, etc.)
  details: jsonb("details"),
  status: leadStatusEnum("status").default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

/**
 * Persisted AI Concierge / AI Home Search conversation logs.
 */
export const chatConversations = pgTable("chatConversations", {
  id: serial("id").primaryKey(),
  source: varchar("source", { length: 40 }).notNull(), // concierge | home-search
  sessionId: varchar("sessionId", { length: 80 }).notNull(),
  role: varchar("role", { length: 20 }).notNull(), // user | assistant
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessageRow = typeof chatConversations.$inferSelect;
export type InsertChatMessageRow = typeof chatConversations.$inferInsert;

/**
 * Listings managed by the admin. Kept empty until real listings/IDX exist.
 */
export const listings = pgTable("listings", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 300 }).notNull(),
  address: varchar("address", { length: 400 }),
  city: varchar("city", { length: 120 }),
  price: integer("price"),
  beds: integer("beds"),
  baths: integer("baths"),
  sqft: integer("sqft"),
  status: listingStatusEnum("status").default("draft").notNull(),
  description: text("description"),
  imageUrl: varchar("imageUrl", { length: 600 }),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Listing = typeof listings.$inferSelect;
export type InsertListing = typeof listings.$inferInsert;

/**
 * SEO blog / resource hub posts.
 */
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  title: varchar("title", { length: 300 }).notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  excerpt: text("excerpt"),
  body: text("body"),
  coverImage: varchar("coverImage", { length: 600 }),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;

/**
 * Testimonials. NEVER seeded with fake content. Admin-managed only.
 */
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  author: varchar("author", { length: 200 }).notNull(),
  location: varchar("location", { length: 200 }),
  quote: text("quote").notNull(),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;
