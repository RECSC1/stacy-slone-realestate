/**
 * CENTRAL SITE CONFIGURATION
 * -------------------------------------------------------------------
 * Single source of truth for Stacy Wilson Slone's brand details.
 * Edit the values here to update the site globally. Anything wrapped
 * in square brackets like "[License number]" is a placeholder that is
 * safe and easy to replace once the real value is provided.
 */

import { LOCAL_IMAGES, COMMUNITY_IMAGES } from "@/config/images";

/**
 * Brand assets. Every value here is a locally bundled, deploy-safe asset.
 * There are intentionally NO external CloudFront / CDN URLs — those returned
 * HTTP 403 and have been removed. Where real photography is not yet available,
 * the consuming component renders an intentional editorial treatment (espresso
 * gradient hero, or a curated CSS community plate) rather than a broken image.
 * See `client/src/config/images.ts` for the full image strategy.
 */
export const ASSETS = {
  // Stacy Wilson Slone's real professional editorial headshot, bundled into the
  // production build. The Headshot component renders this photo inside the
  // cream/taupe/black editorial frame and only falls back to the elegant
  // monogram panel if the asset ever fails to load.
  headshot: LOCAL_IMAGES.homepagePortrait,
  headshotIsPlaceholder: false,
  // Stacy pictured with her KW Elite Realty "Top 10%" recognition sign. Used as
  // the editorial portrait on the About page.
  aboutPortrait: LOCAL_IMAGES.aboutPortrait,
  aboutPortraitAlt:
    "Stacy Wilson Slone being recognized as a Top 10% Realtor with Keller Williams Elite Realty",
  // Local editorial monogram (SVG) used as the refined image fallback mark.
  logoMonogram: LOCAL_IMAGES.monogram,
  // KW Elite Realty logo, served from the deploy-safe public folder.
  kwEliteLogo: LOCAL_IMAGES.kwEliteLogo,
} as const;

export const SITE = {
  agentName: "Stacy Wilson Slone",
  agentFirstName: "Stacy",
  tagline: "Choosing The RIGHT Realtor DOES Make A Difference.",
  subTagline:
    "Trusted real estate guidance across the Triangle — from your first showing to closing day and every milestone in between.",
  brokerage: "KW Elite Realty",
  brokerageLegalName: "Keller Williams Elite Realty",
  region: "Triangle, North Carolina",

  // Contact details
  phone: "(919) 972-1180",
  phoneHref: "tel:19199721180",
  email: "slonestacy@gmail.com",
  emailHref: "mailto:slonestacy@gmail.com",

  // Placeholders that are easy to find and replace
  officeAddress: "Raleigh, NC",
  licenseNumber: "Broker/Realtor®",
  brokerageDisclaimer:
    "Each office is independently owned and operated by a Keller Williams franchisee.",

  // SEO
  baseUrl: "https://stacyslonerealestate.com",
  seoTitle:
    "Stacy Wilson Slone | Triangle North Carolina Realtor with KW Elite Realty",
  seoDescription:
    "Stacy Wilson Slone is a Triangle North Carolina Realtor with KW Elite Realty serving Raleigh, Durham, Chapel Hill, Cary and surrounding areas. Buy, sell, and relocate with a trusted local expert.",
  headshotAlt:
    "Stacy Wilson Slone, Triangle North Carolina Realtor with Keller Williams Elite Realty",

  // Social links (add when available)
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },

  serviceAreas: [
    "Raleigh",
    "Durham",
    "Chapel Hill",
    "Cary",
    "Apex",
    "Wake Forest",
    "Hillsborough",
    "Morrisville",
  ],
} as const;

export type CommunitySlug =
  | "raleigh"
  | "durham"
  | "chapel-hill"
  | "cary"
  | "apex"
  | "wake-forest"
  | "hillsborough";

export interface Community {
  slug: CommunitySlug;
  name: string;
  /**
   * Local image path, or `null` when no photograph is available yet. When
   * null, the community is rendered with an intentional editorial CSS plate
   * (see CommunityPlate) and a gradient detail hero — never a broken image.
   */
  image: string | null;
  tagline: string;
  overview: string;
  housingStyle: string;
  commute: string;
  amenities: string[];
  positioning: string;
}

/**
 * Qualitative, Fair Housing compliant community descriptions.
 * No fabricated market data or pricing. Phrased as consumer research.
 */
