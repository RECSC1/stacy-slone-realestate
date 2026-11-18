import { useState } from "react";
import { Scale, Loader2 } from "lucide-react";
import { Streamdown } from "streamdown";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";
import { trpc } from "@/lib/trpc";
import { SITE } from "@/config/site";

export default function CompareNeighborhoods() {
  const [areaA, setAreaA] = useState("Durham");
  const [areaB, setAreaB] = useState("Chapel Hill");
  const [priorities, setPriorities] = useState("");
  const mutation = trpc.ai.compareNeighborhoods.useMutation();

  return (
    <>
      <Seo
        title="Compare Triangle NC Neighborhoods"
        description="Compare Triangle North Carolina neighborhoods side by side with AI guidance from Stacy Slone, REALTOR®, KW Elite Realty."
      />
      <PageHero
        eyebrow="Make an Informed Move"
        title="Compare Triangle neighborhoods"
        description="Weighing two areas? Get a balanced, neutral comparison of lifestyle, housing character, location, and amenities."
      />

      <Section className="bg-background" containerClassName="max-w-3xl">
        <div className="border border-border bg-card p-8">
          <div className="mb-6 flex items-center gap-3">
            <Scale className="h-6 w-6 text-primary" />
            <h2 className="font-serif text-2xl text-foreground">
              Compare two areas
            </h2>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (areaA.trim() && areaB.trim())
                mutation.mutate({ areaA, areaB, priorities });
            }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  First area
                </label>
                <input
                  value={areaA}
                  onChange={(e) => setAreaA(e.target.value)}
                  className="w-full border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Second area
                </label>
                <input
                  value={areaB}
                  onChange={(e) => setAreaB(e.target.value)}
                  className="w-full border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                What matters most to you? (optional)
              </label>
              <input
                value={priorities}
                onChange={(e) => setPriorities(e.target.value)}
                placeholder="commute to RTP, walkability, parks, downtown access..."
                className="w-full border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex items-center justify-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-70"
            >
              {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Compare Areas
            </button>
          </form>

          {mutation.data && (
            <div className="prose-sm mt-8 max-w-none border-t border-border pt-6 text-foreground">
              <Streamdown>{mutation.data.answer}</Streamdown>
            </div>
          )}
        </div>
        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          General guidance for research only. For tailored advice, call Stacy at{" "}
          {SITE.phone}.
        </p>
      </Section>
    </>
  );
}
