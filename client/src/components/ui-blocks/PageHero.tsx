import { ReactNode, useState } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  image?: string;
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
              src={image}
              alt={imageAlt ?? ""}
              onError={() => setImageOk(false)}
              className="h-full w-full object-cover"
            />
            {/* Dark wash keeps ivory text readable over any photograph */}
            <div className="absolute inset-0 bg-[#151310]/78" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#151310]/85 via-[#151310]/55 to-transparent" />
          </>
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#151310] via-[#1e1a17] to-[#24211d]" />
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
