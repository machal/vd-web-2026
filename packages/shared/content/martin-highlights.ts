export type MartinHighlightKind = 'article' | 'talk';

export interface MartinHighlightItem {
  kind: MartinHighlightKind;
  /** ISO date YYYY-MM-DD */
  date: string;
  title: string;
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

export const martinHighlightsByLocale: Record<
  keyof typeof martinHighlightsCopy,
  MartinHighlightItem[]
> = {
  cs: [
    {
      kind: 'article',
      date: '2025-12-09',
      title:
        '„Měříme padni komu padni.“ Šéf PageSpeed.one vysvětluje, kdo boduje v jejich žebříčku rychlosti webů',
      href: 'https://cc.cz/merime-padni-komu-padni-sef-pagespeed-one-vysvetluje-kdo-boduje-v-jejich-zebricku-rychlosti-webu/',
    },
    {
      kind: 'article',
      date: '2026-05-13',
      title: 'AI boti zpomalují možná i váš web. Jak to poznat a co s tím dělat?',
      href: 'https://www.lupa.cz/clanky/ai-boti-zpomaluji-mozna-i-vas-web-jak-to-poznat-a-co-s-tim-delat/',
    },
    {
      kind: 'talk',
      date: '2024-05-01',
      title: 'Nová metrika rychlosti INP a praktické tipy, jak ji zlepšit',
      href: 'https://www.youtube.com/watch?v=VgQL7CvR0F0&list=PLOs14ZGnaZuvmYRYnRd9qXXLQXTKPfOyj&index=1',
    },
    {
      kind: 'talk',
      date: '2024-10-05',
      title: 'Budoucnost frontendové vývojařiny a AI',
      href: 'https://www.youtube.com/watch?v=xem_YPyB-zQ&list=PLOs14ZGnaZuvmYRYnRd9qXXLQXTKPfOyj&index=7',
    },
    {
      kind: 'talk',
      date: '2016-09-23',
      title: '10 praktických CSS3 a SVG řešení',
      href: 'https://slideslive.com/webexpo/webexpo-2016?presentation_id=38898305&ref=speaker-1202',
    },
  ],
  en: [
    {
      kind: 'article',
      date: '2025-12-09',
      title:
        'The Inconvenient Truth: How Web Performance Case Studies Undermine Our Relationship with Business',
      href: 'https://calendar.perfplanet.com/2025/the-inconvenient-truth-how-web-performance-case-studies-undermine-our-relationship-with-business/',
    },
    {
      kind: 'article',
      date: '2024-12-26',
      title: "Don't Let Your Redesign Ruin Performance: A Case Study",
      href: 'https://calendar.perfplanet.com/2024/dont-let-your-redesign-ruin-performance-a-case-study/',
    },
    {
      kind: 'article',
      date: '2026-02-10',
      title: 'Vibe coding: 25 years of building websites, last two months completely different',
      href: '/guide/vibe-coding',
    },
    {
      kind: 'article',
      date: '2016-10-24',
      title: 'How To Poison The Mobile User',
      href: 'https://www.smashingmagazine.com/2016/10/how-to-poison-the-mobile-user/',
    },
    {
      kind: 'talk',
      date: '2018-09-15',
      title: 'Does AMP make sense to our websites?',
      href: 'https://slideslive.com/webexpo/webexpo-2018?presentation_id=38910564&ref=speaker-1202',
    },
  ],
};

export type MartinHighlightsLocale = keyof typeof martinHighlightsCopy;

export function getMartinHighlightsCopy(locale: MartinHighlightsLocale) {
  return martinHighlightsCopy[locale];
}

export function getMartinHighlights(locale: MartinHighlightsLocale): MartinHighlightItem[] {
  return martinHighlightsByLocale[locale];
}

export function formatMartinHighlightDate(date: string, locale: MartinHighlightsLocale): string {
  const parsed = new Date(`${date}T12:00:00`);
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'cs-CZ', {
    day: 'numeric',
    month: locale === 'en' ? 'short' : 'numeric',
    year: 'numeric',
  }).format(parsed);
}
