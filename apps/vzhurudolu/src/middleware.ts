import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = (context, next) => {
  const url = context.url;
  const pathname =
    url.pathname.length > 1 && url.pathname.endsWith('/')
      ? url.pathname.slice(0, -1)
      : url.pathname;

  // Staré ebook odkazy: /prirucka/css3?p=transitions → /prirucka/css3-transitions
  if (pathname === '/prirucka/css3') {
    const p = url.searchParams.get('p');
    if (p) {
      return context.redirect(`/prirucka/css3-${p}`, 301);
    }
  }

  // Přesměrovat /kurzy/ a /kurzy/* na /kurzy
  if (url.pathname.startsWith('/kurzy/') && url.pathname !== '/kurzy') {
    return context.redirect('/kurzy', 301);
  }

  return next();
};
