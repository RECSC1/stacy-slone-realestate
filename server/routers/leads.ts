import { z } from "zod";
import { createLead } from "../db";
import { notifyOwner } from "../_core/notification";
import { publicProcedure, router } from "../_core/trpc";

const baseContact = {
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone: z.string().max(40).optional().default(""),
};

async function safeNotify(title: string, content: string) {
  try {
    await notifyOwner({ title, content });
  } catch (e) {
    console.warn("[notifyOwner] failed:", e);
  }
}

function formatDetails(details: Record<string, unknown>): string {
  return Object.entries(details)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k}: ${String(v)}`)
    .join("\n");
}

export const leadsRouter = router({
  // Home valuation, form name: stacy-home-valuation
  homeValuation: publicProcedure
    .input(
      z.object({
        ...baseContact,
        propertyAddress: z.string().min(1).max(400),
        timeline: z.string().max(120).optional().default(""),
        sellingPlans: z.string().max(2000).optional().default(""),
        notes: z.string().max(2000).optional().default(""),
      }),
    )
    .mutation(async ({ input }) => {
      await createLead({
        formName: "stacy-home-valuation",
        name: input.name,
        email: input.email,
        phone: input.phone,
        propertyAddress: input.propertyAddress,
        message: input.notes,
        details: {
          timeline: input.timeline,
          sellingPlans: input.sellingPlans,
        },
      });
      await safeNotify(
        "New Home Valuation Request",
        `${input.name} requested a home valuation.\n\n` +
          formatDetails({
            Email: input.email,
            Phone: input.phone,
            Address: input.propertyAddress,
            Timeline: input.timeline,
            "Selling plans": input.sellingPlans,
            Notes: input.notes,
          }),
      );
      return { success: true };
    }),

  // Contact, form name: contact
  contact: publicProcedure
    .input(
      z.object({
        ...baseContact,
        message: z.string().min(1).max(4000),
      }),
    )
    .mutation(async ({ input }) => {
      await createLead({
        formName: "contact",
        name: input.name,
        email: input.email,
        phone: input.phone,
        message: input.message,
      });
      await safeNotify(
        "New Contact Message",
        `${input.name} sent a message.\n\n` +
          formatDetails({
            Email: input.email,
            Phone: input.phone,
            Message: input.message,
          }),
      );
      return { success: true };
    }),

  // Property alerts, form name: stacy-property-alerts
  propertyAlerts: publicProcedure
    .input(
      z.object({
        ...baseContact,
        priceRange: z.string().max(120).optional().default(""),
        area: z.string().max(200).optional().default(""),
        beds: z.string().max(40).optional().default(""),
        baths: z.string().max(40).optional().default(""),
        propertyType: z.string().max(120).optional().default(""),
        timeline: z.string().max(120).optional().default(""),
        notes: z.string().max(2000).optional().default(""),
      }),
    )
    .mutation(async ({ input }) => {
      await createLead({
        formName: "stacy-property-alerts",
        name: input.name,
        email: input.email,
        phone: input.phone,
        message: input.notes,
        details: {
          priceRange: input.priceRange,
          area: input.area,
          beds: input.beds,
          baths: input.baths,
          propertyType: input.propertyType,
          timeline: input.timeline,
        },
      });
      await safeNotify(
        "New Property Alert Sign-up",
        `${input.name} signed up for property alerts.\n\n` +
          formatDetails({
            Email: input.email,
            Phone: input.phone,
            "Price range": input.priceRange,
            Area: input.area,
            Beds: input.beds,
            Baths: input.baths,
            "Property type": input.propertyType,
            Timeline: input.timeline,
            Notes: input.notes,
          }),
      );
      return { success: true };
    }),

  // Mortgage calculator lead, form name: mortgage-results
  mortgageResults: publicProcedure
    .input(
      z.object({
        ...baseContact,
        homePrice: z.number().optional(),
        estimatedPayment: z.number().optional(),
        notes: z.string().max(2000).optional().default(""),
      }),
    )
    .mutation(async ({ input }) => {
      await createLead({
        formName: "mortgage-results",
        name: input.name,
        email: input.email,
        phone: input.phone,
        message: input.notes,
        details: {
          homePrice: input.homePrice,
          estimatedPayment: input.estimatedPayment,
        },
      });
      await safeNotify(
        "New Mortgage Calculator Lead",
        `${input.name} used the mortgage calculator.\n\n` +
          formatDetails({
            Email: input.email,
            Phone: input.phone,
            "Home price": input.homePrice,
            "Estimated payment": input.estimatedPayment,
            Notes: input.notes,
          }),
      );
      return { success: true };
    }),

  // Resource download, form name: resource-download
  resourceDownload: publicProcedure
    .input(
      z.object({
        ...baseContact,
        resource: z.string().max(200),
      }),
    )
    .mutation(async ({ input }) => {
      await createLead({
        formName: "resource-download",
        name: input.name,
        email: input.email,
        phone: input.phone,
        details: { resource: input.resource },
      });
      await safeNotify(
        "New Resource Download Lead",
        `${input.name} requested the "${input.resource}" guide.\n\n` +
          formatDetails({ Email: input.email, Phone: input.phone }),
      );
      return { success: true };
    }),

  // General buyer search criteria capture (IDX-ready page)
  searchCriteria: publicProcedure
    .input(
      z.object({
        ...baseContact,
        criteria: z.string().max(2000),
      }),
    )
    .mutation(async ({ input }) => {
      await createLead({
        formName: "search-criteria",
        name: input.name,
        email: input.email,
        phone: input.phone,
        message: input.criteria,
      });
      await safeNotify(
        "New Home Search Inquiry",
        `${input.name} shared home search criteria.\n\n` +
          formatDetails({
            Email: input.email,
            Phone: input.phone,
            Criteria: input.criteria,
          }),
      );
      return { success: true };
    }),

  // Dedicated buyer inquiry, form name: stacy-buyer-inquiry
  buyerInquiry: publicProcedure
    .input(
      z.object({
        ...baseContact,
        timeline: z.string().max(120).optional().default(""),
        priceRange: z.string().max(120).optional().default(""),
        interests: z.string().max(2000).optional().default(""),
        message: z.string().max(4000).optional().default(""),
      }),
    )
    .mutation(async ({ input }) => {
      await createLead({
        formName: "stacy-buyer-inquiry",
        name: input.name,
        email: input.email,
        phone: input.phone,
        message: input.message,
        details: {
          timeline: input.timeline,
          priceRange: input.priceRange,
          interests: input.interests,
        },
      });
      await safeNotify(
        "New Buyer Inquiry",
        `${input.name} submitted a buyer inquiry.\n\n` +
          formatDetails({
            Email: input.email,
            Phone: input.phone,
            Timeline: input.timeline,
            "Price range": input.priceRange,
            "Areas of interest": input.interests,
            Message: input.message,
          }),
      );
      return { success: true };
    }),

  // Dedicated seller inquiry, form name: stacy-seller-inquiry
  sellerInquiry: publicProcedure
    .input(
      z.object({
        ...baseContact,
        propertyAddress: z.string().max(400).optional().default(""),
        timeline: z.string().max(120).optional().default(""),
        sellingReason: z.string().max(500).optional().default(""),
        message: z.string().max(4000).optional().default(""),
      }),
    )
    .mutation(async ({ input }) => {
      await createLead({
        formName: "stacy-seller-inquiry",
        name: input.name,
        email: input.email,
        phone: input.phone,
        propertyAddress: input.propertyAddress,
        message: input.message,
        details: {
          timeline: input.timeline,
          sellingReason: input.sellingReason,
        },
      });
      await safeNotify(
        "New Seller Inquiry",
        `${input.name} submitted a seller inquiry.\n\n` +
          formatDetails({
            Email: input.email,
            Phone: input.phone,
            "Property address": input.propertyAddress,
            Timeline: input.timeline,
            "Reason for selling": input.sellingReason,
            Message: input.message,
          }),
      );
      return { success: true };
    }),

  // Relocation inquiry, form name: stacy-relocation-inquiry
  relocationInquiry: publicProcedure
    .input(
      z.object({
        ...baseContact,
        currentLocation: z.string().max(200).optional().default(""),
        timeline: z.string().max(120).optional().default(""),
        relocatingReason: z.string().max(500).optional().default(""),
        message: z.string().max(4000).optional().default(""),
      }),
    )
    .mutation(async ({ input }) => {
      await createLead({
        formName: "stacy-relocation-inquiry",
        name: input.name,
        email: input.email,
        phone: input.phone,
        message: input.message,
        details: {
          currentLocation: input.currentLocation,
          timeline: input.timeline,
          relocatingReason: input.relocatingReason,
        },
      });
      await safeNotify(
        "New Relocation Inquiry",
        `${input.name} submitted a relocation inquiry.\n\n` +
          formatDetails({
            Email: input.email,
            Phone: input.phone,
            "Current location": input.currentLocation,
            Timeline: input.timeline,
            "Reason for relocating": input.relocatingReason,
            Message: input.message,
          }),
      );
      return { success: true };
    }),

  // Land/Investment inquiry, form name: stacy-land-investment-inquiry
  landInvestmentInquiry: publicProcedure
    .input(
      z.object({
        ...baseContact,
        investmentType: z.string().max(200).optional().default(""),
        budget: z.string().max(120).optional().default(""),
        timeline: z.string().max(120).optional().default(""),
        message: z.string().max(4000).optional().default(""),
      }),
    )
    .mutation(async ({ input }) => {
      await createLead({
        formName: "stacy-land-investment-inquiry",
        name: input.name,
        email: input.email,
        phone: input.phone,
        message: input.message,
        details: {
          investmentType: input.investmentType,
          budget: input.budget,
          timeline: input.timeline,
        },
      });
      await safeNotify(
        "New Land/Investment Inquiry",
        `${input.name} submitted a land/investment inquiry.\n\n` +
          formatDetails({
            Email: input.email,
            Phone: input.phone,
            "Investment type": input.investmentType,
            Budget: input.budget,
            Timeline: input.timeline,
            Message: input.message,
          }),
      );
      return { success: true };
    }),
});
