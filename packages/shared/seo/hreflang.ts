export interface AlternateLink {
  hreflang: string;
  href: string;
}

export interface AlternateLinksInput {
  csUrl: string;
  enUrl: string;
  xDefaultUrl: string;
}

export function buildAlternateLinks({
  csUrl,
  enUrl,
  xDefaultUrl,
}: AlternateLinksInput): AlternateLink[] {
  return [
    { hreflang: 'en', href: enUrl },
    { hreflang: 'cs', href: csUrl },
    { hreflang: 'x-default', href: xDefaultUrl },
  ];
}
