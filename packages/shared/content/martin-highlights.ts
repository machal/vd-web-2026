export type MartinHighlightKind = 'article' | 'talk';

export interface MartinHighlightItem {
  kind: MartinHighlightKind;
  /** ISO date YYYY-MM-DD */
  date: string;
  title: {
    cs: string;
    en: string;
  };
  href: string;
}

export const martinHighlightsCopy = {
  cs: {
    heading: 'Pět vybraných přednášek a článků',
    kinds: {
      article: 'Článek',
      talk: 'Přednáška',
    },
    youtubeLabel: 'Všechny přednášky na YouTube',
    youtubeHref:
      'https://www.youtube.com/watch?v=VgQL7CvR0F0&list=PLOs14ZGnaZuvmYRYnRd9qXXLQXTKPfOyj',
  },
  en: {
    heading: 'Five selected talks and articles',
    kinds: {
      article: 'Article',
      talk: 'Talk',
    },
    youtubeLabel: null,
    youtubeHref: null,
  },
} as const;

export const martinHighlights: MartinHighlightItem[] = [
  {
    kind: 'article',
    date: '2026-05-18',
    title: {
      cs: 'WebExpo 2026: Switch Angel, Daniel Cuthbert, Mike Kus & FrontKec',
      en: 'WebExpo 2026: Switch Angel, Daniel Cuthbert, Mike Kus & FrontKec',
    },
    href: '/blog/263-webexpo-2026',
  },
  {
    kind: 'article',
    date: '2026-02-10',
    title: {
      cs: 'Vibe coding: 25 let stavění webů, poslední dva měsíce úplně jinak',
      en: 'Vibe coding: 25 years of building websites, last two months completely different',
    },
    href: 'https://michalek.dev/guide/vibe-coding',
  },
  {
    kind: 'article',
    date: '2025-01-06',
    title: {
      cs: 'Můj rok 2025: strategický, úspěšný — a úzkostný',
      en: 'My 2025 in review: strategic, successful — and anxious',
    },
    href: 'https://michalek.dev/blog/2025-year-in-review',
  },
  {
    kind: 'talk',
    date: '2024-10-01',
    title: {
      cs: 'Budoucnost frontendové vývojařiny a AI',
      en: 'The future of frontend development and AI',
    },
    href: 'https://www.youtube.com/watch?v=xem_YPyB-zQ',
  },
  {
    kind: 'article',
    date: '2024-09-01',
    title: {
      cs: 'Podcast FrontKec: prvních 10 dílů na jednom místě',
      en: 'FrontKec podcast: the first 10 episodes in one place',
    },
    href: '/blog/262-frontkec-deset-dilu',
  },
];

export type MartinHighlightsLocale = keyof typeof martinHighlightsCopy;

export function getMartinHighlightsCopy(locale: MartinHighlightsLocale) {
  return martinHighlightsCopy[locale];
}

export function formatMartinHighlightDate(date: string, locale: MartinHighlightsLocale): string {
  const parsed = new Date(`${date}T12:00:00`);
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'cs-CZ', {
    day: 'numeric',
    month: locale === 'en' ? 'short' : 'numeric',
    year: 'numeric',
  }).format(parsed);
}
