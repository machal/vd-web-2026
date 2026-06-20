import { SITE_ORIGINS } from '../content-pairing/resolve.ts';

const EN_MARTIN_URL = `${SITE_ORIGINS['michalek-dev']}/martin`;

export const MARTIN_SAME_AS = [
  'https://www.linkedin.com/in/martinmichalek',
  'https://pagespeed.one/',
] as const;

export interface PersonJsonLdOptions {
  name?: string;
  url: string;
  jobTitle?: string;
  description?: string;
}

export function buildPersonJsonLd(options: PersonJsonLdOptions): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: options.name ?? 'Martin Michálek',
    url: options.url,
    jobTitle: options.jobTitle ?? 'Web Performance Consultant',
    description: options.description,
    sameAs: [...MARTIN_SAME_AS],
  };
}

export interface ArticleJsonLdOptions {
  headline: string;
  description: string;
  url: string;
  datePublished?: Date;
  image?: string;
}

export function buildArticleJsonLd(options: ArticleJsonLdOptions): Record<string, unknown> {
  const author = buildPersonJsonLd({ url: EN_MARTIN_URL });

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.headline,
    description: options.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': options.url,
    },
    author,
    publisher: {
      '@type': 'Person',
      name: 'Martin Michálek',
      url: EN_MARTIN_URL,
      sameAs: [...MARTIN_SAME_AS],
    },
    ...(options.datePublished
      ? { datePublished: options.datePublished.toISOString().split('T')[0] }
      : {}),
    ...(options.image ? { image: options.image } : {}),
  };
}

export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data);
}
