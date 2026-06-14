CREATE TYPE "lead_status" AS ENUM('new', 'contacted', 'archived');--> statement-breakpoint
CREATE TYPE "listing_status" AS ENUM('active', 'pending', 'sold', 'draft');--> statement-breakpoint
CREATE TYPE "role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "chatConversations" (
	"id" serial PRIMARY KEY,
	"source" varchar(40) NOT NULL,
	"sessionId" varchar(80) NOT NULL,
	"role" varchar(20) NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY,
	"formName" varchar(64) NOT NULL,
	"name" varchar(200),
	"email" varchar(320),
	"phone" varchar(40),
	"propertyAddress" varchar(400),
	"message" text,
	"details" jsonb,
	"status" "lead_status" DEFAULT 'new'::"lead_status" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "listings" (
	"id" serial PRIMARY KEY,
	"title" varchar(300) NOT NULL,
	"address" varchar(400),
	"city" varchar(120),
	"price" integer,
	"beds" integer,
	"baths" integer,
	"sqft" integer,
	"status" "listing_status" DEFAULT 'draft'::"listing_status" NOT NULL,
	"description" text,
	"imageUrl" varchar(600),
	"featured" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" serial PRIMARY KEY,
	"slug" varchar(200) NOT NULL UNIQUE,
	"title" varchar(300) NOT NULL,
	"category" varchar(80) NOT NULL,
	"excerpt" text,
	"body" text,
	"coverImage" varchar(600),
	"published" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY,
	"author" varchar(200) NOT NULL,
	"location" varchar(200),
	"quote" text NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"openId" varchar(64) NOT NULL UNIQUE,
	"name" text,
	"email" varchar(320),
	"loginMethod" varchar(64),
	"role" "role" DEFAULT 'user'::"role" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL
);
