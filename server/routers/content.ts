import { z } from "zod";
import {
  getPostBySlug,
  listFeaturedListings,
  listListings,
  listPosts,
  listTestimonials,
} from "../db";
import { publicProcedure, router } from "../_core/trpc";

export const contentRouter = router({
  featuredListings: publicProcedure.query(() => listFeaturedListings()),
  activeListings: publicProcedure.query(() => listListings()),
  publishedPosts: publicProcedure.query(() => listPosts(true)),
  postBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => getPostBySlug(input.slug)),
  publishedTestimonials: publicProcedure.query(() =>
    listTestimonials(true),
  ),
});
