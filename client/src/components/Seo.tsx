import { useEffect } from "react";
import { SITE } from "@/config/site";

interface SeoProps {
  title?: string;
  description?: string;
}

/**
 * Lightweight SEO helper: updates document title and meta description
 * on route change. Keeps page titles consistent and keyword-aware.
 */
export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${SITE.agentName}, ${SITE.brokerage}`
      : SITE.seoTitle;
    document.title = fullTitle;

    const desc = description ?? SITE.seoDescription;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", desc);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", fullTitle);
  }, [title, description]);

  return null;
}
