import { Link } from "wouter";
import { ArrowRight, Wand2, TrendingUp } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section, SectionHeading } from "@/components/ui-blocks/Section";
import { ASSETS } from "@/config/site";

export default function Sell() {
  return (
    <>
      <Seo
        title="Sell Your Triangle NC Home"
        description="Sell your Triangle North Carolina home with Stacy Wilson Slone, KW Elite Realty. Strategic pricing, polished marketing, and skilled negotiation."
      />
      <PageHero
        image={ASSETS.whiteBrickPorch}
        imageAlt="Triangle NC home prepared for sale"
        eyebrow="For Sellers"
        title="Sell with strategy and confidence"
        description="From pricing to closing, Stacy guides you through a smooth, well-marketed sale that positions your home to perform."
      />

      <Section className="bg-background">
        <div className="grid gap-8 md:grid-cols-2">
          <Link
            href="/home-valuation"
            className="group flex flex-col border border-border bg-card p-8 transition-shadow hover:shadow-lg"
          >
            <TrendingUp className="h-8 w-8 text-primary" strokeWidth={1.5} />
            <h3 className="mt-5 font-serif text-2xl text-foreground">
              Get Your Home Value
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              Request a complimentary, personalized valuation based on your home
              and current market conditions.
            </p>
            <span className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">
              Request valuation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/virtual-staging"
            className="group flex flex-col border border-border bg-card p-8 transition-shadow hover:shadow-lg"
          >
            <Wand2 className="h-8 w-8 text-primary" strokeWidth={1.5} />
            <h3 className="mt-5 font-serif text-2xl text-foreground">
              Virtual Staging
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              See how thoughtful staging helps buyers connect with a space and
              imagine living there.
            </p>
            <span className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">
              Explore staging
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </Section>

      <Section className="bg-secondary/50">
        <SectionHeading
          align="center"
          eyebrow="The Process"
          title="How a sale comes together"
          description="A clear, proven path from first conversation to closing day."
          className="mb-12"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "01", t: "Consult & Price", b: "Walk through your goals and set a strategic price." },
            { n: "02", t: "Prepare & Market", b: "Position and present your home to attract buyers." },
            { n: "03", t: "Review Offers", b: "Evaluate offers and negotiate the best terms." },
            { n: "04", t: "Close", b: "Navigate inspections, paperwork, and closing day." },
          ].map((s) => (
            <div key={s.n} className="border border-border bg-card p-6">
              <p className="font-serif text-3xl text-primary">{s.n}</p>
              <p className="mt-3 font-medium text-foreground">{s.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.b}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
