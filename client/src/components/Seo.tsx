import { useEffect } from "react";
import { SITE } from "@/config/site";

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  absoluteTitle?: boolean;
  canonicalPath?: string;
  image?: string;
  type?: "website" | "article";
}

/**
 * Lightweight SEO helper: updates document title and meta description
 * on route change. Keeps page titles consistent and keyword-aware.
 */
export function Seo({ title, description, keywords, absoluteTitle = false, canonicalPath, image, type = "website" }: SeoProps) {
  useEffect(() => {
    const fullTitle = title
      ? absoluteTitle ? title : `${title} | ${SITE.agentName}, ${SITE.brokerage}`
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

    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords);
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", fullTitle);

    const canonicalUrl = canonicalPath ? `${SITE.baseUrl}${canonicalPath}` : SITE.baseUrl;
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const setProperty = (property: string, content: string) => {
      let element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      element.content = content;
    };
    setProperty("og:type", type);
    setProperty("og:url", canonicalUrl);
    if (image) setProperty("og:image", image);
  }, [title, description, keywords, absoluteTitle, canonicalPath, image, type]);

  return null;
}
