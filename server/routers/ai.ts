import { z } from "zod";
import { invokeLLM, isLLMConfigured } from "../_core/llm";
import { logChatMessage } from "../db";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";

const messageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string().max(8000),
});

const PHONE = "919-332-8889";

const AGENT_CONTEXT = `You are the AI assistant for Stacy Wilson Slone, a real estate agent with KW Elite Realty. Stacy is based in and specializes in the Triangle region of North Carolina (Raleigh, Durham, Chapel Hill, Cary, Apex, Wake Forest, Hillsborough, Morrisville and surrounding areas), but she can help clients anywhere in North Carolina and refer a trusted agent when a market is outside her direct coverage.

Rules you must always follow:
- Help with real estate ANYWHERE in North Carolina. If a visitor asks about Wilmington, Charlotte, Asheville, Greensboro, Winston-Salem, Fayetteville, Boone, Morehead City, Greenville, Chapel Hill, the Triangle, or any other NC city or area, engage helpfully and give general, qualitative guidance about that area. Never tell a visitor you only cover the Triangle or refuse a North Carolina city.
- Keep Stacy's positioning Triangle-focused: the Triangle is her home market and deepest expertise. For areas farther afield, be transparent that she can still help and coordinate, and that local, on-the-ground specifics are best confirmed with her.
- Politely redirect clearly off-topic, non-real-estate questions back to real estate.
- Be warm, polished, confident, and genuinely helpful — never pushy.
- NEVER invent specific listings, prices, market statistics, school ratings, MLS numbers, addresses, or guarantees. There is no live MLS/IDX feed connected. If asked for live inventory or hard data you do not have, say it is best confirmed directly with Stacy and offer to connect them.
- Follow Fair Housing principles. Do not steer based on protected classes, and do not characterize neighborhoods as more or less suitable for any protected group (avoid "good/bad for families" and similar). Frame everything as neutral consumer research.
- Encourage the visitor to take a next step: request a home valuation, set up property alerts, or contact Stacy at ${PHONE}.
- Keep answers concise and easy to read. Use short paragraphs or brief lists.`;

/**
 * Builds a polished, non-AI fallback when no inference provider is available or
 * the provider errors. It must never read as a generic failure — it organizes
 * the visitor's request and routes them to Stacy for follow-up.
 */
function homeSearchFallback(lastUserMessage: string | undefined): string {
  const criteria = lastUserMessage?.trim()
    ? `\n\nHere's what I've noted from your message:\n> ${lastUserMessage.trim().slice(0, 500)}`
    : "";
  return `Thanks for sharing what you're looking for. Live MLS/IDX results aren't connected to this site yet, so I can't show active listings here — but I can absolutely help organize your criteria and send them to Stacy so she can review current options with access to live inventory across North Carolina.${criteria}

A few things that help Stacy find the right fit:
- The city or area(s) you're considering (anywhere in NC)
- Your price range and timeline
- Beds/baths and must-have features
- Whether you're buying, selling, relocating, or investing

The fastest next steps: set up **Property Alerts** so Stacy can flag matching homes, or reach her directly at ${PHONE}. She personally curates matches rather than relying on an automated feed.`;
}

function schoolFallback(query: string): string {
  return `Thanks for researching schools${query.trim() ? ` for "${query.trim().slice(0, 200)}"` : ""}. Live school-rating data isn't connected to this site yet, and school assignments and ratings change, so anything shown here should be verified directly with the district.

How to research school assignment in North Carolina:
- Identify the county/district for the area (e.g. Wake County, Durham, Charlotte-Mecklenburg, New Hanover/Wilmington, Buncombe/Asheville, Guilford/Greensboro, Forsyth/Winston-Salem).
- Use the district's official school locator to confirm the assigned schools for a specific address — boundaries change year to year.
- Review official state and district sources for ratings and report cards rather than third-party summaries.

Share the area or school you're researching and Stacy can help you review next steps and connect you with official resources. You can also reach her at ${PHONE}.`;
}

