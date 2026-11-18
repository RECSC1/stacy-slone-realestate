import { useState } from "react";
import { Wand2 } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";
import { SITE } from "@/config/site";

export default function VirtualStaging() {
  const [pos, setPos] = useState(50);

  return (
    <>
      <Seo
        title="Virtual Staging for Triangle NC Home Sellers"
        description="See how virtual staging helps Triangle North Carolina homes sell. Presentation guidance from Stacy Slone, REALTOR®, KW Elite Realty."
      />
      <PageHero
        eyebrow="For Sellers"
        title="Help buyers picture home"
        description="Thoughtful staging helps buyers emotionally connect with a space. Drag the slider to see the difference presentation makes."
      />

      <Section className="bg-background" containerClassName="max-w-4xl">
        <div
          className="relative aspect-[3/2] select-none overflow-hidden border border-border"
        >
          <img
            src="/images/virtual-staging-after.webp"
            alt="Living room after virtual staging, furnished with a sofa, rug, tables, lamp, art, and plants"
            width={1200}
            height={800}
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <img
              src="/images/virtual-staging-before.webp"
              alt="The same living room before virtual staging, empty with neutral walls and hardwood floors"
              width={1200}
              height={800}
              loading="eager"
              className="h-full w-full object-cover"
            />
            <span className="absolute left-3 top-3 bg-foreground/80 px-3 py-1 text-xs font-medium text-background">
              Before
            </span>
          </div>
          <span className="absolute right-3 top-3 bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            After
          </span>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 top-0 w-0.5 bg-background shadow"
            style={{ left: `${pos}%` }}
          />
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Virtual staging comparison: reveal the before and after images"
            className="absolute bottom-4 left-1/2 w-2/3 -translate-x-1/2 cursor-pointer"
          />
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            { t: "Emotional Connection", b: "Staged spaces help buyers imagine living there, not just touring an empty room." },
            { t: "Stronger Listings", b: "Well-presented photos help your listing stand out online where buyers start." },
            { t: "Faster Decisions", b: "When a home feels move-in ready, buyers act with more confidence." },
          ].map((c) => (
            <div key={c.t} className="border border-border bg-card p-6">
              <Wand2 className="h-6 w-6 text-primary" strokeWidth={1.5} />
              <p className="mt-4 font-serif text-xl text-foreground">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.b}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-dashed border-border bg-secondary/40 p-6 text-center text-sm leading-relaxed text-muted-foreground">
          Virtual staging is an illustrative marketing concept and digitally
          added furnishings are not included with a property. Ask Stacy how
          staging and presentation can support your home's marketing plan.
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/home-valuation"
            className="bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Start With a Home Valuation
          </a>
          <a
            href={SITE.phoneHref}
            className="border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:border-primary"
          >
            Call {SITE.phone}
          </a>
        </div>
      </Section>
    </>
  );
}
