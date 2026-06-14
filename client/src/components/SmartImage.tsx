import { useState } from "react";
import { ASSETS } from "@/config/site";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  src?: string | null;
  alt: string;
  /** Classes applied to the rendered <img>. */
  className?: string;
  loading?: "lazy" | "eager";
  /** Optional caption shown beneath the monogram in the fallback state. */
  fallbackLabel?: string;
}

/**
 * Image with a graceful, on-brand fallback.
 *
 * If the source is missing or fails to load, the component renders a refined
 * cream/taupe panel with Stacy's monogram instead of a broken-image icon.
 * This guarantees no broken image and no stray alt text is ever shown to a
 * client, while keeping a polished, editorial look across the site.
 */
export function SmartImage({
  src,
  alt,
  className,
  loading = "lazy",
  fallbackLabel,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        loading={loading}
        onError={() => setFailed(true)}
        className={className}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#f5f3f0] via-[#efe9e1] to-[#e0d4c2]",
        className,
      )}
    >
      <img
        src={ASSETS.logoMonogram}
        alt=""
        aria-hidden
        className="h-12 w-auto opacity-80 mix-blend-multiply"
      />
      {fallbackLabel && (
        <span className="px-4 text-center text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#7a6a55]">
          {fallbackLabel}
        </span>
      )}
    </div>
  );
}
