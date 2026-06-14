import { ReactNode, useState } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  image?: string | null;
  imageAlt?: string;
}

/**
 * Luxury editorial banner used at the top of interior pages.
 *
 * Always renders as a dark espresso band with warm ivory typography and a tan
 * eyebrow accent, so contrast is guaranteed whether or not a background image
 * is present. A failed image gracefully falls back to a layered espresso
 * gradient instead of a broken image — the band never collapses or loses its
 * readable text.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
}: PageHeroProps) {
  const [imageOk, setImageOk] = useState(true);
  const showImage = Boolean(image) && imageOk;

  return (
    <section className="relative isolate overflow-hidden bg-primary-dark">
      <div className="absolute inset-0 -z-10">
        {showImage ? (
          <>
            <img
              src={image ?? undefined}
              alt={imageAlt ?? ""}
              onError={() => setImageOk(false)}
              className="h-full w-full object-cover"
            />
            {/* Dark wash keeps ivory text readable over any photograph */}
            <div className="absolute inset-0 bg-[#151310]/78" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#151310]/85 via-[#151310]/55 to-transparent" />
          </>
        ) : (
          <>
            <div className="h-full w-full bg-gradient-to-br from-[#151310] via-[#1e1a17] to-[#24211d]" />
            {/* Intentional Southern-architectural linework so the band reads as
                a designed editorial treatment, not a missing photograph. */}
            <svg
              aria-hidden
              viewBox="0 0 1200 400"
              preserveAspectRatio="xMidYMax slice"
              className="absolute inset-0 h-full w-full text-accent"
            >
              <g fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.14">
                <path d="M0 300 L150 250 L300 300 L450 240 L600 300 L750 250 L900 300 L1050 250 L1200 300" />
                <line x1="0" y1="340" x2="1200" y2="340" />
                <line x1="180" y1="340" x2="180" y2="400" />
                <line x1="420" y1="340" x2="420" y2="400" />
                <line x1="660" y1="340" x2="660" y2="400" />
                <line x1="900" y1="340" x2="900" y2="400" />
                <line x1="1140" y1="340" x2="1140" y2="400" />
              </g>
            </svg>
          </>
        )}
      </div>

      {/* Hairline tan top rule for editorial structure */}
      <div className="absolute inset-x-0 top-0 h-px bg-accent/40" />

      <div className="container py-16 md:py-20 lg:py-24">
        {eyebrow && (
          <p className="eyebrow text-accent-light">{eyebrow}</p>
        )}
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-[#fbf6ef] md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#fbf6ef]/85">
            {description}
          </p>
        )}
        <div className="mt-8 h-px w-24 bg-accent" />
      </div>
    </section>
  );
}
