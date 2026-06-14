import { useState } from "react";
import { Scale, Loader2, AlertCircle } from "lucide-react";
import { Streamdown } from "streamdown";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";
import { trpc } from "@/lib/trpc";
import { SITE } from "@/config/site";

export default function CompareNeighborhoods() {
  const [areaA, setAreaA] = useState("Cary");
  const [areaB, setAreaB] = useState("Wilmington");
  const [priorities, setPriorities] = useState("");
  const mutation = trpc.ai.compareNeighborhoods.useMutation();

  return (
    <>
      <Seo
        title="Compare North Carolina Neighborhoods"
        description="Compare North Carolina neighborhoods side by side with AI guidance from Stacy Wilson Slone, KW Elite Realty."
      />
      <PageHero
        eyebrow="Make an Informed Move"
        title="Compare North Carolina communities"
        description="Weighing two areas anywhere in NC? Get a balanced, neutral comparison of lifestyle, housing character, location, and amenities."
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
                placeholder="commute, walkability, coast/mountains, schools, downtown access..."
                className="w-full border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              disabled={mutation.isPending || !areaA.trim() || !areaB.trim()}
              className="flex items-center justify-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-70"
            >
              {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Compare Areas
            </button>
          </form>

          {mutation.isError && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-2 border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                We couldn't generate a comparison just now. Please try again, or
                send the areas to Stacy at {SITE.phone} and she'll compare them
                with current local context.
              </span>
            </div>
          )}

          {mutation.data && (
            <div className="mt-8 border-t border-border pt-6">
              {mutation.data.degraded && (
                <p className="mb-4 border border-dashed border-border bg-secondary/40 p-3 text-xs leading-relaxed text-muted-foreground">
                  Live comparison data isn't connected yet, so this is a
                  qualitative framework. Stacy can fill in current, local market
                  context for any North Carolina area.
                </p>
              )}
              <div className="prose-sm max-w-none text-foreground">
                <Streamdown>{mutation.data.answer}</Streamdown>
              </div>
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
