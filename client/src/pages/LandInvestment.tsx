import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { LeadForm } from "@/components/ui-blocks/LeadForm";
import { Section, SectionHeading } from "@/components/ui-blocks/Section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";

export default function LandInvestment() {
  return (
    <>
      <Seo
        title="Land & Investment Properties | Stacy Wilson Slone | Triangle NC Realtor"
        description="Explore land, lots, and investment opportunities in the Triangle NC. Get expert guidance on development, investment, and commercial properties."
      />

      <PageHero
        title="Land, Lots & Investment Opportunities"
        description="Strategic real estate investment guidance for the Triangle market"
        image="https://d2xsxph8kpxj0f.cloudfront.net/310519663339013855/PPjJwKpuKz7qd9yKqynAyF/cta-home_02d28c7a.jpg"
      />

      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Your Investment Inquiry" />
          <p className="text-lg text-charcoal/80 mb-8">
            Whether you're looking for raw land, development opportunities, investment properties, or commercial real estate, Stacy can help you identify and evaluate opportunities in the Triangle market.
          </p>

          <LeadForm
            fields={[
              { name: "name", label: "Full Name", type: "text", required: true },
              { name: "email", label: "Email Address", type: "email", required: true },
              { name: "phone", label: "Phone Number", type: "tel", required: true },
              {
                name: "investmentType",
                label: "What type of property are you interested in?",
                type: "select",
                options: [
                  "Raw land",
                  "Development opportunity",
                  "Rental/investment property",
                  "Commercial real estate",
                  "Mixed-use",
                  "Other",
                ],
                required: true,
              },
              {
                name: "budget",
                label: "Investment budget range",
                type: "select",
                options: [
                  "Under $500k",
                  "$500k - $1M",
                  "$1M - $2M",
                  "$2M - $5M",
                  "$5M+",
                ],
                required: false,
              },
              {
                name: "timeline",
                label: "When are you looking to invest?",
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
                name: "message",
                label: "Tell us about your investment strategy and goals",
                type: "textarea",
                placeholder: "Development plans, ROI expectations, specific areas of interest, questions...",
                required: false,
              },
            ]}
            submitLabel="Get Investment Guidance"
            onSubmit={async (values) => {
              const res = await fetch("/api/trpc/leads.landInvestmentInquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });
              if (!res.ok) throw new Error("Failed to submit inquiry");
            }}
            successMessage="Thank you! Stacy will review your investment goals and reach out with market opportunities and guidance."
          />
        </div>
      </Section>

      <Section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-8">Triangle Investment Opportunities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-0 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-charcoal mb-3">Growth Markets</h3>
              <p className="text-charcoal/70">The Triangle continues to attract talent and investment. Strong population growth and economic development create opportunities in residential, commercial, and mixed-use properties.</p>
            </Card>
            <Card className="p-6 border-0 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-charcoal mb-3">Development Potential</h3>
              <p className="text-charcoal/70">Strategic land parcels near RTP, downtown Raleigh, and emerging neighborhoods offer development and redevelopment opportunities.</p>
            </Card>
            <Card className="p-6 border-0 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-charcoal mb-3">Rental Market</h3>
              <p className="text-charcoal/70">Strong rental demand from relocating professionals, students, and young families creates solid investment returns in residential rental properties.</p>
            </Card>
          </div>
        </div>
      </Section>

      <Section className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">Ready to Explore Opportunities?</h2>
          <p className="text-lg text-charcoal/70 mb-8">
            Stacy specializes in identifying and evaluating investment opportunities across the Triangle. Let's discuss your strategy.
          </p>
          <Link href="/contact">
            <Button>Contact Stacy</Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
