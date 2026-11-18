import { useState } from "react";
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
 * Renders Stacy's real headshot inside a refined cream/ivory frame with thin
 * taupe + black hairline framing, luxury, Charleston-inspired. If no photo is
 * configured (or the asset ever fails to load), it gracefully falls back to a
 * monogram treatment so a broken-image state is never shown. The portrait is
 * displayed with object-cover anchored toward the top so the face is never
 * cropped awkwardly and the image is never stretched or distorted.
 */
export function Headshot({ className, withPanel = false }: HeadshotProps) {
  const showPhoto = !ASSETS.headshotIsPlaceholder && Boolean(ASSETS.headshot);
  const [failed, setFailed] = useState(false);
  const usePhoto = showPhoto && !failed;

  const frame = (
    <figure
      className={cn(
        "relative mx-auto w-full max-w-[400px] overflow-hidden border border-primary-dark bg-[#faf8f5] shadow-[0_10px_30px_rgba(45,45,45,0.12)]",
        className,
      )}
    >
      {/* inner taupe hairline */}
      <div className="pointer-events-none absolute inset-2 z-10 border border-accent/40" />
      {usePhoto ? (
        <img
          src={ASSETS.headshot}
          alt={SITE.headshotAlt}
          onError={() => setFailed(true)}
          className="aspect-[4/5] w-full object-cover object-top"
        />
      ) : (
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
              REALTOR® · {SITE.brokerage}
            </p>
          </div>
          {/* visually-hidden, screen-reader-friendly description */}
          <figcaption className="sr-only">{SITE.headshotAlt}</figcaption>
        </div>
      )}
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
