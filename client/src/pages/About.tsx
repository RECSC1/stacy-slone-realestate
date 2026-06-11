import { Link } from "wouter";
import { Phone, Mail, Award, Heart, Handshake, MapPin } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Headshot } from "@/components/Headshot";
import { Section, SectionHeading } from "@/components/ui-blocks/Section";
import { SITE } from "@/config/site";

const VALUES = [
  {
    icon: Heart,
    title: "Client-First, Always",
    body: "Your goals lead every conversation. No pressure, no jargon — just honest guidance built around what matters to you.",
  },
  {
    icon: Award,
    title: "Local Expertise",
    body: "Deep familiarity with the Triangle's communities, from established Raleigh neighborhoods to growing markets in Cary, Apex, and beyond.",
  },
  {
    icon: Handshake,
    title: "Skilled Negotiation",
    body: "Whether you're buying or selling, Stacy advocates for your best interests at the table and through closing.",
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Stacy Wilson Slone"
        description="Meet Stacy Wilson Slone, a Triangle North Carolina Realtor with KW Elite Realty serving Raleigh, Durham, Chapel Hill, Cary and surrounding areas."
      />

      <Section className="bg-background pt-16 md:pt-20">
        <div className="grid items-start gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          {/* Headshot column */}
          <div className="mx-auto w-full max-w-md lg:sticky lg:top-28">
            <Headshot withPanel />
            <div className="mt-8 space-y-3 border border-border bg-card p-6">
              <p className="font-serif text-xl text-foreground">
                {SITE.agentName}
              </p>
              <p className="eyebrow text-muted-foreground">
                Realtor &middot; {SITE.brokerage}
              </p>
              <div className="space-y-2 pt-2 text-sm text-muted-foreground">
                <a href={SITE.phoneHref} className="flex items-center gap-2 hover:text-primary">
                  <Phone className="h-4 w-4" /> {SITE.phone}
                </a>
                <a href={SITE.emailHref} className="flex items-center gap-2 hover:text-primary">
                  <Mail className="h-4 w-4" /> {SITE.email}
                </a>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Serving the Triangle, NC
                </p>
              </div>
            </div>
          </div>

          {/* Bio column */}
          <div>
            <p className="eyebrow text-primary">About Stacy</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground md:text-5xl">
              Choosing the right Realtor does make a difference
            </h1>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                {SITE.agentName} is a dedicated real estate professional with{" "}
                {SITE.brokerage}, helping buyers and sellers move with confidence
                across the Triangle region of North Carolina — including Raleigh,
                Durham, Chapel Hill, Cary, Apex, Wake Forest, and Hillsborough.
              </p>
              <p>
                Real estate is one of life's biggest decisions, and Stacy
                believes you deserve a partner who treats it that way. She leads
                with clear communication, careful listening, and a genuine
                commitment to getting your questions answered — so you always
                feel informed and in control.
              </p>
              <p>
                Backed by the resources and reach of {SITE.brokerageLegalName},
                Stacy pairs big-brokerage tools with the attentive, personal
                service of working with someone who truly knows the area. The
                result is a smoother, more confident experience whether you're
                buying your first home, selling a long-time residence, or
                relocating to the Triangle.
              </p>
              <blockquote className="border-l-2 border-primary bg-secondary/50 px-6 py-4 font-serif text-xl italic leading-relaxed text-foreground">
                "{SITE.tagline}"
              </blockquote>
            </div>

            {/* Placeholders for credentials */}
            <div className="mt-10 border border-dashed border-border bg-secondary/40 p-6">
              <p className="text-sm font-medium text-foreground">
                Credentials &amp; Highlights
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                [Add Stacy's specific credentials here — for example: years of
                experience, designations such as ABR or SRS, awards, areas of
                specialty, languages spoken, and community involvement. Share
                these details and they'll be formatted into a polished list.]
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.97]"
              >
                Work With Stacy
              </Link>
              <Link
                href="/home-valuation"
                className="border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary"
              >
                Get Your Home Value
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* VALUES */}
      <Section className="bg-secondary/50">
        <SectionHeading
          align="center"
          eyebrow="How Stacy Works"
          title="What you can expect"
          className="mb-12"
        />
        <div className="grid gap-8 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="border border-border bg-card p-8">
              <v.icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
              <h3 className="mt-5 font-serif text-2xl text-foreground">
                {v.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
