export const AUTHOR_PROFILE_PHOTO = '/assets/img/content/lectors/martin-michalek-home.png';
export const AUTHOR_PROFILE_PATH = '/martin';

export const authorProfileBioLines = {
  cs: [
    'Mám rád web.',
    'Píšu o něm už přes dvacet let.',
    'Dnes se hlavně věnuji rychlosti webů a konferenci FrontKon.',
  ],
  en: [
    'I love the web.',
    "I've been writing about it for over twenty years.",
    'These days I mainly focus on web performance and the FrontKon conference.',
  ],
} as const;

export const authorProfileCopy = {
  cs: {
    heading: 'Martin Michálek',
    linkLabel: 'Více o autorovi',
  },
  en: {
    heading: 'Martin Michálek',
    linkLabel: 'About Martin',
  },
} as const;

export type AuthorProfileLocale = keyof typeof authorProfileCopy;

export function getAuthorProfileBioLines(locale: AuthorProfileLocale) {
  return authorProfileBioLines[locale];
}

export function getAuthorProfileBio(locale: AuthorProfileLocale) {
  return authorProfileBioLines[locale].join(' ');
}

export function getAuthorProfileCopy(locale: AuthorProfileLocale) {
  return {
    ...authorProfileCopy[locale],
    bioLines: authorProfileBioLines[locale],
    bio: getAuthorProfileBio(locale),
  };
}
