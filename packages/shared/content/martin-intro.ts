export const martinIntroLogos = {
  pageSpeed: {
    src: '/assets/img/content/dest/logos/pagespeed-one-symbol.svg',
    alt: 'PageSpeed.ONE',
    href: 'https://pagespeed.one/',
    width: 100,
    height: 88,
  },
  community: {
    src: '/assets/img/content/dest/logos/frontendisti.svg',
    alt: 'Frontendisti.cz',
    href: 'https://www.frontendisti.cz/',
    width: 250,
    height: 88,
  },
} as const;

export const martinIntroCopy = {
  cs: {
    pageSpeed: {
      before: 'V ',
      brand: { label: 'PageSpeed.ONE', href: 'https://pagespeed.one/' },
      middle: ' pomáháme firmám s rychlostí webu, od ',
      monitoring: { label: 'monitoringu', href: 'https://pagespeed.one/monitoring-plus' },
      afterMonitoring: ' po ',
      consulting: { label: 'poradenství', href: 'https://pagespeed.one/services' },
      end: '.',
    },
    community: {
      before: 'Spoluzaložil a vedu jednu z největších českých IT komunity ',
      frontendisti: { label: 'Frontendisti.cz', href: 'https://www.frontendisti.cz/' },
      middle: '. V rámci této značky pořádáme konferenci ',
      frontkon: { label: 'FrontKon', href: 'https://www.frontkon.cz/' },
      afterFrontkon: ' a natáčíme podcast ',
      frontkec: { label: 'FrontKec', href: 'https://www.frontendisti.cz/frontkec' },
      end: '.',
    },
  },
  en: {
    pageSpeed: {
      before: 'At ',
      brand: { label: 'PageSpeed.ONE', href: 'https://pagespeed.one/' },
      middle: ' we help companies with web performance — from ',
      monitoring: { label: 'monitoring', href: 'https://pagespeed.one/monitoring-plus' },
      afterMonitoring: ' to ',
      consulting: { label: 'consulting', href: 'https://pagespeed.one/services' },
      end: '.',
    },
    community: {
      before: 'I co-founded and lead one of the largest Czech IT communities, ',
      frontendisti: { label: 'Frontendisti.cz', href: 'https://www.frontendisti.cz/' },
      middle: '. Under that brand we run the ',
      frontkon: { label: 'FrontKon', href: 'https://www.frontkon.cz/' },
      afterFrontkon: ' conference and record the ',
      frontkec: { label: 'FrontKec', href: 'https://www.frontendisti.cz/frontkec' },
      end: ' podcast.',
    },
  },
} as const;

export type MartinIntroLocale = keyof typeof martinIntroCopy;

export function getMartinIntroCopy(locale: MartinIntroLocale) {
  return martinIntroCopy[locale];
}
