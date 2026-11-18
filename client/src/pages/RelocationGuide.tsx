import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { LeadForm } from "@/components/ui-blocks/LeadForm";
import { Section, SectionHeading } from "@/components/ui-blocks/Section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { HERO_IMAGES } from "@/config/images";

export default function RelocationGuide() {
  return (
    <>
      <Seo
        title="Relocation Guide | Stacy Slone, REALTOR® | Triangle NC Realtor"
        description="Moving to the Triangle? Get expert relocation guidance, neighborhood insights, and personalized support from Stacy Slone, REALTOR®."
      />

      <PageHero
        title="Relocating to the Triangle?"
        description="Expert guidance for your move to North Carolina"
        image={HERO_IMAGES.relocation}
      />

      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Your Relocation Inquiry" />
          <p className="text-lg text-charcoal/80 mb-8">
            Whether you're relocating for a job, family, or a fresh start, Stacy can help you navigate the Triangle market and find the perfect neighborhood for your needs.
          </p>

          <LeadForm
            formName="stacy-relocation-inquiry"
            fields={[
              { name: "name", label: "Full Name", type: "text", required: true },
              { name: "email", label: "Email Address", type: "email", required: true },
              { name: "phone", label: "Phone Number", type: "tel", required: true },
              {
                name: "currentLocation",
                label: "Where are you relocating from?",
                type: "text",
                required: false,
              },
              {
                name: "timeline",
                label: "When are you relocating?",
                type: "select",
                options: [
                  "Immediately (0-3 months)",
                  "Soon (3-6 months)",
                  "This year (6-12 months)",
                  "Next year (12+ months)",
                ],
                required: true,
              },
              {
                name: "relocatingReason",
                label: "What's bringing you to the Triangle?",
                type: "select",
                options: [
                  "Job opportunity",
                  "Company transfer",
                  "Family/personal",
                  "Retirement",
                  "Other",
                ],
                required: false,
              },
              {
                name: "message",
                label: "Tell us about your relocation needs and priorities",
                type: "textarea",
                placeholder: "Neighborhood preferences, schools, commute, lifestyle, budget...",
                required: false,
              },
            ]}
            submitLabel="Get Relocation Support"
            successMessage="Thank you! Stacy will reach out with personalized relocation guidance and neighborhood recommendations."
          />
        </div>
      </Section>

      <Section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-8">Why the Triangle?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-charcoal mb-3">Thriving Job Market</h3>
              <p className="text-charcoal/70">Research Triangle Park is a global hub for tech, biotech, and innovation. Major employers include IBM, Cisco, Duke, UNC, and hundreds of startups.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-charcoal mb-3">Excellent Schools</h3>
              <p className="text-charcoal/70">Top-rated public and private schools, plus three major universities: Duke, UNC, and NC State. Strong education options for every age.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-charcoal mb-3">Vibrant Communities</h3>
              <p className="text-charcoal/70">From historic downtown Durham, NC to walkable Chapel Hill to small-town Hillsborough, each Triangle community offers unique character and lifestyle.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-charcoal mb-3">Affordable Living</h3>
              <p className="text-charcoal/70">Compared to other major tech hubs, the Triangle offers strong home values, reasonable cost of living, and diverse price points.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">Explore the Triangle</h2>
          <p className="text-lg text-charcoal/70 mb-8">
            Learn about neighborhoods, schools, and communities across Durham, NC, Chapel Hill, Raleigh, and beyond.
          </p>
          <Link href="/communities">
            <Button>Browse Communities</Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
