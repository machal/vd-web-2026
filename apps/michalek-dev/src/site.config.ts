import type { SiteConfig } from '@vd/shared/types';

export const siteConfig: SiteConfig = {
  id: 'michalek-dev',
  siteName: 'Martin Michálek',
  titleSuffix: 'Martin Michálek · Web & Performance',
  locale: 'en',
  origin: 'https://michalek.dev',
  showLogoSymbol: false,
  footerMode: 'minimal',
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