export const COMMUNITIES: Community[] = [
  {
    slug: "raleigh",
    name: "Raleigh",
    image: COMMUNITY_IMAGES.raleigh,
    tagline: "The capital city anchor of the Triangle",
    overview:
      "North Carolina's capital blends a thriving downtown, established tree-lined neighborhoods, and a deep base of museums, parks, and universities. Raleigh offers a broad spectrum of housing and lifestyle options across its many districts.",
    housingStyle:
      "Everything from historic bungalows in Oakwood and Five Points to new construction in North Raleigh and modern infill near downtown.",
    commute:
      "Central access to I-40, I-440, and US-1, with proximity to Research Triangle Park and RDU International Airport.",
    amenities: [
      "Museums and the State Capitol district",
      "William B. Umstead State Park",
      "Extensive greenway system",
      "Dining, breweries, and the arts",
    ],
    positioning:
      "A versatile market that appeals to a wide range of buyers researching the Triangle.",
  },
  {
    slug: "durham",
    name: "Durham",
    image: COMMUNITY_IMAGES.durham,
    tagline: "Historic character meets innovation",
    overview:
      "Durham pairs a revitalized historic core — including the American Tobacco District — with a celebrated food scene and a strong creative and research community anchored by Duke University.",
    housingStyle:
      "Restored historic homes, walkable urban living, and established suburban neighborhoods throughout the city and county.",
    commute:
      "Quick access to Research Triangle Park, Duke, and major corridors including I-85 and the Durham Freeway.",
    amenities: [
      "American Tobacco Historic District",
      "Durham Performing Arts Center",
      "Renowned restaurant scene",
      "Duke Forest and area trails",
    ],
    positioning:
      "A distinctive market for buyers researching character, walkability, and culture.",
  },
  {
    slug: "chapel-hill",
    name: "Chapel Hill",
    image: COMMUNITY_IMAGES["chapel-hill"],
    tagline: "A classic college-town setting",
    overview:
      "Home to the University of North Carolina, Chapel Hill is known for its leafy streets, Franklin Street energy, and a strong sense of community within the wider Triangle.",
    housingStyle:
      "Established neighborhoods, wooded lots, and a mix of traditional and contemporary homes.",
    commute:
      "Connected via US-15/501 and NC-54, with access to RTP and neighboring Carrboro.",
    amenities: [
      "UNC campus and arts venues",
      "Franklin Street shopping and dining",
      "Extensive park and trail network",
      "Carolina North Forest",
    ],
    positioning:
      "A sought-after area for buyers researching a classic college-town environment.",
  },
  {
    slug: "cary",
    name: "Cary",
    image: COMMUNITY_IMAGES.cary,
    tagline: "Planned, polished, and central",
    overview:
      "Cary is one of the Triangle's most carefully planned communities, known for its parks, greenways, and the new Downtown Cary Park. It sits centrally between Raleigh, Durham, and RTP.",
    housingStyle:
      "Master-planned neighborhoods, established subdivisions, and a growing downtown core.",
    commute:
      "Central location with easy access to I-40, US-1, and Research Triangle Park.",
    amenities: [
      "Downtown Cary Park",
      "Koka Booth Amphitheatre",
      "Extensive greenway network",
      "Bond Park and area recreation",
    ],
    positioning:
      "A central, amenity-rich market popular with relocating buyers.",
  },
  {
    slug: "apex",
    name: "Apex",
    image: COMMUNITY_IMAGES.apex,
    tagline: "Historic small-town charm",
    overview:
      "Apex is known for its preserved historic downtown and a welcoming small-town feel, while remaining well-connected to the broader Triangle economy.",
    housingStyle:
      "Historic downtown homes alongside newer planned neighborhoods.",
    commute:
      "Convenient access via US-1 and NC-55 to Cary, RTP, and Raleigh.",
    amenities: [
      "Historic Downtown Apex",
      "Local shops and restaurants",
      "Community parks and trails",
      "Annual community events",
    ],
    positioning:
      "A charming market for buyers researching a downtown-anchored lifestyle.",
  },
  {
    slug: "wake-forest",
    name: "Wake Forest",
    image: COMMUNITY_IMAGES["wake-forest"],
    tagline: "Small-town warmth north of Raleigh",
    overview:
      "Just north of Raleigh, Wake Forest combines a historic downtown with newer growth, offering a relaxed pace while staying connected to the capital.",
    housingStyle:
      "Historic homes near downtown and a range of newer neighborhoods.",
    commute:
      "Access via US-1/Capital Boulevard to North Raleigh and beyond.",
    amenities: [
      "Historic Downtown Wake Forest",
      "Local breweries and dining",
      "Community greenways",
      "Joyner Park",
    ],
    positioning:
      "A welcoming market for buyers researching a small-town setting near Raleigh.",
  },
  {
    slug: "hillsborough",
    name: "Hillsborough",
    image: COMMUNITY_IMAGES.hillsborough,
    tagline: "Riverside history and craft culture",
    overview:
      "Hillsborough offers a richly historic downtown along the Eno River, a celebrated literary and craft community, and easy access to both Durham and Chapel Hill.",
    housingStyle:
      "Historic district homes and surrounding rural and suburban properties.",
    commute:
      "Positioned along I-85/I-40 between Durham and the Triad.",
    amenities: [
      "Historic Downtown Hillsborough",
      "Riverwalk along the Eno River",
      "Local galleries and dining",
      "Regional parks",
    ],
    positioning:
      "A distinctive market for buyers researching history and riverside character.",
  },
];

/** Compliance + legal blocks for the footer. Placeholders are intentional. */
export const COMPLIANCE = {
  equalHousing:
    "Equal Housing Opportunity. All real estate services are offered without regard to race, color, religion, sex, handicap, familial status, or national origin.",
  idxDisclaimer:
    "[MLS / IDX disclaimer — to be added once IDX/MLS access is approved.]",
  fairHousing:
    "We are committed to the principles of the Fair Housing Act. Information on this site is for general consumer research and is not a representation about any protected class.",
};
