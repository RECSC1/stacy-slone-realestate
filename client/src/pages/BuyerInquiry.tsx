import { Seo } from "@/components/Seo";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { LeadForm } from "@/components/ui-blocks/LeadForm";
import { Section, SectionHeading } from "@/components/ui-blocks/Section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";

export default function BuyerInquiry() {
  return (
    <SiteLayout>
      <Seo
        title="Buyer Inquiry | Stacy Wilson Slone | Triangle NC Realtor"
        description="Start your Triangle NC home search with Stacy Wilson Slone. Get personalized buyer guidance, neighborhood insights, and expert market knowledge."
      />

      <PageHero
        title="Ready to Find Your Next Home?"
        description="Let's start your Triangle real estate journey"
        image="https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/neutral-living-room_cc4639a5.jpg"
      />

      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Your Buyer Inquiry" />
          <p className="text-lg text-charcoal/80 mb-8">
            Share a bit about what you're looking for in your next home. Stacy will review your inquiry and reach out with personalized guidance, neighborhood recommendations, and next steps tailored to your goals.
          </p>

          <LeadForm
            fields={[
              { name: "name", label: "Full Name", type: "text", required: true },
              { name: "email", label: "Email Address", type: "email", required: true },
              { name: "phone", label: "Phone Number", type: "tel", required: true },
              {
                name: "timeline",
                label: "When are you looking to buy?",
                type: "select",
                options: [
                  "Immediately (0-3 months)",
                  "Soon (3-6 months)",
                  "Exploring (6-12 months)",
                  "Future planning (12+ months)",
                ],
                required: true,
              },
              {
                name: "priceRange",
                label: "Estimated budget range",
                type: "select",
                options: [
                  "Under $300k",
                  "$300k - $500k",
                  "$500k - $750k",
                  "$750k - $1M",
                  "$1M+",
                ],
                required: false,
              },
              {
                name: "interests",
                label: "Areas or neighborhoods you're interested in",
                type: "textarea",
                placeholder: "e.g., Raleigh downtown, Cary schools, Durham walkability...",
                required: false,
              },
              {
                name: "message",
                label: "Tell us more about what you're looking for",
                type: "textarea",
                placeholder: "Home style, must-haves, lifestyle priorities, relocating details...",
                required: false,
              },
            ]}
            submitLabel="Send My Buyer Inquiry"
            onSubmit={async (values) => {
              const res = await fetch("/api/trpc/leads.submitBuyerInquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });
              if (!res.ok) throw new Error("Failed to submit inquiry");
            }}
            successMessage="Thank you! Stacy will review your inquiry and reach out soon."
          />
        </div>
      </Section>

      <Section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-8">What Happens Next</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-0 bg-white shadow-sm">
              <div className="text-4xl font-serif text-sage mb-4">1</div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">We Review Your Inquiry</h3>
              <p className="text-charcoal/70">Stacy personally reviews every buyer inquiry to understand your goals and preferences.</p>
            </Card>
            <Card className="p-6 border-0 bg-white shadow-sm">
              <div className="text-4xl font-serif text-sage mb-4">2</div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">Personalized Guidance</h3>
              <p className="text-charcoal/70">You'll receive tailored neighborhood insights, market context, and next steps based on your situation.</p>
            </Card>
            <Card className="p-6 border-0 bg-white shadow-sm">
              <div className="text-4xl font-serif text-sage mb-4">3</div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">Start Your Search</h3>
              <p className="text-charcoal/70">Together, we'll explore homes that match your criteria and help you move with confidence.</p>
            </Card>
          </div>
        </div>
      </Section>

      <Section className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">Explore the Triangle</h2>
          <p className="text-lg text-charcoal/70 mb-8">
            Learn more about the neighborhoods and communities where you might call home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/communities">
              <Button variant="outline" className="w-full sm:w-auto">
                Browse Communities
              </Button>
            </Link>
            <Link href="/ai-home-search">
              <Button className="w-full sm:w-auto">
                AI Home Search
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
