import { renderToString } from 'react-dom/server';
import { Router } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import { trpc } from './lib/trpc';
import App from './App';
export { allRoutes, renderHead, metadataFor } from './config/seo';
export { FORM_FIELDS } from './config/forms';
export function application(path?: string) {
  const queryClient = new QueryClient();
  const client = trpc.createClient({ links: [httpBatchLink({ url: 'http://localhost/api/trpc', transformer: superjson })] });
  const element = <trpc.Provider client={client} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}><Router ssrPath={path}><App /></Router></QueryClientProvider>
  </trpc.Provider>;
  return { element, queryClient };
}

export function render(path: string) {
  const {element,queryClient} = application(path);
  const html = renderToString(element);
  queryClient.clear();
  return html;
}
