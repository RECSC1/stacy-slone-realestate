import { TrendingUp, Target, Megaphone, Handshake } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";
import { LeadForm } from "@/components/ui-blocks/LeadForm";
import { trpc } from "@/lib/trpc";
import { HERO_IMAGES } from "@/config/images";

const STEPS = [
  { icon: Target, title: "Strategic Pricing", body: "A thoughtful pricing strategy grounded in your home and the local market." },
  { icon: Megaphone, title: "Polished Marketing", body: "Professional presentation that helps your home stand out to the right buyers." },
  { icon: Handshake, title: "Skilled Negotiation", body: "Experienced advocacy to protect your interests from offer to closing." },
];

export default function HomeValuation() {
  const mutation = trpc.leads.homeValuation.useMutation();

  return (
    <>
      <Seo
        title="What's My Home Worth? — Free Home Valuation"
        description="Request a complimentary home valuation from Stacy Wilson Slone, KW Elite Realty, serving the Triangle NC. Find out what your home could be worth."
      />
      <PageHero
        image={HERO_IMAGES.homeValuation}
        imageAlt="Charleston-inspired Triangle NC home considering a sale"
        eyebrow="For Sellers"
        title="What's your Triangle home worth?"
        description="Request a complimentary, no-obligation valuation. Stacy will prepare a personalized assessment based on your home and current market conditions."
      />

      <Section className="bg-background">
        <div className="grid gap-12 lg:grid-cols-[5fr_6fr] lg:gap-16">
          <div>
            <h2 className="font-serif text-3xl text-foreground">
              Selling with Stacy
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Selling your home is a big decision and a major financial move. Stacy
              brings strategy, polish, and steady guidance to help you sell with
              confidence.
            </p>
            <div className="mt-8 space-y-6">
              {STEPS.map((s) => (
                <div key={s.title} className="flex gap-4">
                  <s.icon className="h-7 w-7 shrink-0 text-primary" strokeWidth={1.5} />
                  <div>
                    <p className="font-medium text-foreground">{s.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 border border-dashed border-border bg-secondary/40 p-5 text-xs leading-relaxed text-muted-foreground">
              This request connects you directly with Stacy for a personalized
              valuation. Estimates are not an appraisal or a guarantee of sale
              price.
            </div>
          </div>

          {/* Valuation form */}
          <div className="border border-border bg-card p-8">
            <div className="mb-6 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h3 className="font-serif text-2xl text-foreground">
                Request your valuation
              </h3>
            </div>
            <LeadForm
              submitLabel="Get My Home Value"
              isSubmitting={mutation.isPending}
              isSuccess={mutation.isSuccess}
              successTitle="Request received!"
              successMessage="Stacy will prepare your personalized home valuation and be in touch shortly. For anything urgent, call 919-332-8889."
              fields={[
                { name: "name", label: "Full Name", required: true, colSpan: 1 },
                { name: "phone", label: "Phone", type: "tel", colSpan: 1 },
                { name: "email", label: "Email", type: "email", required: true, colSpan: 2 },
                { name: "propertyAddress", label: "Property Address", required: true, colSpan: 2, placeholder: "Street, City, NC" },
                { name: "timeline", label: "When are you thinking of selling?", type: "select", options: ["Ready now", "1-3 months", "3-6 months", "6-12 months", "Just curious"], colSpan: 2 },
                { name: "notes", label: "Anything else Stacy should know?", type: "textarea" },
              ]}
              onSubmit={async (v) => {
                await mutation.mutateAsync({
                  name: v.name,
                  email: v.email,
                  phone: v.phone ?? "",
                  propertyAddress: v.propertyAddress,
                  timeline: v.timeline ?? "",
                  notes: v.notes ?? "",
                });
              }}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
