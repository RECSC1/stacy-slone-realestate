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
        description="Meet Stacy Wilson Slone, a dedicated real estate professional serving the Triangle NC market with personalized guidance and local expertise."
      />

      <PageHero
        title="About Stacy"
        description="Real estate guidance rooted in genuine care and local knowledge"
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
                Stacy is a dedicated real estate professional serving the Raleigh, Durham, Chapel Hill, and surrounding Triangle communities. With a focus on personalized guidance and local market expertise, Stacy helps buyers find their next home, sellers market their properties effectively, and families navigate relocations with confidence.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                What Stacy Brings
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Whether you're buying, selling, or relocating to the Triangle, Stacy combines deep local knowledge with a genuine commitment to understanding your unique needs. Every client receives personalized attention and honest guidance tailored to their goals.
              </p>
            </div>

            <blockquote className="border-l-2 border-primary bg-secondary/50 px-6 py-4 font-serif text-xl italic leading-relaxed text-foreground">
              "{SITE.tagline}"
            </blockquote>

            {/* Why Work with Stacy */}
            <div className="mt-10 border border-border bg-secondary/40 p-6">
              <p className="text-sm font-medium text-foreground mb-4">
                Why Work with Stacy
              </p>
              <ul className="space-y-2 text-sm leading-relaxed text-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>Deep knowledge of Raleigh, Durham, Chapel Hill, and surrounding Triangle communities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>Specializes in buyer guidance, seller marketing, and relocation support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>Keller Williams Elite Realty — backed by a trusted national network</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>Personalized approach rooted in genuine care and local expertise</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.97]"
              >
                Work With Stacy
              </Link>
              <Link
                href="/home-valuation"
                className="border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary"
              >
                Get a Home Valuation
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
            Whether you're buying, selling, or relocating, Stacy is here to help. Reach out today to discuss your real estate goals.
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
