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
    width: 175,
    height: 62,
  },
} as const;

export const martinIntroCopy = {
  cs: {
    pageSpeed: {
      brand: { label: 'PageSpeed.ONE', href: 'https://pagespeed.one/' },
      consulting: { label: 'poradenství', href: 'https://pagespeed.one/services' },
      monitoring: { label: 'monitorovací nástroj', href: 'https://pagespeed.one/monitoring-plus' },
    },
    community: {
      frontendisti: { label: 'Frontendisti.cz', href: 'https://www.frontendisti.cz/' },
      frontkon: { label: 'FrontKon', href: 'https://www.frontkon.cz/' },
      frontkec: { label: 'FrontKec', href: 'https://www.frontendisti.cz/frontkec' },
    },
  },
  en: {
    pageSpeed: {
      brand: { label: 'PageSpeed.ONE', href: 'https://pagespeed.one/' },
      consulting: { label: 'consulting', href: 'https://pagespeed.one/services' },
      monitoring: { label: 'monitoring tool', href: 'https://pagespeed.one/monitoring-plus' },
    },
    community: {
      frontendisti: { label: 'Frontendisti.cz', href: 'https://www.frontendisti.cz/' },
      frontkon: { label: 'FrontKon', href: 'https://www.frontkon.cz/' },
      frontkec: { label: 'FrontKec', href: 'https://www.frontendisti.cz/frontkec' },
    },
  },
} as const;

export type MartinIntroLocale = keyof typeof martinIntroCopy;

export function getMartinIntroCopy(locale: MartinIntroLocale) {
  return martinIntroCopy[locale];
}
