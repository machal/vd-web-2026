export type MartinContactSocialId = 'linkedin' | 'x' | 'facebook' | 'instagram' | 'bluesky';

export interface MartinContactSocialLink {
  id: MartinContactSocialId;
  label: string;
  href: string;
}

export const martinContactEmail = 'martin@pagespeed.cz';
export const martinContactPhone = {
  display: '+420 724 071 700',
  href: 'tel:+420724071700',
};

export const martinContactSocials = {
  cs: [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/martinmichalek',
    },
    {
      id: 'x',
      label: 'X',
      href: 'https://x.com/machal',
    },
    {
      id: 'facebook',
      label: 'Facebook',
      href: 'https://www.facebook.com/machal',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/absolutmachal',
    },
  ],
  en: [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/martinmichalek',
    },
    {
      id: 'bluesky',
      label: 'Bluesky',
      href: 'https://bsky.app/profile/machal.bsky.social',
    },
  ],
} as const satisfies Record<'cs' | 'en', MartinContactSocialLink[]>;

export const martinContactCopy = {
  cs: {
    sectionId: 'kontakt',
    heading: 'Kontakt',
    emailPrefix: 'E',
    phonePrefix: 'T',
    legal: [
      'Fyzická osoba zapsaná v živnostenském rejstříku.',
      'Jurkovičova 988/26',
      '149 00, Praha 11',
      'IČ: 68168861',
      'DIČ: 7708304956',
    ],
  },
  en: {
    sectionId: 'contact',
    heading: 'Contact',
    emailPrefix: 'E',
    phonePrefix: 'T',
    legal: null,
  },
} as const;

export type MartinContactLocale = keyof typeof martinContactCopy;

export function getMartinContactCopy(locale: MartinContactLocale) {
  return martinContactCopy[locale];
}

export function getMartinContactSocials(locale: MartinContactLocale) {
  return martinContactSocials[locale];
}
