import { useState } from "react";
import { GraduationCap, Loader2, Search, AlertCircle } from "lucide-react";
import { Streamdown } from "streamdown";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";
import { trpc } from "@/lib/trpc";
import { SITE } from "@/config/site";

export default function SchoolSearch() {
  const [query, setQuery] = useState("");
  const mutation = trpc.ai.schoolSearch.useMutation();

  return (
    <>
      <Seo
        title="North Carolina School Search"
        description="Research schools and districts across North Carolina with guidance from Stacy Wilson Slone, KW Elite Realty."
      />
      <PageHero
        eyebrow="For Buyers"
        title="Research NC schools & districts"
        description="Ask about school districts and what to consider when buying near specific schools — anywhere in North Carolina."
      />

      <Section className="bg-background" containerClassName="max-w-3xl">
        <div className="border border-border bg-card p-8">
          <div className="mb-5 flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h2 className="font-serif text-2xl text-foreground">
              Ask about schools & districts
            </h2>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim()) mutation.mutate({ query });
            }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. How does school assignment work in Wilmington, NC?"
              className="flex-1 border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={mutation.isPending || !query.trim()}
              className="flex items-center justify-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-70"
            >
              {mutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              Search
            </button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "How does school assignment work in Charlotte-Mecklenburg?",
              "What to know about Wake County schools",
              "Researching school districts near Asheville",
            ].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setQuery(s);
                  mutation.mutate({ query: s });
                }}
                className="border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>

          {mutation.isPending && (
            <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Researching North
              Carolina schools...
            </div>
          )}

          {mutation.isError && (
            <div
              role="alert"
              className="mt-8 flex items-start gap-2 border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                We couldn't pull that together just now. Please try again, or
                share the area you're researching with Stacy at {SITE.phone}.
              </span>
            </div>
          )}

          {mutation.data && (
            <div className="mt-8 border-t border-border pt-6">
              {mutation.data.degraded && (
                <p className="mb-4 border border-dashed border-border bg-secondary/40 p-3 text-xs leading-relaxed text-muted-foreground">
                  Live school-rating data isn't connected yet. Always verify
                  assignments and ratings directly with the school district.
                </p>
              )}
              <div className="prose-sm max-w-none text-foreground">
                <Streamdown>{mutation.data.answer}</Streamdown>
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          School information is general guidance for research purposes. Always
          verify enrollment, boundaries, and ratings with official school and
          district sources, since assignments and ratings change. Stacy is glad
          to help — call {SITE.phone}.
        </p>
      </Section>
    </>
  );
}
