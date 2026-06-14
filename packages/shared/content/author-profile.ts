export const AUTHOR_PROFILE_PHOTO = '/assets/img/content/lectors/martin-michalek-home.png';
export const AUTHOR_PROFILE_PATH = '/martin';

export const authorProfileCopy = {
  cs: {
    heading: 'Martin Michálek',
    bio: 'Mám rád web. Píšu o něm už více než 20 let. Nyní se zabývám hlavně rychlostí webů a konferencí FrontKon.',
    linkLabel: 'Více o autorovi',
  },
  en: {
    heading: 'Martin Michálek',
    bio: "I love the web. I've been writing about it for over 20 years. These days I focus mainly on web performance and the FrontKon conference.",
    linkLabel: 'About Martin',
  },
} as const;

export type AuthorProfileLocale = keyof typeof authorProfileCopy;

export function getAuthorProfileCopy(locale: AuthorProfileLocale) {
  return authorProfileCopy[locale];
}
