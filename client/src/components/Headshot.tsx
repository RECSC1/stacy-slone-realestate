import { ASSETS, SITE } from "@/config/site";
import { cn } from "@/lib/utils";

interface HeadshotProps {
  className?: string;
  /** Show a subtle architectural offset panel behind the framed portrait. */
  withPanel?: boolean;
}

/**
 * Editorial brand portrait panel.
 *
 * Until a finished, deploy-ready headshot asset is provided, this renders a
 * refined monogram treatment on a cream/ivory ground with thin taupe + black
 * hairline framing — luxury, Charleston-inspired, and free of any broken-image
 * state. Swapping in a real photo later only requires pointing this component
 * (or ASSETS.headshot) at the new asset.
 */
export function Headshot({ className, withPanel = false }: HeadshotProps) {
  const frame = (
    <figure
      className={cn(
        "relative mx-auto w-full max-w-[340px] overflow-hidden border border-primary-dark bg-[#faf8f5] shadow-[0_10px_30px_rgba(45,45,45,0.12)]",
        className,
      )}
    >
      {/* inner taupe hairline */}
      <div className="pointer-events-none absolute inset-2 border border-accent/40" />
      <div className="flex aspect-[4/5] flex-col items-center justify-center gap-6 px-8 text-center">
        <img
          src={ASSETS.logoMonogram}
          alt=""
          aria-hidden
          className="h-24 w-auto mix-blend-multiply"
        />
        <div className="h-px w-12 bg-accent" />
        <div className="space-y-2">
          <p className="font-serif text-2xl leading-tight text-primary-dark">
            {SITE.agentName}
          </p>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-accent">
            Realtor® · {SITE.brokerage}
          </p>
        </div>
      </div>
      {/* visually-hidden, screen-reader-friendly description */}
      <figcaption className="sr-only">{SITE.headshotAlt}</figcaption>
    </figure>
  );

  if (!withPanel) return frame;

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -bottom-5 -right-5 -top-5 left-10 -z-10 hidden bg-secondary sm:block"
      />
      {frame}
    </div>
  );
}
