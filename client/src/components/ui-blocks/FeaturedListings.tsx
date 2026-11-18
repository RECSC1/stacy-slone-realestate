import { Link } from "wouter";
import { Bed, Bath, Maximize, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Section, SectionHeading } from "./Section";

function formatPrice(price: number | null) {
  if (!price) return "Price upon request";
  return `$${price.toLocaleString()}`;
}

export function FeaturedListings() {
  const { data: listings, isLoading } = trpc.content.featuredListings.useQuery();

  return (
    <Section className="bg-background">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Featured Listings"
          title="Handpicked homes across the Triangle"
          description="A curated look at current opportunities. New listings are added as they come to market."
        />
        <Link
          href="/buy"
          className="group flex items-center gap-2 text-sm font-medium text-primary"
        >
          View all homes
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-12">
        {isLoading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-80 animate-pulse border border-border bg-secondary/50"
              />
            ))}
          </div>
        ) : listings && listings.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((l) => (
              <article
                key={l.id}
                className="group overflow-hidden border border-border bg-card transition-shadow hover:shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  {l.imageUrl && (
                    <img
                      src={l.imageUrl}
                      alt={l.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-6">
                  <p className="font-serif text-2xl text-foreground">
                    {formatPrice(l.price)}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {l.address || l.title}
                    {l.city ? `, ${l.city}` : ""}
                  </p>
                  <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
                    {l.beds != null && (
                      <span className="flex items-center gap-1.5">
                        <Bed className="h-4 w-4" /> {l.beds}
                      </span>
                    )}
                    {l.baths != null && (
                      <span className="flex items-center gap-1.5">
                        <Bath className="h-4 w-4" /> {l.baths}
                      </span>
                    )}
                    {l.sqft != null && (
                      <span className="flex items-center gap-1.5">
                        <Maximize className="h-4 w-4" />{" "}
                        {l.sqft.toLocaleString()} sqft
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          // Honest empty state, no fabricated listings
          <div className="border border-dashed border-border bg-secondary/40 px-8 py-16 text-center">
            <p className="font-serif text-2xl text-foreground">
              New listings on the way
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Featured homes will appear here as they come to market. Want first
              access? Set up custom property alerts and you'll be among the first
              to know.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/property-alerts"
                className="bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.97]"
              >
                Set Up Property Alerts
              </Link>
              <Link
                href="/buy"
                className="border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary"
              >
                Start Your Search
              </Link>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
