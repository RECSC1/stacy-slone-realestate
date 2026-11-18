import { Bell } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";
import { LeadForm } from "@/components/ui-blocks/LeadForm";
import { SITE } from "@/config/site";

export default function PropertyAlerts() {

  return (
    <>
      <Seo
        title="Triangle NC Property Alerts"
        description="Set up custom Triangle North Carolina property alerts with Stacy Slone, REALTOR®, KW Elite Realty. Be first to know when matching homes hit the market."
      />
      <PageHero
        eyebrow="Never Miss a Match"
        title="Custom property alerts"
        description="Tell Stacy your criteria and be among the first to know when matching homes come to market across the Triangle."
      />

      <Section className="bg-background" containerClassName="max-w-3xl">
        <div className="border border-border bg-card p-8">
          <div className="mb-6 flex items-center gap-3">
            <Bell className="h-6 w-6 text-primary" />
            <h2 className="font-serif text-2xl text-foreground">
              Set up your alerts
            </h2>
          </div>
          <LeadForm
            formName="stacy-property-alerts"
            submitLabel="Create My Alerts"



            successTitle="You're all set!"
            successMessage="Stacy will set up your custom property alerts and reach out with matching Triangle homes. For anything urgent, call (919) 972-1180."
            fields={[
              { name: "name", label: "Full Name", required: true, colSpan: 1 },
              { name: "phone", label: "Phone", type: "tel", colSpan: 1 },
              { name: "email", label: "Email", type: "email", required: true, colSpan: 2 },
              { name: "area", label: "Preferred Area(s)", placeholder: "Durham, Hillsborough, Chapel Hill...", colSpan: 2 },
              { name: "priceRange", label: "Price Range", placeholder: "e.g. $400k - $600k", colSpan: 1 },
              { name: "propertyType", label: "Property Type", type: "select", options: ["Single-family", "Townhome", "Condo", "Land", "No preference"], colSpan: 1 },
              { name: "beds", label: "Min Beds", type: "select", options: ["1+", "2+", "3+", "4+", "5+"], colSpan: 1 },
              { name: "baths", label: "Min Baths", type: "select", options: ["1+", "2+", "3+", "4+"], colSpan: 1 },
              { name: "timeline", label: "Timeline", type: "select", options: ["ASAP", "1-3 months", "3-6 months", "6-12 months", "Just browsing"], colSpan: 2 },
              { name: "notes", label: "Anything else?", type: "textarea" },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
