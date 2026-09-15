/**
 * CENTRALIZED IMAGE CONFIGURATION
 * -------------------------------------------------------------------
 * Single source of truth for every photographic / brand asset on the
 * site. Only locally bundled, deploy-safe assets (served from
 * `client/public/images`) are referenced here — there are intentionally
 * NO external CloudFront / CDN URLs, which previously returned HTTP 403
 * and forced repeated monogram fallbacks.
 *
 * When a real photograph is not yet available the value is `null`. The
 * consuming component then renders an intentional editorial treatment
 * instead of a broken image:
 *   - Page heroes  -> dark espresso gradient band with tan architectural
 *                     linework (see components/ui-blocks/PageHero.tsx).
 *   - Community cards -> curated CSS "plate" with espresso background,
 *                     ivory text, tan linework and a small map-pin label
 *                     (see components/CommunityPlate.tsx).
 *
 * To swap in real photography later, drop the file into
 * `client/public/images` and point the relevant key below at it. Nothing
 * else needs to change.
 */

/** Locally bundled imagery that is confirmed to load. */
export const LOCAL_IMAGES = {
  /** Homepage brand portrait + Contact sidebar portrait. */
  homepagePortrait:
    "/images/stacy-wilson-slone-triangle-realtor-headshot.jpg",
  contactPortrait:
    "/images/stacy-wilson-slone-triangle-realtor-headshot.jpg",
  /** About page editorial portrait — Stacy with her KW "Top 10%" sign. */
  aboutPortrait:
    "/images/stacy-wilson-slone-top-10-percent-kw-elite.jpg",
  /** KW Elite Realty logo (currently rendered as styled text in the footer). */
  kwEliteLogo: "/images/kw-elite-realty-logo.jpg",
  /** Local editorial monogram used as a refined fallback mark. */
  monogram: "/images/sws-monogram.svg",
} as const;

/**
 * Page hero imagery. `null` => the page renders the intentional dark
 * espresso editorial gradient (NOT a missing-image state). Replace a
 * value with a local `/images/...` path to use a real photograph.
 */
export const HERO_IMAGES: Record<string, string | null> = {
  home: "/images/downtown-durham-skyline-night.webp",
  about: null,
  buy: null,
  sell: null,
  homeValuation: null,
  communities: null,
  relocation: null,
  landInvestment: null,
  localLandmarks: null,
  contact: null,
};

/**
 * Community card imagery, keyed by community slug. `null` => the card is
 * rendered as a curated editorial CSS plate (see CommunityPlate). The
 * live communities are listed first; the remaining keys are reserved so
 * additional Triangle-area communities can be given photography later
 * from one place.
 */
export const COMMUNITY_IMAGES: Record<string, string | null> = {
  // Live communities
  raleigh: "/images/downtown-raleigh-community.webp",
  durham: "/images/downtown-durham-skyline-night.webp",
  "chapel-hill": "/images/downtown-chapel-hill-community.webp",
  cary: null,
  apex: "/images/downtown-apex-community.webp",
  "wake-forest": "/images/historic-downtown-wake-forest-community.webp",
  hillsborough: "/images/historic-downtown-hillsborough-community.webp",
  // Reserved for future community pages
  mebane: null,
  burlington: null,
  oxford: null,
};
