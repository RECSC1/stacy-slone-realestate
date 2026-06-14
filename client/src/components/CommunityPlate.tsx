import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Editorial community "plate".
 *
 * Used wherever a community photograph is not yet available. Instead of a
 * broken image or a repeated giant-monogram fallback tile, it renders a
 * curated, dark-espresso editorial card: warm ivory text, tan architectural
 * linework, a small city-specific map-pin label, and a sparse monogram. Each
 * card receives a different layout accent (top rule / side rule / framed /
 * tonal glow) so a grid of them reads as an intentional, varied set of area
 * cards rather than a wall of identical fallback states.
 *
 * No photography is implied — this is purely a typographic + linework
 * treatment in the site's Charleston-inspired palette.
 */

type Accent = "topRule" | "sideRule" | "framed" | "glow";
const ACCENTS: Accent[] = ["topRule", "sideRule", "framed", "glow"];

interface CommunityPlateProps {
  name: string;
  /** Position in the grid — drives the per-card accent variation. */
  index: number;
  className?: string;
}

export function CommunityPlate({ name, index, className }: CommunityPlateProps) {
  const accent = ACCENTS[index % ACCENTS.length];
  // Monogram appears on only some cards so it never dominates the grid.
  const showMonogram = index % 3 === 0;

  return (
    <div
      role="img"
      aria-label={`${name}, North Carolina — Triangle area`}
      className={cn(
        "relative isolate aspect-[4/3] overflow-hidden",
        accent === "glow"
          ? "bg-[radial-gradient(120%_120%_at_75%_15%,#2c2620_0%,#1d1916_55%,#151310_100%)]"
          : "bg-gradient-to-br from-[#1a1613] via-[#211c18] to-[#2a2420]",
        className,
      )}
    >
      {/* Subtle Southern-architectural linework (gabled rooflines). Decorative. */}
      <svg
        aria-hidden
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full text-accent"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.22"
        >
          {/* roofline ridge */}
          <path d="M0 232 L60 196 L120 232 L180 188 L240 232 L300 200 L360 232 L400 210" />
          {/* eaves baseline */}
          <line x1="0" y1="262" x2="400" y2="262" />
          {/* slender columns / window mullions */}
          <line x1="70" y1="262" x2="70" y2="300" />
          <line x1="150" y1="262" x2="150" y2="300" />
          <line x1="250" y1="262" x2="250" y2="300" />
          <line x1="330" y1="262" x2="330" y2="300" />
        </g>
      </svg>

      {/* Per-card accent linework */}
      {accent === "topRule" && (
        <span
          aria-hidden
          className="absolute inset-x-6 top-6 h-px bg-accent/55"
        />
      )}
      {accent === "sideRule" && (
        <span
          aria-hidden
          className="absolute inset-y-6 left-6 w-px bg-accent/55"
        />
      )}
      {accent === "framed" && (
        <span
          aria-hidden
          className="absolute inset-4 border border-accent/30"
        />
      )}
      {accent === "glow" && (
        <span
          aria-hidden
          className="absolute bottom-6 left-6 right-6 h-px bg-accent/45"
        />
      )}

      {/* City-specific label */}
      <div
        className={cn(
          "absolute z-10 flex flex-col gap-2",
          accent === "framed"
            ? "inset-0 items-center justify-center text-center"
            : "bottom-7 left-7 right-7",
        )}
      >
        <span className="flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-accent-light">
          <MapPin className="h-3 w-3" aria-hidden /> Triangle, NC
        </span>
        <span className="font-serif text-2xl leading-tight text-[#fbf6ef]">
          {name}
        </span>
      </div>

      {/* Sparse monogram, used on a subset of cards only */}
      {showMonogram && (
        <span
          aria-hidden
          className="absolute right-6 top-6 font-serif text-sm tracking-[0.2em] text-accent/70"
        >
          SWS
        </span>
      )}
    </div>
  );
}
