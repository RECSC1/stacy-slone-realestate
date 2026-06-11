import { z } from "zod";
import {
  createListing,
  createPost,
  createTestimonial,
  deleteListing,
  deletePost,
  deleteTestimonial,
  listChatConversations,
  listLeads,
  listListings,
  listPosts,
  listTestimonials,
  updateLeadStatus,
  updateListing,
  updatePost,
  updateTestimonial,
} from "../db";
import { adminProcedure, router } from "../_core/trpc";

export const adminRouter = router({
  // Leads / valuations / messages
  leads: adminProcedure.query(() => listLeads()),
  updateLeadStatus: adminProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "contacted", "archived"]),
      }),
    )
    .mutation(({ input }) => updateLeadStatus(input.id, input.status)),

  // Chat conversation logs
  chatLogs: adminProcedure.query(() => listChatConversations()),

  // Listings management
  listings: adminProcedure.query(() => listListings()),
  createListing: adminProcedure
    .input(
      z.object({
        title: z.string().min(1).max(300),
        address: z.string().max(400).optional(),
        city: z.string().max(120).optional(),
        price: z.number().optional(),
        beds: z.number().optional(),
        baths: z.number().optional(),
        sqft: z.number().optional(),
        status: z.enum(["active", "pending", "sold", "draft"]).default("draft"),
        description: z.string().optional(),
        imageUrl: z.string().max(600).optional(),
        featured: z.boolean().default(false),
      }),
    )
    .mutation(({ input }) => createListing(input)),
  updateListing: adminProcedure
    .input(
      z.object({
        id: z.number(),
        patch: z.object({
          title: z.string().max(300).optional(),
          address: z.string().max(400).optional(),
          city: z.string().max(120).optional(),
          price: z.number().optional(),
          beds: z.number().optional(),
          baths: z.number().optional(),
          sqft: z.number().optional(),
          status: z
            .enum(["active", "pending", "sold", "draft"])
            .optional(),
          description: z.string().optional(),
          imageUrl: z.string().max(600).optional(),
          featured: z.boolean().optional(),
        }),
      }),
    )
    .mutation(({ input }) => updateListing(input.id, input.patch)),
  deleteListing: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteListing(input.id)),

  // Blog posts management
  posts: adminProcedure.query(() => listPosts(false)),
  createPost: adminProcedure
    .input(
      z.object({
        slug: z.string().min(1).max(200),
        title: z.string().min(1).max(300),
        category: z.string().min(1).max(80),
        excerpt: z.string().optional(),
        body: z.string().optional(),
        coverImage: z.string().max(600).optional(),
        published: z.boolean().default(false),
      }),
    )
    .mutation(({ input }) => createPost(input)),
  updatePost: adminProcedure
    .input(
      z.object({
        id: z.number(),
        patch: z.object({
          slug: z.string().max(200).optional(),
          title: z.string().max(300).optional(),
          category: z.string().max(80).optional(),
          excerpt: z.string().optional(),
          body: z.string().optional(),
          coverImage: z.string().max(600).optional(),
          published: z.boolean().optional(),
        }),
      }),
    )
    .mutation(({ input }) => updatePost(input.id, input.patch)),
  deletePost: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deletePost(input.id)),

  // Testimonials management (admin-entered only, never fabricated)
  testimonials: adminProcedure.query(() => listTestimonials(false)),
  createTestimonial: adminProcedure
    .input(
      z.object({
        author: z.string().min(1).max(200),
        location: z.string().max(200).optional(),
        quote: z.string().min(1),
        published: z.boolean().default(false),
      }),
    )
    .mutation(({ input }) => createTestimonial(input)),
  updateTestimonial: adminProcedure
    .input(
      z.object({
        id: z.number(),
        patch: z.object({
          author: z.string().max(200).optional(),
          location: z.string().max(200).optional(),
          quote: z.string().optional(),
          published: z.boolean().optional(),
        }),
      }),
    )
    .mutation(({ input }) => updateTestimonial(input.id, input.patch)),
  deleteTestimonial: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteTestimonial(input.id)),
});
