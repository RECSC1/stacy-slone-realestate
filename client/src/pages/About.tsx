import { Seo } from "@/components/Seo";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section, SectionHeading } from "@/components/ui-blocks/Section";
import { Link } from "wouter";
import { SITE, ASSETS } from "@/config/site";

export default function About() {
  return (
    <SiteLayout>
      <Seo
        title="About Stacy Wilson Slone | Triangle Real Estate"
        description="Meet Stacy Wilson Slone, a real estate agent at KW Elite Realty serving the Triangle NC market."
      />

      <PageHero
        title="About Stacy"
        description="Real estate guidance for the Triangle"
        image="https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/neutral-living-room_cc4639a5.jpg"
      />

      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 items-start">
            {/* Headshot */}
            <div className="md:col-span-1">
              <img
                src={ASSETS.headshot}
                alt="Stacy Wilson Slone"
                className="w-full rounded-lg shadow-lg max-w-xs"
              />
            </div>

            {/* Bio */}
            <div className="md:col-span-3 space-y-6">
              <div>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                  Stacy Wilson Slone
                </h2>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  Stacy is a real estate agent at KW Elite Realty, serving buyers, sellers, and investors across the Raleigh, Durham, Chapel Hill, and surrounding Triangle communities.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                  What Stacy Does
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  Whether you're buying your first home, selling a property, relocating to the area, or looking for investment opportunities, Stacy brings local market knowledge and professional expertise to guide you through every step of the real estate process.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.97]"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/buyer-inquiry"
                  className="border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary"
                >
                  Start Your Search
                </Link>
              </div>
            </div>
            </div>
          </div>
      </Section>

      {/* Contact CTA */}
      <Section className="py-16 bg-primary/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-foreground/80 mb-6">
            Whether you're buying, selling, or relocating to the Triangle, reach out to discuss your real estate goals.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary px-8 py-3 text-base font-medium text-primary-foreground rounded-lg transition-transform active:scale-[0.97]"
          >
            Contact Stacy
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
