// Normalize legacy paths, scheme, host and slashes together to avoid chained hops.
export default async function canonical(request: Request, _context?: unknown) {
  if (request.method !== 'GET' && request.method !== 'HEAD') return;
  const url = new URL(request.url);
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/.netlify/')) return;
  let pathname = url.pathname.replace(/\/+$/, '') || '/';
  if (pathname.endsWith('/index.html')) pathname = pathname.slice(0, -11) || '/';
  if (/^\/search\/market_report_search(?:\/|$)/.test(pathname)) pathname = '/home-valuation';
  else if (/^\/(?:search|listing|listings|property|homes-for-sale)(?:\/|$)/.test(pathname)) pathname = '/buy';
  else if (/^\/durham-homes-for-sale(?:\/|$)/.test(pathname)) pathname = '/communities/durham';
  else if (/^\/communities\/(?:cary|apex)$/.test(pathname)) pathname = '/communities';
  const productionHost = ['stacyslonerealty.com', 'www.stacyslonerealty.com'].includes(url.hostname);
  const destination = new URL(url);
  destination.pathname = pathname;
  if (productionHost) { destination.protocol = 'https:'; destination.hostname = 'stacyslonerealty.com'; }
  if (destination.href !== url.href) return Response.redirect(destination.href, 301);
}
export const config = { path: '/*' };
