import { SITE, ASSETS, COMMUNITIES } from './site';
import { BLOG_POSTS } from './posts';
import { ROUTE_METADATA, type RouteMetadata } from './route-metadata';

export const ORIGIN = 'https://stacyslonerealty.com';
export const OG_IMAGE = `${ORIGIN}/.netlify/images?url=/images/downtown-durham-skyline-night.webp&w=1200&h=630&fit=cover&fm=jpg`;
export function normalizePath(path: string) {
  return path.split(/[?#]/)[0].replace(/\/index\.html$/, '/').replace(/\/+$/, '') || '/';
}
export function canonicalUrl(path: string) { return ORIGIN + normalizePath(path); }
export function allRoutes() {
  return [...Object.keys(ROUTE_METADATA), ...BLOG_POSTS.map(post => post.route)];
}
export function metadataFor(path: string): RouteMetadata {
  path = normalizePath(path);
  const post = BLOG_POSTS.find(post => post.route === path);
  if (post) return { title: post.seoTitle, description: post.description, lastmod: post.dateModified };
  return ROUTE_METADATA[path] ?? {
    title: 'Page Not Found | Stacy Slone, REALTOR® | Durham, NC',
    description: 'This page could not be found. Visit the home, buying, selling, or contact pages to connect with Stacy Slone, REALTOR® in Durham, NC and the Triangle.',
    noindex: true, lastmod: '2026-09-19',
  };
}
export function schemaFor(path: string) {
  path = normalizePath(path);
  const url = canonicalUrl(path);
  const agentId = `${ORIGIN}/#agent`;
  const agent = {
    '@type': 'RealEstateAgent', '@id': agentId,
    name: 'Stacy Slone', alternateName: 'Stacy Wilson Slone', description: 'Stacy Slone, REALTOR®',
    url: `${ORIGIN}/`, telephone: '+1-919-972-1180', email: SITE.email,
    image: ORIGIN + ASSETS.headshot,
    address: { '@type': 'PostalAddress', streetAddress: SITE.officeAddress,
      addressLocality: 'Durham', addressRegion: 'NC', postalCode: '27713', addressCountry: 'US' },
    parentOrganization: { '@type': 'RealEstateAgent', name: SITE.brokerageLegalName },
    areaServed: ['Durham, NC','Hillsborough, NC','Chapel Hill, NC','Raleigh, NC','Wake Forest, NC','Mebane, NC','Person County, NC'],
    openingHours: 'Mo-Su 09:00-19:00', foundingDate: '1998-03-01',
    knowsAbout: ['Selling a home in Durham, NC','Estate and inherited home sales','Downsizing','First-time home buyers','Land and investment property','Foreclosures and short sales','New construction'],
    hasCredential: { '@type': 'EducationalOccupationalCredential', credentialCategory: 'North Carolina Real Estate Broker License', identifier: SITE.licenseNumber },
    sameAs: ['https://www.zillow.com/profile/Stacy%20Slone','https://www.homes.com/real-estate-agents/stacy-slone/g1fb4ew/','https://www.linkedin.com/in/stacy-slone-05050b17/','https://www.instagram.com/stacyslonerealtornc/','https://www.fastexpert.com/agents/stacy-slone-43103/'],
  };
  const graph: Record<string, unknown>[] = [agent];
  if (path === '/') graph.push({ '@type': 'WebSite', '@id': `${ORIGIN}/#website`, url, name: SITE.agentName, publisher: { '@id': agentId } });
  else {
    const crumbs = [{ name: 'Home', item: `${ORIGIN}/` }];
    if (path.startsWith('/communities/')) crumbs.push({ name: 'Communities', item: `${ORIGIN}/communities` });
    if (path.startsWith('/blog/')) crumbs.push({ name: 'Blog', item: `${ORIGIN}/blog` });
    const community = COMMUNITIES.find(c => path === `/communities/${c.slug}`);
    crumbs.push({ name: community ? `${community.name}, NC` : metadataFor(path).title.split(' | ')[0], item: url });
    graph.push({ '@type': 'BreadcrumbList', itemListElement: crumbs.map((c,i) => ({ '@type': 'ListItem', position: i+1, ...c })) });
  }
  if (path === '/about') graph.push({ '@type': 'ProfilePage', '@id': `${url}#profile`, url, mainEntity: { '@id': agentId } });
  const post = BLOG_POSTS.find(p => p.route === path);
  if (post) graph.push({ '@type': 'BlogPosting', '@id': `${url}#article`, headline: post.title,
    description: post.description, image: ORIGIN + post.image,
    datePublished: post.datePublished, dateModified: post.dateModified,
    author: { '@type': 'Person', name: 'Stacy Slone', jobTitle: 'REALTOR®', url: `${ORIGIN}/about` },
    publisher: { '@id': agentId }, mainEntityOfPage: { '@type': 'WebPage', '@id': url } });
  if (post && post.faqs.length) graph.push({ '@type': 'FAQPage', '@id': `${url}#faq`,
    mainEntity: post.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
  return { '@context': 'https://schema.org', '@graph': graph };
}
export function headValues(path: string) {
  const meta = metadataFor(path);
  return {
    title: meta.title, canonical: canonicalUrl(path), schema: schemaFor(path),
    names: { description: meta.description, author: SITE.agentName,
      robots: meta.noindex ? 'noindex, follow' : 'index, follow',
      'twitter:card': 'summary_large_image', 'twitter:title': meta.title,
      'twitter:description': meta.description, 'twitter:image': OG_IMAGE },
    properties: { 'og:title': meta.title, 'og:description': meta.description,
      'og:url': canonicalUrl(path), 'og:site_name': SITE.agentName,
      'og:type': BLOG_POSTS.some(p => p.route === path) ? 'article' : 'website',
      'og:image': OG_IMAGE, 'og:image:width': '1200', 'og:image:height': '630',
      'og:image:alt': 'Durham, North Carolina skyline' },
  };
}
export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[ch]!);
}
export function renderHead(path: string) {
  const h = headValues(path);
  return `<title>${escapeHtml(h.title)}</title>\n<link rel="canonical" href="${escapeHtml(h.canonical)}">\n` +
    Object.entries(h.names).map(([name,content]) => `<meta name="${name}" content="${escapeHtml(content)}">`).join('\n') + '\n' +
    Object.entries(h.properties).map(([property,content]) => `<meta property="${property}" content="${escapeHtml(content)}">`).join('\n') +
    `\n<script id="site-schema" type="application/ld+json">${JSON.stringify(h.schema).replace(/</g,'\\u003c')}</script>`;
}
