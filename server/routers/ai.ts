import { z } from "zod";
import { invokeLLM } from "../_core/llm";
import { logChatMessage } from "../db";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";

const messageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string().max(8000),
});

const AGENT_CONTEXT = `You are the AI assistant for Stacy Slone, REALTOR®, a real estate agent with KW Elite Realty serving the Triangle region of North Carolina (Raleigh, Durham, Chapel Hill, Cary, Apex, Wake Forest, Hillsborough, Morrisville and surrounding areas).

Rules you must always follow:
- Stay strictly focused on Triangle NC real estate: buying, selling, relocating, neighborhoods, the local process, and how Stacy can help. Politely redirect off-topic questions back to real estate.
- Be warm, polished, confident, and genuinely helpful, never pushy.
- NEVER invent specific listings, prices, market statistics, school ratings, or guarantees. If asked for live data you do not have, say it is best confirmed directly with Stacy and offer to connect them.
- Follow Fair Housing principles. Do not steer based on protected classes, and do not characterize neighborhoods as more or less suitable for any protected group. Frame everything as neutral consumer research.
- Encourage the visitor to take a next step: request a home valuation, set up property alerts, or contact Stacy at (919) 972-1180.
- Keep answers concise and easy to read. Use short paragraphs or brief lists.`;

export const aiRouter = router({
  // AI Concierge chat (site-wide widget) + AI Home Search both use this.
  chat: publicProcedure
    .input(
      z.object({
        messages: z.array(messageSchema).min(1).max(40),
        source: z.enum(["concierge", "home-search"]).default("concierge"),
        sessionId: z.string().max(80).default("anonymous"),
      }),
    )
    .mutation(async ({ input }) => {
      const systemMessage = {
        role: "system" as const,
        content:
          input.source === "home-search"
            ? `${AGENT_CONTEXT}\n\nThe visitor is describing their ideal home. Acknowledge what they're looking for, offer thoughtful guidance about which Triangle areas and home types tend to match those preferences (qualitatively, no fabricated data), explain what to consider, and invite them to set up property alerts or contact Stacy so she can curate matching homes.`
            : `${AGENT_CONTEXT}\n\nYou are answering general buyer and seller questions as a concierge.`,
      };

      const lastUser = [...input.messages]
        .reverse()
        .find((m) => m.role === "user");

      const result = await invokeLLM({
        messages: [systemMessage, ...input.messages],
        max_tokens: 700,
      });

      const choice = result.choices?.[0]?.message?.content;
      const reply =
        typeof choice === "string"
          ? choice
          : "I'm sorry, I had trouble responding just now. Please call Stacy at (919) 972-1180 and she'll be glad to help.";

      // Log conversation (best-effort, non-blocking on failure)
      if (lastUser) {
        await logChatMessage({
          source: input.source,
          sessionId: input.sessionId,
          role: "user",
          content: lastUser.content,
        });
      }
      await logChatMessage({
        source: input.source,
        sessionId: input.sessionId,
        role: "assistant",
        content: reply,
      });

      return { reply };
    }),

  // AI School & Area research (Triangle-scoped)
  schoolSearch: publicProcedure
    .input(z.object({ query: z.string().min(2).max(600) }))
    .mutation(async ({ input }) => {
      const result = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `${AGENT_CONTEXT}\n\nThe visitor is researching schools and family-friendly areas in the Triangle. Offer general, neutral guidance about how school assignment works in the Triangle (Wake County, Durham, Chapel Hill-Carrboro, Johnston, Orange, Chatham districts), what to consider when buying near specific schools, and which areas are commonly researched. NEVER state specific school ratings, test scores, or rankings as fact, and NEVER imply any area is better for any protected group. Always tell them to verify school assignment and ratings with official district sources, since boundaries change. Invite them to contact Stacy.`,
          },
          { role: "user", content: input.query },
        ],
        max_tokens: 700,
      });
      const choice = result.choices?.[0]?.message?.content;
      const answer =
        typeof choice === "string"
          ? choice
          : "I had trouble researching that just now. Please call Stacy at (919) 972-1180.";
      return { answer };
    }),

  // AI neighborhood comparison (Triangle-scoped)
  compareNeighborhoods: publicProcedure
    .input(
      z.object({
        areaA: z.string().min(2).max(80),
        areaB: z.string().min(2).max(80),
        priorities: z.string().max(600).optional().default(""),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `${AGENT_CONTEXT}\n\nThe visitor wants a neutral, qualitative comparison of two Triangle areas. Compare them on lifestyle, housing character, commute/location, and amenities. Use only general, well-known characteristics, NEVER fabricate prices or statistics, and follow Fair Housing (no statements about who an area is right for based on protected classes). End by inviting them to talk with Stacy for tailored guidance.`,
          },
          {
            role: "user",
            content: `Compare ${input.areaA} and ${input.areaB} in the Triangle, NC.${input.priorities ? ` The visitor's priorities: ${input.priorities}.` : ""} Give a balanced overview of each, then a short summary of how they differ.`,
          },
        ],
        max_tokens: 800,
      });
      const choice = result.choices?.[0]?.message?.content;
      const answer =
        typeof choice === "string"
          ? choice
          : "I had trouble comparing those just now. Please call Stacy at (919) 972-1180.";
      return { answer };
    }),

  // Admin-only AI Listing Writer / MLS copy generator
  writeListing: adminProcedure
    .input(
      z.object({
        address: z.string().max(400).optional().default(""),
        propertyType: z.string().max(120).optional().default(""),
        beds: z.string().max(40).optional().default(""),
        baths: z.string().max(40).optional().default(""),
        sqft: z.string().max(40).optional().default(""),
        features: z.string().max(4000),
        tone: z
          .enum(["warm", "luxury", "concise", "story-driven"])
          .default("warm"),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `You are an expert real estate copywriter for Stacy Slone, REALTOR® (KW Elite Realty) in the Triangle, NC. Write compelling, MLS-compliant listing descriptions.
Rules: Be accurate to the details provided, do not invent rooms, sizes, or features not given. Follow Fair Housing guidelines (describe the property, never the ideal buyer or protected classes; avoid words like "family", "perfect for", "safe neighborhood", "walking distance to church/school"). Produce engaging, professional copy.`,
          },
          {
            role: "user",
            content: `Write a real estate listing description with a ${input.tone} tone.
Address: ${input.address || "N/A"}
Type: ${input.propertyType || "N/A"}
Beds: ${input.beds || "N/A"} | Baths: ${input.baths || "N/A"} | SqFt: ${input.sqft || "N/A"}
Key features and notes:
${input.features}

Return: (1) a punchy headline, (2) a 2-3 paragraph description, and (3) a short bulleted feature highlight list.`,
          },
        ],
        max_tokens: 900,
      });

      const choice = result.choices?.[0]?.message?.content;
      const copy = typeof choice === "string" ? choice : "";
      return { copy };
    }),
});
