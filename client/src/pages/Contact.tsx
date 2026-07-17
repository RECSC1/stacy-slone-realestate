import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Headshot } from "@/components/Headshot";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";
import { LeadForm } from "@/components/ui-blocks/LeadForm";
import { trpc } from "@/lib/trpc";
import { SITE } from "@/config/site";

export default function Contact() {
  const mutation = trpc.leads.contact.useMutation();

  return (
    <>
      <Seo
        title="Contact Stacy Wilson Slone"
        description="Get in touch with Stacy Wilson Slone, Triangle North Carolina Realtor with KW Elite Realty. Call (919) 972-1180 or send a message."
      />
      <PageHero
        eyebrow="Get in Touch"
        title="Let's start the conversation"
        description="Questions about buying, selling, or relocating in the Triangle? Reach out and Stacy will get back to you personally."
      />

      <Section className="bg-background">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
          {/* Form */}
          <div>
            <h2 className="font-serif text-3xl text-foreground">
              Send a message
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill out the form below and Stacy will be in touch shortly.
            </p>
            <div className="mt-8">
              <LeadForm
                submitLabel="Send Message"
                isSubmitting={mutation.isPending}
                isSuccess={mutation.isSuccess}
                isError={mutation.isError}
                successMessage="Your message has been received. Stacy will be in touch shortly. For anything urgent, call (919) 972-1180."
                fields={[
                  { name: "name", label: "Full Name", required: true, colSpan: 1 },
                  { name: "phone", label: "Phone", type: "tel", colSpan: 1 },
                  { name: "email", label: "Email", type: "email", required: true, colSpan: 2 },
                  { name: "message", label: "How can Stacy help?", type: "textarea", required: true },
                ]}
                onSubmit={async (v) => {
                  await mutation.mutateAsync({
                    name: v.name,
                    email: v.email,
                    phone: v.phone ?? "",
                    message: v.message,
                  });
                }}
              />
            </div>
          </div>

          {/* Contact details + headshot */}
          <div className="space-y-8">
            <div className="mx-auto w-full max-w-xs">
              <Headshot />
            </div>
            <div className="border border-border bg-card p-7">
              <p className="font-serif text-2xl text-foreground">
                {SITE.agentName}
              </p>
              <p className="eyebrow mt-1 text-muted-foreground">
                {SITE.brokerage}
              </p>
              <div className="mt-5 space-y-4 text-sm">
                <a href={SITE.phoneHref} className="flex items-center gap-3 text-foreground hover:text-primary">
                  <Phone className="h-5 w-5 text-primary" /> {SITE.phone}
                </a>
                <a href={SITE.emailHref} className="flex items-center gap-3 text-foreground hover:text-primary">
                  <Mail className="h-5 w-5 text-primary" /> {SITE.email}
                </a>
                <p className="flex items-center gap-3 text-foreground">
                  <MapPin className="h-5 w-5 text-primary" /> {SITE.officeAddress}
                </p>
                <p className="flex items-start gap-3 text-foreground">
                  <Clock className="mt-0.5 h-5 w-5 text-primary" />
                  <span>[Add business hours — e.g., Mon–Sat, by appointment]</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
