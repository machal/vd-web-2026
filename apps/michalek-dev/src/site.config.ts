import type { SiteConfig } from '@vd/shared/types';

export const siteConfig: SiteConfig = {
  id: 'michalek-dev',
  siteName: 'Martin Michálek',
  titleSuffix: 'Martin Michálek',
  locale: 'en',
  origin: 'https://michalek.blog',
  gaMeasurementId: 'G-DY5J0ZET7Z',
  showLogoSymbol: false,
  footerMode: 'minimal',
  sisterSite: {
    href: 'https://www.vzhurudolu.cz',
    name: 'VzhuruDolu.cz',
  },
  navItems: [
    {
      label: 'Articles',
      href: '/',
      activeMatch: ['/', '/blog', '/guide'],
      colorClass: 'color-home',
    },
    {
      label: 'Martin',
      href: '/martin',
      activeMatch: '/martin',
      colorClass: 'color-home',
    },
  ],
};
