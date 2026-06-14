import { Link } from "wouter";
import { Sparkles, Bell, Search } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";
import { LeadForm } from "@/components/ui-blocks/LeadForm";
import { FeaturedListings } from "@/components/ui-blocks/FeaturedListings";
import { trpc } from "@/lib/trpc";
import { HERO_IMAGES } from "@/config/images";

export default function Buy() {
  const mutation = trpc.leads.searchCriteria.useMutation();

  return (
    <>
      <Seo
        title="Search Triangle NC Homes for Sale"
        description="Search for homes across the Triangle with Stacy Wilson Slone, KW Elite Realty. Share your criteria and get personalized listings in Raleigh, Durham, Chapel Hill, and Cary."
      />
      <PageHero
        image={HERO_IMAGES.buy}
        imageAlt="Triangle NC home for sale"
        eyebrow="For Buyers"
        title="Find your place in the Triangle"
        description="Tell Stacy what you're looking for and she'll curate homes that match — or explore AI Home Search to describe your dream home in your own words."
      />

      {/* Quick entry points */}
      <Section className="bg-background">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Sparkles, t: "AI Home Search", b: "Describe your ideal home in plain language.", href: "/ai-home-search" },
            { icon: Bell, t: "Property Alerts", b: "Get notified when matching homes hit the market.", href: "/property-alerts" },
            { icon: Search, t: "Share Your Criteria", b: "Tell Stacy your must-haves below.", href: "#criteria" },
          ].map((c) => (
            <Link
              key={c.t}
              href={c.href}
              className="group border border-border bg-card p-6 transition-shadow hover:shadow-lg"
            >
              <c.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
              <p className="mt-4 font-serif text-xl text-foreground">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.b}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <FeaturedListings />

      {/* IDX-ready notice + criteria capture */}
      <Section className="bg-secondary/50" containerClassName="max-w-3xl">
        <div id="criteria" className="border border-border bg-card p-8">
          <h2 className="font-serif text-3xl text-foreground">
            Tell Stacy what you're looking for
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Live MLS/IDX search is being connected to live data. In the meantime,
            share your criteria and Stacy will personally send you matching homes
            across the Triangle.
          </p>
          <div className="mt-8">
            <LeadForm
              submitLabel="Send My Criteria"
              isSubmitting={mutation.isPending}
              isSuccess={mutation.isSuccess}
              successTitle="Got it!"
              successMessage="Stacy will review your criteria and send matching Triangle homes your way. For anything urgent, call 919-332-8889."
              fields={[
                { name: "name", label: "Full Name", required: true, colSpan: 1 },
                { name: "phone", label: "Phone", type: "tel", colSpan: 1 },
                { name: "email", label: "Email", type: "email", required: true, colSpan: 2 },
                { name: "criteria", label: "What are you looking for?", type: "textarea", required: true, placeholder: "Areas, price range, beds/baths, must-haves, timeline..." },
              ]}
              onSubmit={async (v) => {
                await mutation.mutateAsync({
                  name: v.name,
                  email: v.email,
                  phone: v.phone ?? "",
                  criteria: v.criteria,
                });
              }}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
