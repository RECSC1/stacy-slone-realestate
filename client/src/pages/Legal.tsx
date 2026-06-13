import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";
import { SITE } from "@/config/site";

export function Privacy() {
  return (
    <>
      <Seo title="Privacy Policy" description="Privacy policy for the Stacy Wilson Slone, KW Elite Realty website." />
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <Section className="bg-background" containerClassName="max-w-3xl">
        <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            This website is operated by {SITE.agentName} with {SITE.brokerage}.
            We respect your privacy and are committed to protecting the personal
            information you share with us.
          </p>
          <p>
            <strong className="text-foreground">Information we collect.</strong>{" "}
            When you submit a form (such as a home valuation request, property
            alert signup, or contact message), we collect the details you provide
            — typically your name, email, phone number, and any property or
            preference information — so that Stacy can respond and assist you.
          </p>
          <p>
            <strong className="text-foreground">How we use it.</strong> Your
            information is used solely to respond to your inquiry and provide real
            estate services. We do not sell your personal information.
          </p>
          <p>
            <strong className="text-foreground">Contact.</strong> Questions about
            this policy? Call {SITE.phone} or email {SITE.email}.
          </p>
          <p>
            <strong className="text-foreground">Data security.</strong> We take
            reasonable measures to protect your information from unauthorized
            access or disclosure.
          </p>
          <p>
            <strong className="text-foreground">Updates.</strong> We may update
            this policy periodically. Your continued use of the site constitutes
            acceptance of any changes.
          </p>
        </div>
      </Section>
    </>
  );
}

export function Terms() {
  return (
    <>
      <Seo title="Terms of Use" description="Terms of use for the Stacy Wilson Slone, KW Elite Realty website." />
      <PageHero eyebrow="Legal" title="Terms of Use" />
      <Section className="bg-background" containerClassName="max-w-3xl">
        <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            Welcome to the {SITE.agentName} website. By using this site, you
            agree to these terms. Content is provided for general informational
            purposes about real estate in the Triangle, NC.
          </p>
          <p>
            <strong className="text-foreground">No guarantees.</strong> Tools,
            estimates, and AI-generated guidance on this site are for general
            information only and are not appraisals, financial advice, or
            guarantees. Always verify details independently.
          </p>
          <p>
            <strong className="text-foreground">Equal Housing.</strong> We support
            Equal Housing Opportunity and adhere to Fair Housing principles.
          </p>
          <p>
            <strong className="text-foreground">Limitation of liability.</strong>{" "}
            To the fullest extent permitted by law, we are not liable for any
            indirect, incidental, or consequential damages arising from your use
            of this site.
          </p>
          <p>
            <strong className="text-foreground">Governing law.</strong> These
            terms are governed by the laws of North Carolina.
          </p>
        </div>
      </Section>
    </>
  );
}
