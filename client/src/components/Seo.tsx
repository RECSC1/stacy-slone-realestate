import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { headValues } from '@/config/seo';

// Both the static renderer and client navigation use the same metadata registry.
// Legacy props remain accepted for existing page components, with route data authoritative.
interface SeoProps { title?: string; description?: string; keywords?: string; absoluteTitle?: boolean; canonicalPath?: string; image?: string; type?: 'website' | 'article'; }
export function Seo(_props: SeoProps) {
  const [path] = useLocation();
  useEffect(() => {
    const h = headValues(path);
    document.title = h.title;
    function setMeta(attribute: 'name' | 'property', key: string, value: string) {
      const matches = Array.from(document.head.querySelectorAll<HTMLMetaElement>(`meta[${attribute}="${key}"]`));
      const element = matches.shift() ?? document.createElement('meta');
      matches.forEach(extra => extra.remove());
      element.setAttribute(attribute, key); element.content = value;
      if (!element.isConnected) document.head.appendChild(element);
    }
    Object.entries(h.names).forEach(([key,value]) => setMeta('name',key,value));
    Object.entries(h.properties).forEach(([key,value]) => setMeta('property',key,value));
    document.head.querySelectorAll('meta[name="keywords"]').forEach(node => node.remove());
    const canonicals = Array.from(document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'));
    const canonical = canonicals.shift() ?? document.createElement('link');
    canonicals.forEach(extra => extra.remove());
    canonical.rel = 'canonical'; canonical.href = h.canonical;
    if (!canonical.isConnected) document.head.appendChild(canonical);
    const schema = document.getElementById('site-schema') ?? document.createElement('script');
    schema.id = 'site-schema'; schema.setAttribute('type','application/ld+json');
    schema.textContent = JSON.stringify(h.schema).replace(/</g,'\\u003c');
    if (!schema.isConnected) document.head.appendChild(schema);
  }, [path]);
  return null;
}
