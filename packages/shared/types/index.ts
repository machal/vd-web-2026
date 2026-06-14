export interface CategoryConfig {
  slug: string;
  title: string;
  description: string;
  hasTOC: boolean;
  tags: string[];
}

export interface NavItem {
  label: string;
  href: string;
  /** Path prefix or exact path; use '/' for homepage exact match only */
  activeMatch: string | string[];
  colorClass?: string;
}

export interface SisterSiteLink {
  href: string;
  name: string;
}

export interface SiteConfig {
  id: 'vzhurudolu' | 'michalek-dev';
  siteName: string;
  titleSuffix: string;
  locale: 'cs' | 'en';
  origin: string;
  navItems: NavItem[];
  showLogoSymbol: boolean;
  footerMode: 'full' | 'minimal';
  sisterSite?: SisterSiteLink;
  /** GA4 measurement ID (e.g. G-XXXXXXXXXX). EN site only. */
  gaMeasurementId?: string;
}
