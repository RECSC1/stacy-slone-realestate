import { useState } from "react";
import { Compass, Sun } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";

type Dir = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

const INSIGHTS: Record<Dir, { title: string; body: string }> = {
  N: { title: "North-facing front", body: "The front of the home gets less direct sun, often keeping front rooms cooler and more even in light. Rear (south) spaces tend to be bright and warm." },
  NE: { title: "Northeast-facing front", body: "Gentle morning light at the front, with warmer afternoon exposure toward the rear southwest. A balanced option many buyers like." },
  E: { title: "East-facing front", body: "Bright, pleasant morning sun at the front; cooler, shaded afternoons. Great for early risers and morning coffee on a front porch." },
  SE: { title: "Southeast-facing front", body: "Strong morning sun and good daytime brightness. Front rooms stay cheerful much of the day." },
  S: { title: "South-facing front", body: "Maximum daylight across the front of the home through the day. Bright and warm — often desirable in cooler months, with shade strategy helpful in summer." },
  SW: { title: "Southwest-facing front", body: "Warm, sunny afternoons and evenings at the front. Beautiful golden-hour light; consider window treatments for summer heat." },
  W: { title: "West-facing front", body: "Cooler mornings and bright, warm afternoons/evenings at the front. Lovely sunsets; afternoon glare worth planning for." },
  NW: { title: "Northwest-facing front", body: "Softer mornings with warm late-day sun toward the front. Rear southeast spaces enjoy bright mornings." },
};

export default function HouseDirectionFinder() {
  const [dir, setDir] = useState<Dir | null>(null);
  const dirs: Dir[] = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  return (
    <>
      <Seo
        title="House Direction & Sun Orientation Finder"
        description="Understand how a home's orientation affects natural light before you buy in the Triangle NC, with Stacy Wilson Slone, KW Elite Realty."
      />
      <PageHero
        eyebrow="Buy Smarter"
        title="House direction & sunlight finder"
        description="A home's orientation shapes its natural light and feel throughout the day. Pick the direction the front of a home faces to see what to expect."
      />

      <Section className="bg-background" containerClassName="max-w-3xl">
        <div className="border border-border bg-card p-8">
          <div className="mb-6 flex items-center gap-3">
            <Compass className="h-6 w-6 text-primary" />
            <h2 className="font-serif text-2xl text-foreground">
              Which way does the front face?
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {dirs.map((d) => (
              <button
                key={d}
                onClick={() => setDir(d)}
                className={`border px-4 py-4 text-sm font-medium transition-colors ${
                  dir === d
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-primary"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {dir && (
            <div className="mt-8 flex gap-4 border-t border-border pt-6">
              <Sun className="h-8 w-8 shrink-0 text-primary" strokeWidth={1.5} />
              <div>
                <p className="font-serif text-xl text-foreground">
                  {INSIGHTS[dir].title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {INSIGHTS[dir].body}
                </p>
              </div>
            </div>
          )}
        </div>
        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          General guidance only — actual light depends on lot, trees, windows,
          and floor plan. Stacy can help you evaluate any specific home.
        </p>
      </Section>
    </>
  );
}
