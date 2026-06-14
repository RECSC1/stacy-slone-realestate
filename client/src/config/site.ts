/**
 * CENTRAL SITE CONFIGURATION
 * -------------------------------------------------------------------
 * Single source of truth for Stacy Wilson Slone's brand details.
 * Edit the values here to update the site globally. Anything wrapped
 * in square brackets like "[License number]" is a placeholder that is
 * safe and easy to replace once the real value is provided.
 */

export const ASSETS = {
  // Headshot: Stacy Wilson Slone's real professional editorial headshot.
  // Served from the deploy-safe public folder (client/public/images), so it is
  // bundled into the production build. The Headshot component renders this photo
  // inside the cream/taupe/black editorial frame and only falls back to the
  // elegant monogram panel if the asset ever fails to load.
  headshot: "/images/stacy-wilson-slone-triangle-realtor-headshot.jpg",
  headshotIsPlaceholder: false,
  // Stacy pictured with her KW Elite Realty "Top 10%" recognition sign. Used as
  // the editorial portrait on the About page.
  aboutPortrait: "/images/stacy-wilson-slone-top-10-percent-kw-elite.jpg",
  aboutPortraitAlt:
    "Stacy Wilson Slone being recognized as a Top 10% Realtor with Keller Williams Elite Realty",
  logoMonogram:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/sws-monogram-jmaARJMnpKpwkAW4v57s9F.webp",
  // KW Elite Realty logo, served from the deploy-safe public folder. Rendered on
  // a dark plaque in the footer; if the asset ever fails to load, the footer
  // falls back to the elegant styled-text treatment instead of a broken image.
  kwEliteLogo: "/images/kw-elite-realty-logo.jpg",
  heroHome:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/hero-southern-home_9ff96c9e.jpg",
  creamBrickLantern:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/cream-brick-lantern_b1917274.jpg",
  porchBlackShutters:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/porch-black-shutters_b023c05e.jpg",
  neutralInteriorWide:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/neutral-interior-wide_a75e2d8e.jpg",
  neutralLivingRoom:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/neutral-living-room_cc4639a5.jpg",
  neutralKitchen:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/neutral-kitchen_53873430.jpg",
  homeLibrary:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/home-library_8b0df59d.jpg",
  whiteBrickPorch:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/white-brick-porch_b44596b1.jpg",
  treeLinedNeighborhood:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/tree-lined-neighborhood_16a18435.jpg",
  ctaHome:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/cta-home_02d28c7a.jpg",
  stagingBefore:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/staging-before-TUS6eTyKSSp23Bae7RiCU6.webp",
  stagingAfter:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/staging-after-hqz2Rwzpub8BWF8i2XXj5M.webp",
  communities: {
    raleigh:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/raleigh-skyline_3432b40a.jpg",
    durham:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/durham-tobacco_5bb5c28e.jpg",
    chapelHill:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/chapel-hill_e33aad2e.jpg",
    cary:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/cary-park_1f34908f.jpg",
    apex:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/apex_b587b7ef.jpg",
    wakeForest:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/wake-forest_d4591b21.jpg",
    hillsborough:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/hillsborough_3a2a66b7.jpg",
  },
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
  phone: "919-332-8889",
  phoneHref: "tel:+19193328889",
  email: "stacy@stacyslonerealty.com",
  emailHref: "mailto:stacy@stacyslonerealty.com",

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
  image: string;
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
    image: ASSETS.communities.raleigh,
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
    image: ASSETS.communities.durham,
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
    image: ASSETS.communities.chapelHill,
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
    image: ASSETS.communities.cary,
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
    image: ASSETS.communities.apex,
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
    image: ASSETS.communities.wakeForest,
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
    image: ASSETS.communities.hillsborough,
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
