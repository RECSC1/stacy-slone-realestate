import fs from 'node:fs/promises';
import path from 'node:path';
import { allRoutes, render, renderHead, metadataFor, FORM_FIELDS } from '../.ssg/entry-server.js';
const out = path.resolve('dist/public');
const template = await fs.readFile(path.join(out,'index.html'),'utf8');
if (!template.includes('<!--route-head-->') || !template.includes('<div id="root"></div>')) throw new Error('Run vite build before prerendering: the fresh HTML template is required.');
const routes = allRoutes();
const formDefinitions = Object.entries(FORM_FIELDS).map(([name,fields]) => `<form name="${name}" method="POST" data-netlify="true" netlify-honeypot="bot-field" hidden><input type="hidden" name="form-name" value="${name}">${[...fields,'bot-field','page-url','submitted-at','submission-id'].map(field=>`<input name="${field}" type="${field==='email'?'email':'text'}">`).join('')}</form>`).join('\n');
await fs.writeFile(path.join(out,'__forms.html'),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>Form processing</title></head><body data-form-registration>${formDefinitions}</body></html>`);
if(new Set(routes).size !== routes.length) throw new Error('Duplicate prerender route');
for(const route of [...routes,'/404']) {
  const html = template.replace('<!--route-head-->',renderHead(route)).replace('<div id="root"></div>',`<div id="root">${render(route)}</div>`);
  const target = route === '/' ? 'index.html' : route === '/404' ? '404.html' : `${route.slice(1)}/index.html`;
  await fs.mkdir(path.dirname(path.join(out,target)),{recursive:true});
  await fs.writeFile(path.join(out,target), html);
  // Clean-URL file avoids a host-imposed redirect to a directory URL ending in '/'.
  if(route !== '/' && route !== '/404') await fs.writeFile(path.join(out,`${route.slice(1)}.html`),html);
  console.log(`Prerendered ${route}: ${Buffer.byteLength(html)} bytes`);
}
// Preserve the existing administrative entry points without a public catch-all.
await fs.writeFile(path.join(out,'admin-shell.html'),template.replace('<!--route-head-->','<title>Admin | Stacy Slone, REALTOR®</title><meta name="robots" content="noindex, follow">'));
const indexable = routes.filter(route => !metadataFor(route).noindex && metadataFor(route).sitemap !== false);
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + indexable.map(route => `  <url><loc>https://stacyslonerealty.com${route}</loc><lastmod>${metadataFor(route).lastmod}</lastmod></url>`).join('\n') + '\n</urlset>\n';
await fs.writeFile('client/public/sitemap.xml',sitemap);
await fs.writeFile(path.join(out,'sitemap.xml'),sitemap);
await fs.rm(path.join(out,'__manus__'),{recursive:true,force:true});
console.log(`Sitemap: ${indexable.length} URLs. Existing extra pages preserved outside the requested sitemap.`);
const redirects = [
  'http://www.stacyslonerealty.com/* https://stacyslonerealty.com/:splat 301!',
  'https://www.stacyslonerealty.com/* https://stacyslonerealty.com/:splat 301!',
  'http://stacyslonerealty.com/* https://stacyslonerealty.com/:splat 301!',
  '/index.html / 301!',
  '/search/market_report_search/* /home-valuation 301!',
  '/search/* /buy 301!',
  ...['listing','listings','property','homes-for-sale'].map(prefix => `/${prefix}/* /buy 301!`),
  '/durham-homes-for-sale/* /communities/durham 301!',
  '/communities/cary /communities 301!', '/communities/apex /communities 301!',
  ...routes.filter(route => route !== '/').map(route => `${route} ${route}.html 200!`),
  '/admin /admin-shell.html 200!', '/admin/dashboard /admin-shell.html 200!',
  '/* /404.html 404',
].join('\n')+'\n';
await fs.writeFile('client/public/_redirects',redirects);
await fs.writeFile(path.join(out,'_redirects'),redirects);