function compareFallback(areaA: string, areaB: string): string {
  return `Live comparison data is being connected, so here's a framework you can use to compare **${areaA}** and **${areaB}** (anywhere in North Carolina) — and Stacy can fill in current, local context:

- **Location & access:** commute routes, distance to work hubs, airports, highways.
- **Housing character:** typical home styles, ages, lot sizes, and how established each area is.
- **Lifestyle & amenities:** parks, shopping, dining, and recreation each area is known for.
- **Market considerations:** inventory and pricing trends — these shift constantly and are best confirmed with current data, not estimated here.
- **Questions to ask:** What's the long-term plan for the area? How does each fit your timeline and budget?

Send the areas you're considering and Stacy can compare them with up-to-date local context. Reach her at ${PHONE}.`;
}

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
            ? `${AGENT_CONTEXT}\n\nThe visitor is describing their ideal home. Acknowledge what they're looking for, offer thoughtful guidance about which North Carolina areas and home types tend to match those preferences (qualitatively, no fabricated data), explain what to consider, and invite them to set up property alerts or contact Stacy so she can curate matching homes. Handle any NC city, not just the Triangle.`
            : `${AGENT_CONTEXT}\n\nYou are answering general buyer and seller questions as a concierge.`,
      };

      const lastUser = [...input.messages]
        .reverse()
        .find((m) => m.role === "user");

      let reply: string;
      let degraded = false;

      try {
        const result = await invokeLLM({
          messages: [systemMessage, ...input.messages],
          max_tokens: 700,
        });
        const choice = result.choices?.[0]?.message?.content;
        if (typeof choice === "string" && choice.trim().length > 0) {
          reply = choice;
        } else {
          degraded = true;
          reply = homeSearchFallback(lastUser?.content);
        }
      } catch (error) {
        console.error("[ai.chat] LLM call failed:", error);
        degraded = true;
        reply = homeSearchFallback(lastUser?.content);
      }

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

      return { reply, degraded };
    }),

  // AI School & Area research (North Carolina-wide)
  schoolSearch: publicProcedure
    .input(z.object({ query: z.string().min(2).max(600) }))
    .mutation(async ({ input }) => {
      try {
        const result = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `${AGENT_CONTEXT}\n\nThe visitor is researching schools and areas in North Carolina. This can be ANY NC city, district, or area — not only the Triangle. Offer general, neutral guidance about how school assignment works in NC (county/city districts such as Wake, Durham, Chapel Hill-Carrboro, Charlotte-Mecklenburg, New Hanover, Buncombe, Guilford, Forsyth, etc.), what to consider when buying near specific schools, and how to research them. NEVER state specific school ratings, test scores, or rankings as fact, and NEVER imply any area is better for any protected group. Always tell them to verify school assignment and ratings with official district sources, since boundaries change. Invite them to contact Stacy.`,
            },
            { role: "user", content: input.query },
          ],
          max_tokens: 700,
        });
        const choice = result.choices?.[0]?.message?.content;
        if (typeof choice === "string" && choice.trim().length > 0) {
          return { answer: choice, degraded: false };
        }
        return { answer: schoolFallback(input.query), degraded: true };
      } catch (error) {
        console.error("[ai.schoolSearch] LLM call failed:", error);
        return { answer: schoolFallback(input.query), degraded: true };
      }
    }),

  // AI neighborhood comparison (North Carolina-wide)
  compareNeighborhoods: publicProcedure
    .input(
      z.object({
        areaA: z.string().min(2).max(80),
        areaB: z.string().min(2).max(80),
        priorities: z.string().max(600).optional().default(""),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const result = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `${AGENT_CONTEXT}\n\nThe visitor wants a neutral, qualitative comparison of two North Carolina areas. They can be ANY NC cities or areas, not only the Triangle. Compare them on lifestyle, housing character, commute/location, and amenities. Use only general, well-known characteristics — NEVER fabricate prices or statistics, and follow Fair Housing (no statements about who an area is right for based on protected classes). If an area is outside Stacy's core Triangle market, note that she can still help and that local specifics are best confirmed with current data. End by inviting them to talk with Stacy for tailored guidance.`,
            },
            {
              role: "user",
              content: `Compare ${input.areaA} and ${input.areaB} in North Carolina.${input.priorities ? ` The visitor's priorities: ${input.priorities}.` : ""} Give a balanced overview of each, then a short summary of how they differ.`,
            },
          ],
          max_tokens: 800,
        });
        const choice = result.choices?.[0]?.message?.content;
        if (typeof choice === "string" && choice.trim().length > 0) {
          return { answer: choice, degraded: false };
        }
        return {
          answer: compareFallback(input.areaA, input.areaB),
          degraded: true,
        };
      } catch (error) {
        console.error("[ai.compareNeighborhoods] LLM call failed:", error);
        return {
          answer: compareFallback(input.areaA, input.areaB),
          degraded: true,
        };
      }
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
      if (!isLLMConfigured()) {
        return {
          copy: "",
          error:
            "The AI listing writer needs an AI provider configured (Netlify AI Gateway or OPENAI_API_KEY). Once that's set, listing copy will generate here.",
        };
      }
      try {
        const result = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `You are an expert real estate copywriter for Stacy Wilson Slone (KW Elite Realty) in North Carolina. Write compelling, MLS-compliant listing descriptions.
Rules: Be accurate to the details provided — do not invent rooms, sizes, or features not given. Follow Fair Housing guidelines (describe the property, never the ideal buyer or protected classes; avoid words like "family", "perfect for", "safe neighborhood", "walking distance to church/school"). Produce engaging, professional copy.`,
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
      } catch (error) {
        console.error("[ai.writeListing] LLM call failed:", error);
        return {
          copy: "",
          error:
            "The listing writer had trouble generating copy just now. Please try again in a moment.",
        };
      }
    }),
});
