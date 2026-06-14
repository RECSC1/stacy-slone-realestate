import { useState } from "react";
import { Wand2 } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui-blocks/PageHero";
import { Section } from "@/components/ui-blocks/Section";
import { SITE } from "@/config/site";

/**
 * Editorial line-art room scenes used for the before/after comparison.
 *
 * Real staging photography is not yet available, so rather than show broken
 * images this renders two intentional architectural line drawings in the
 * site's Charleston palette: a sparse, empty "before" room and a warmer,
 * furnished "after" room. No photography is implied.
 */
function RoomScene({ staged }: { staged: boolean }) {
  const stroke = staged ? "#d8c7b3" : "#9c8f7d";
  return (
    <svg
      viewBox="0 0 600 400"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden
    >
      <rect width="600" height="400" fill={staged ? "#211c18" : "#2a2723"} />
      {staged && (
        <rect width="600" height="400" fill="url(#warmGlow)" opacity="0.9" />
      )}
      <defs>
        <radialGradient id="warmGlow" cx="68%" cy="28%" r="75%">
          <stop offset="0%" stopColor="#b58a5a" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#b58a5a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g fill="none" stroke={stroke} strokeWidth="1.6" opacity="0.85">
        {/* room shell: back wall, floor line, side wall */}
        <path d="M70 70 L530 70 L530 300 L70 300 Z" opacity="0.5" />
        <line x1="70" y1="300" x2="530" y2="300" />
        {/* window */}
        <rect x="120" y="110" width="120" height="100" />
        <line x1="180" y1="110" x2="180" y2="210" />
        <line x1="120" y1="160" x2="240" y2="160" />
        {staged ? (
          <>
            {/* sofa */}
            <path d="M330 250 L330 215 Q330 205 340 205 L470 205 Q480 205 480 215 L480 250" />
            <line x1="330" y1="232" x2="480" y2="232" />
            <line x1="345" y1="250" x2="345" y2="268" />
            <line x1="465" y1="250" x2="465" y2="268" />
            {/* rug */}
            <rect x="300" y="276" width="210" height="14" rx="2" opacity="0.7" />
            {/* floor lamp */}
            <line x1="300" y1="250" x2="300" y2="160" />
            <path d="M285 160 L315 160 L308 140 L292 140 Z" />
            {/* plant */}
            <line x1="150" y1="300" x2="150" y2="258" />
            <path d="M150 258 Q132 244 138 224 M150 258 Q168 244 162 224 M150 258 Q150 236 150 222" />
            <path d="M140 300 L160 300 L156 280 L144 280 Z" />
            {/* framed art */}
            <rect x="300" y="105" width="70" height="52" />
          </>
        ) : (
          // empty room: just a faint baseboard accent
          <line x1="70" y1="288" x2="530" y2="288" opacity="0.35" />
        )}
      </g>
    </svg>
  );
}

export default function VirtualStaging() {
  const [pos, setPos] = useState(50);

  return (
    <>
      <Seo
        title="Virtual Staging for Triangle NC Home Sellers"
        description="See how virtual staging helps Triangle North Carolina homes sell. Presentation guidance from Stacy Wilson Slone, KW Elite Realty."
      />
      <PageHero
        eyebrow="For Sellers"
        title="Help buyers picture home"
        description="Thoughtful staging helps buyers emotionally connect with a space. Drag the slider to see the difference presentation makes."
      />

      <Section className="bg-background" containerClassName="max-w-4xl">
        {/* Before/after comparison — editorial line-art, no photography */}
        <div
          className="relative aspect-[3/2] select-none overflow-hidden border border-border"
          role="img"
          aria-label="Illustration comparing an empty room with the same room thoughtfully staged"
        >
          <div className="absolute inset-0">
            <RoomScene staged />
          </div>
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${pos}%` }}
          >
            <div
              className="absolute inset-0 h-full"
              style={{ width: "100vw", maxWidth: "896px" }}
            >
              <RoomScene staged={false} />
            </div>
            <span className="absolute left-3 top-3 bg-foreground/80 px-3 py-1 text-xs font-medium text-background">
              Before
            </span>
          </div>
          <span className="absolute right-3 top-3 bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            After
          </span>
          <div
            className="absolute bottom-0 top-0 w-0.5 bg-background"
            style={{ left: `${pos}%` }}
          />
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(parseInt(e.target.value))}
            aria-label="Drag to compare before and after staging"
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
          The example above is for illustration. Ask Stacy how staging and
          presentation can be part of your home's marketing plan.
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
