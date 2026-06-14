import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section, SectionHeading } from "@/components/ui-blocks/Section";
import { SmartImage } from "@/components/SmartImage";
import { ASSETS, PROOF, SITE } from "@/config/site";
import { Link } from "wouter";

export default function About() {
  return (
    <>
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
          {/* Editorial portrait — Stacy recognized as a Top 10% KW Elite Realtor */}
          <figure className="relative mx-auto mb-12 w-full max-w-2xl overflow-hidden border border-primary-dark bg-[#faf8f5] p-2 shadow-[0_10px_30px_rgba(45,45,45,0.12)]">
            <div className="relative border border-accent/40">
              <SmartImage
                src={ASSETS.aboutPortrait}
                alt={ASSETS.aboutPortraitAlt}
                loading="eager"
                fallbackLabel="Stacy Wilson Slone · KW Elite Realty"
                className="block h-auto min-h-[260px] w-full object-cover"
              />
            </div>
          </figure>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
                Stacy Wilson Slone
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed font-medium mb-2">
                Realtor® | KW Elite Realty
              </p>
              <p className="text-sm text-foreground/50 mb-6">
                {SITE.licenseLabel}
              </p>
            </div>

            {/* Proof points — approved, tastefully presented */}
            <div className="grid grid-cols-2 gap-px border border-accent/30 bg-accent/30 sm:grid-cols-4">
              {[
                { value: `${PROOF.yearsExperience} Years`, label: "Local Experience" },
                { value: PROOF.totalSales, label: "Total Sales" },
                { value: PROOF.salesLast12Months, label: "Sales · Last 12 Months" },
                { value: PROOF.rating, label: `Rating · ${PROOF.reviewCount} Reviews` },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#faf8f5] px-5 py-6 text-center">
                  <p className="font-serif text-3xl text-primary-dark">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-light">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-foreground/55">
              Experience across a wide range of price points and property types.
            </p>

            <div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                Her Journey
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Originally from Pennsylvania, Stacy moved to Durham, North Carolina in 1988 when her mother was transferred with Verizon. After nearly a decade working in interior design, she discovered her true passion in real estate. She spent nine years as an Executive Assistant to two top-producing agents in the Triangle, gaining invaluable insights into the market and developing the skills that would define her career.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                For the past nine years, Stacy has worked directly with buyers and sellers, building a reputation for hard work, market expertise, and unwavering commitment to her clients' best interests. She's grown tremendously in this career and loves it more with each passing year, with plans to serve the Triangle real estate community for many years to come.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                What Stacy Brings
              </h3>
              <p className="text-foreground/80 leading-relaxed">
                Whether you're buying your first home, selling a property, relocating to the Triangle, or exploring investment opportunities, Stacy combines deep local market knowledge with professional expertise and genuine care for your success. Her clients know they can count on her to work tirelessly and always advocate for their best interests.
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
      </Section>

      {/* Contact CTA */}
      <Section className="section-md section-dark">
        <div className="max-w-2xl mx-auto text-center">
          <p className="eyebrow text-accent-light mb-4">Let's Talk</p>
          <h2 className="text-3xl font-serif font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-background/80 mb-8">
            Whether you're buying, selling, or relocating to the Triangle, reach out to discuss your real estate goals.
          </p>
          <Link href="/contact" className="btn-on-dark inline-block">
            Contact Stacy
          </Link>
        </div>
      </Section>
    </>
  );
}
