import { useState } from "react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { LeadForm } from "@/components/ui-blocks/LeadForm";
import { Section, SectionHeading } from "@/components/ui-blocks/Section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { HERO_IMAGES } from "@/config/images";

export default function SellerInquiry() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  return (
    <>
      <Seo
        title="Seller Inquiry | Stacy Wilson Slone | Triangle NC Realtor"
        description="Ready to sell your Triangle NC home? Get a personalized market analysis and expert guidance from Stacy Wilson Slone."
      />

      <PageHero
        title="Ready to Sell Your Home?"
        description="Get expert guidance and a personalized market analysis"
        image={HERO_IMAGES.sell}
      />

      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Your Seller Inquiry" />
          <p className="text-lg text-charcoal/80 mb-8">
            Share details about your property and your selling timeline. Stacy will provide a personalized market analysis, pricing guidance, and a strategic plan to get your home sold.
          </p>

          <LeadForm
            fields={[
              { name: "name", label: "Full Name", type: "text", required: true },
              { name: "email", label: "Email Address", type: "email", required: true },
              { name: "phone", label: "Phone Number", type: "tel", required: true },
              {
                name: "propertyAddress",
                label: "Property Address",
                type: "text",
                required: false,
              },
              {
                name: "timeline",
                label: "When are you looking to sell?",
                type: "select",
                options: [
                  "Immediately (0-3 months)",
                  "Soon (3-6 months)",
                  "Flexible (6-12 months)",
                  "Planning ahead (12+ months)",
                ],
                required: true,
              },
              {
                name: "sellingReason",
                label: "Why are you selling?",
                type: "select",
                options: [
                  "Relocating",
                  "Upgrading/Downsizing",
                  "Investment property",
                  "Life change",
                  "Other",
                ],
                required: false,
              },
              {
                name: "message",
                label: "Tell us more about your home and situation",
                type: "textarea",
                placeholder: "Home features, recent updates, any questions...",
                required: false,
              },
            ]}
            submitLabel="Send My Seller Inquiry"
            isSubmitting={isSubmitting}
            isSuccess={isSuccess}
            isError={isError}
            onSubmit={async (values) => {
              setIsError(false);
              setIsSubmitting(true);
              try {
                const res = await fetch("/api/trpc/leads.sellerInquiry", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(values),
                });
                if (!res.ok) throw new Error("Failed to submit inquiry");
                setIsSuccess(true);
              } catch (err) {
                setIsError(true);
                throw err;
              } finally {
                setIsSubmitting(false);
              }
            }}
            successMessage="Thank you! Stacy will review your property and reach out with a personalized market analysis."
          />
        </div>
      </Section>

      <Section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-8">Our Selling Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 border-0 bg-white shadow-sm">
              <div className="text-4xl font-serif text-sage mb-4">1</div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">Consultation</h3>
              <p className="text-charcoal/70">We meet to discuss your home, goals, and timeline.</p>
            </Card>
            <Card className="p-6 border-0 bg-white shadow-sm">
              <div className="text-4xl font-serif text-sage mb-4">2</div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">Market Analysis</h3>
              <p className="text-charcoal/70">Detailed analysis of comparable homes and market trends.</p>
            </Card>
            <Card className="p-6 border-0 bg-white shadow-sm">
              <div className="text-4xl font-serif text-sage mb-4">3</div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">Marketing</h3>
              <p className="text-charcoal/70">Professional photos, staging advice, and targeted marketing.</p>
            </Card>
            <Card className="p-6 border-0 bg-white shadow-sm">
              <div className="text-4xl font-serif text-sage mb-4">4</div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">Close</h3>
              <p className="text-charcoal/70">Smooth closing with expert negotiation and support.</p>
            </Card>
          </div>
        </div>
      </Section>

      <Section className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">Get Your Home's Value</h2>
          <p className="text-lg text-charcoal/70 mb-8">
            Not ready to sell yet? Get a free home valuation to understand your property's market value.
          </p>
          <Link href="/home-valuation">
            <Button>Get Home Valuation</Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
