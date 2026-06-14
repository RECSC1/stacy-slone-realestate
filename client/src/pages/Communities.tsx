import { Link } from "wouter";
import { ArrowRight, MapPin } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";
import { SmartImage } from "@/components/SmartImage";
import { CommunityPlate } from "@/components/CommunityPlate";
import { COMMUNITIES } from "@/config/site";
import { HERO_IMAGES } from "@/config/images";

export default function Communities() {
  return (
    <>
      <Seo
        title="Triangle NC Communities"
        description="Explore Triangle North Carolina communities with Stacy Wilson Slone, KW Elite Realty — Raleigh, Durham, Chapel Hill, Cary, Apex, Wake Forest, and Hillsborough."
      />
      <PageHero
        image={HERO_IMAGES.communities}
        imageAlt="Tree-lined Triangle North Carolina neighborhood"
        eyebrow="Explore the Triangle"
        title="Communities across the Triangle"
        description="Each Triangle market has its own character. Explore the areas Stacy serves to find where you belong."
      />

      <Section className="bg-background">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {COMMUNITIES.map((c, i) => (
            <Link
              key={c.slug}
              href={`/communities/${c.slug}`}
              className="group flex flex-col overflow-hidden border border-border bg-card transition-shadow hover:shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                {c.image ? (
                  <SmartImage
                    src={c.image}
                    alt={`${c.name}, North Carolina — Triangle real estate with Stacy Wilson Slone, KW Elite Realty`}
                    loading="lazy"
                    fallbackLabel={`${c.name}, NC`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <CommunityPlate
                    name={c.name}
                    index={i}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> Triangle, NC
                </p>
                <h2 className="mt-2 font-serif text-2xl text-foreground">
                  {c.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-primary">
                  {c.tagline}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {c.overview.length > 130
                    ? `${c.overview.slice(0, 130)}...`
                    : c.overview}
                </p>
                <span className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                  Explore {c.name}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
