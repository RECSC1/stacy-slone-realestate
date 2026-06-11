import { Link, useParams } from "wouter";
import { Check, MapPin, Car, Home as HomeIcon, ArrowLeft } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";
import { COMMUNITIES, SITE } from "@/config/site";
import NotFound from "./NotFound";

export default function CommunityDetail() {
  const params = useParams();
  const slug = params.slug;
  const community = COMMUNITIES.find((c) => c.slug === slug);

  if (!community) return <NotFound />;

  return (
    <>
      <Seo
        title={`${community.name}, NC Real Estate`}
        description={`${community.name}, North Carolina real estate guidance from Stacy Wilson Slone, KW Elite Realty. ${community.tagline}.`}
      />
      <PageHero
        image={community.image}
        imageAlt={`${community.name}, North Carolina — Triangle real estate with Stacy Wilson Slone`}
        eyebrow="Triangle Community"
        title={community.name}
        description={community.tagline}
      />

      <Section className="bg-background">
        <Link
          href="/communities"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> All communities
        </Link>

        <div className="grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div>
            <h2 className="font-serif text-3xl text-foreground">
              Living in {community.name}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {community.overview}
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="border border-border bg-card p-6">
                <HomeIcon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                <p className="mt-3 font-medium text-foreground">Housing Style</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {community.housingStyle}
                </p>
              </div>
              <div className="border border-border bg-card p-6">
                <Car className="h-6 w-6 text-primary" strokeWidth={1.5} />
                <p className="mt-3 font-medium text-foreground">
                  Location &amp; Access
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {community.commute}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="font-serif text-2xl text-foreground">
                Local highlights
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {community.amenities.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-8 text-sm italic leading-relaxed text-muted-foreground">
              {community.positioning}
            </p>
          </div>

          {/* Sidebar CTA */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-border bg-secondary/50 p-8">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {community.name}, NC
              </p>
              <h3 className="mt-2 font-serif text-2xl text-foreground">
                Thinking about {community.name}?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Stacy can help you explore {community.name} and find homes that
                fit your goals. Set up alerts or reach out for a personal
                conversation.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/property-alerts"
                  className="bg-primary px-6 py-3 text-center text-sm font-medium text-primary-foreground transition-transform active:scale-[0.97]"
                >
                  Set Up Property Alerts
                </Link>
                <Link
                  href="/home-valuation"
                  className="border border-border bg-background px-6 py-3 text-center text-sm font-medium text-foreground transition-colors hover:border-primary"
                >
                  Get a Home Valuation
                </Link>
                <a
                  href={SITE.phoneHref}
                  className="px-6 py-2 text-center text-sm font-medium text-primary"
                >
                  Or call {SITE.phone}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
