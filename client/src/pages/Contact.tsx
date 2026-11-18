import { ContactDetails } from "@/components/ContactDetails";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Headshot } from "@/components/Headshot";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";
import { LeadForm } from "@/components/ui-blocks/LeadForm";
import { SITE } from "@/config/site";

export default function Contact() {

  return (
    <>
      <Seo
        title="Contact Stacy Slone, REALTOR®"
        description="Get in touch with Stacy Slone, REALTOR®, Triangle North Carolina Realtor with KW Elite Realty. Call (919) 972-1180 or send a message."
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
            formName="stacy-contact"
                submitLabel="Send Message"



                successMessage="Your message has been received. Stacy will be in touch shortly. For anything urgent, call (919) 972-1180."
                fields={[
                  { name: "name", label: "Full Name", required: true, colSpan: 1 },
                  { name: "phone", label: "Phone", type: "tel", colSpan: 1 },
                  { name: "email", label: "Email", type: "email", required: true, colSpan: 2 },
                  { name: "message", label: "How can Stacy help?", type: "textarea", required: true },
                ]}
              />
            </div>
          </div>

          {/* Contact details + headshot */}
          <div className="space-y-8">
            <div className="mx-auto w-full max-w-xs">
              <Headshot />
            </div>
            <div className="border border-border bg-card p-7">
              <ContactDetails className="text-sm text-foreground [&_p:first-child]:font-serif [&_p:first-child]:text-2xl" />
              <p className="mt-5 flex items-start gap-3 text-sm text-foreground">
                <Clock className="mt-0.5 h-5 w-5 text-primary" />
                <span>Monday to Sunday, 9 AM to 7 PM</span>
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
