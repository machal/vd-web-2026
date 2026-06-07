/**
 * Vercel Routing Middleware (project root — not Astro src/middleware.ts).
 * Runs on static deploys where Astro middleware does not execute.
 */
export default function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname =
    url.pathname.length > 1 && url.pathname.endsWith('/')
      ? url.pathname.slice(0, -1)
      : url.pathname;

  if (pathname === '/prirucka/css3') {
    const p = url.searchParams.get('p');
    if (p) {
      return new Response(null, {
        status: 308,
        headers: { Location: `/prirucka/css3-${p}` },
      });
    }
  }
}

export const config = {
  matcher: ['/prirucka/css3', '/prirucka/css3/'],
};
