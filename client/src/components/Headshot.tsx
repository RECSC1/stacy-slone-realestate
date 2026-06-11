import { ASSETS, SITE } from "@/config/site";
import { cn } from "@/lib/utils";

interface HeadshotProps {
  className?: string;
  /** Show a subtle linen background panel behind the framed photo */
  withPanel?: boolean;
}

/**
 * Editorial headshot treatment:
 * cream/beige framing + thin taupe + inner black hairline border + soft shadow.
 * Never distorts the image (object-cover within a fixed aspect ratio).
 * Alt text is SEO-friendly and Stacy-specific.
 */
export function Headshot({ className, withPanel = false }: HeadshotProps) {
  const frame = (
    <figure className={cn("headshot-frame", className)}>
      <img
        src={ASSETS.headshot}
        alt={SITE.headshotAlt}
        loading="lazy"
        className="aspect-[4/5] object-cover"
      />
    </figure>
  );

  if (!withPanel) return frame;

  return (
    <div className="relative">
      {/* Architectural/linen-style background panel */}
      <div
        aria-hidden
        className="absolute -bottom-5 -right-5 -top-5 left-10 -z-10 hidden bg-secondary sm:block"
      />
      {frame}
    </div>
  );
}
