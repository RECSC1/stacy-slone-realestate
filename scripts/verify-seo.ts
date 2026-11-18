import assert from 'node:assert/strict';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import { allRoutes, metadataFor, canonicalUrl, ORIGIN } from '../client/src/config/seo';
import canonical from '../netlify/edge-functions/canonical';

let count = 0;
for(const route of [...allRoutes(),'/404']) {
  const file = route === '/' ? 'index.html' : route === '/404' ? '404.html' : `${route.slice(1)}/index.html`;
  const html = fs.readFileSync(`dist/public/${file}`,'utf8');
  const dom = new JSDOM(html); const d = dom.window.document;
  const meta = metadataFor(route);
  assert.equal(d.title,meta.title,route);
  assert.equal(d.querySelector('meta[name="description"]')?.getAttribute('content'),meta.description,route);
  assert.equal(d.querySelectorAll('link[rel="canonical"]').length,1,route);
  assert.equal(d.querySelector('link[rel="canonical"]')?.getAttribute('href'),canonicalUrl(route),route);
  assert.equal(d.querySelectorAll('h1').length,1,route);
  assert.ok(Array.from(d.querySelectorAll('main p')).some(p => p.textContent!.length > 50),route);
  assert.equal(d.querySelectorAll('#site-schema').length,1,route);
  const schema = JSON.parse(d.querySelector('#site-schema')!.textContent!);
  const agent = schema['@graph'].filter((x:any) => x['@id'] === ORIGIN+'/#agent');
  assert.equal(agent.length,1,route);
  assert.equal(agent[0].alternateName,'Stacy Wilson Slone',route);
  assert.equal(agent[0].hasCredential.identifier,'C27247',route);
  assert.ok(!/"(?:aggregateRating|Review)"/.test(JSON.stringify(schema)),route);
  const withoutAlias=html.replaceAll('Stacy Wilson Slone','');
  assert.ok(!/Wilson|—|–|dream home/i.test(withoutAlias),route);
  assert.ok(!/https?:\/\/(?:www\.)?(?:stacyslonerealestate|stacyslonerealtor)\.com/.test(html),route);
  assert.ok(!html.includes('manus-runtime'),route);
  for(const [key,value] of [['og:title',meta.title],['og:description',meta.description],['og:url',canonicalUrl(route)],['og:site_name','Stacy Slone, REALTOR®']])
    assert.equal(d.querySelector(`meta[property="${key}"]`)?.getAttribute('content'),value,route);
  assert.equal(d.querySelector('meta[name="twitter:card"]')?.getAttribute('content'),'summary_large_image',route);
  assert.equal(d.querySelector('meta[name="robots"]')?.getAttribute('content'),meta.noindex?'noindex, follow':'index, follow',route);
  assert.ok(meta.description.length>=140&&meta.description.length<=160,`${route} description length ${meta.description.length}`);
  if(!route.startsWith('/communities/') && route!='/404') assert.ok(meta.title.length>=50&&meta.title.length<=65,`${route} title length ${meta.title.length}`);
  if(route!='/404') {
    const nap=d.querySelector('footer address')!;
    assert.ok(nap.textContent!.includes('245 NC Highway 54, Suite 101Durham, NC 27713'),route);
    assert.ok(nap.querySelector('a[href="tel:+19199721180"]'),route);
    assert.ok(d.querySelector('footer #brokerage-disclosure'),route);
    if(route==='/contact') assert.equal(d.querySelector('main address')!.textContent,nap.textContent);
  }
  for(const a of d.querySelectorAll('a[href]')) {
    const href=a.getAttribute('href')!;
    if(href.startsWith('/') && href!=='/') {
      assert.ok(!href.endsWith('/'),`${route} trailing slash link ${href}`);
      const target=href.split(/[?#]/)[0];
      assert.ok(allRoutes().includes(target) || target.startsWith('/admin'),`${route} unknown link ${href}`);
    }
  }
  for(const img of d.querySelectorAll('img')) assert.ok(img.hasAttribute('alt'),`${route} missing alt`);
  console.log(`PASS ${route}: title, description, canonical, H1, body, schema, NAP, social tags, links`);
  dom.window.close();count++;
}
const sitemap=new JSDOM(fs.readFileSync('dist/public/sitemap.xml','utf8'),{contentType:'application/xml'});
assert.equal(sitemap.window.document.querySelectorAll('url').length,33);
assert.ok(!sitemap.window.document.querySelector('parsererror'));
const locs=[...sitemap.window.document.querySelectorAll('loc')].map(x=>x.textContent);
assert.ok(!locs.includes(ORIGIN+'/buyer-inquiry')&&!locs.includes(ORIGIN+'/seller-inquiry'));
for(const date of sitemap.window.document.querySelectorAll('lastmod')) assert.match(date.textContent!,/^\d{4}-\d{2}-\d{2}$/);
assert.equal(fs.readFileSync('dist/public/robots.txt','utf8'),'User-agent: *\nAllow: /\nDisallow: /buyer-inquiry\nDisallow: /seller-inquiry\n\nSitemap: https://stacyslonerealty.com/sitemap.xml\n');
for(const [input,expected] of [
 ['http://www.stacyslonerealty.com/','https://stacyslonerealty.com/'],
 ['https://www.stacyslonerealty.com/about/','https://stacyslonerealty.com/about'],
 ['http://stacyslonerealty.com/about/','https://stacyslonerealty.com/about'],
 [ORIGIN+'/about/',ORIGIN+'/about'], [ORIGIN+'/index.html',ORIGIN+'/'],
 [ORIGIN+'/search/advanced_search/',ORIGIN+'/buy'],
 [ORIGIN+'/search/market_report_search/',ORIGIN+'/home-valuation'],
 [ORIGIN+'/listings/old?ref=test',ORIGIN+'/buy?ref=test'],
 [ORIGIN+'/blog/',ORIGIN+'/blog'],
]) {
 const r=await canonical(new Request(input),{} as any);
 assert.equal(r?.status,301,input);assert.equal(r?.headers.get('location'),expected,input);
 const next=await canonical(new Request(expected),{} as any); assert.equal(next,undefined,input+' no redirect loop');
 console.log(`PASS 301 ${input} -> ${expected}`);
}
assert.equal(await canonical(new Request(ORIGIN+'/api/trpc/x',{method:'POST',body:'{}'}),{} as any),undefined);
const redirects=fs.readFileSync('dist/public/_redirects','utf8');
assert.ok(redirects.trimEnd().endsWith('/* /404.html 404'));
assert.ok(!redirects.includes('/* /index.html 200'));
const home=fs.readFileSync('dist/public/index.html','utf8');
const overhead=Buffer.byteLength(home.replace(/<div id="root">[\s\S]*<\/div>\s*<script type="module"/, '<script type="module"'));
assert.ok(!home.includes('manus-runtime'));
console.log(`PASS ${count} prerendered pages; 31 sitemap URLs; exact robots.txt; canonical edge behavior; real 404 fallback`);
console.log(`Homepage: ${Buffer.byteLength(home)} bytes including all prerendered content.`);
