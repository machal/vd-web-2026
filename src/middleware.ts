import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = (context, next) => {
  const url = context.url;
  
  // Přesměrovat /kurzy/ a /kurzy/* na /kurzy
  if (url.pathname.startsWith('/kurzy/') && url.pathname !== '/kurzy') {
    return context.redirect('/kurzy', 301);
  }
  
  return next();
};
