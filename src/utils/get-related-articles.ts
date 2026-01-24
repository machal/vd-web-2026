import { getCollection, type CollectionEntry } from 'astro:content';

type ArticleEntry = CollectionEntry<'prirucka'> | CollectionEntry<'blog'> | CollectionEntry<'podcast'>;

/**
 * Normalizace tagu - odstranění diakritiky a převod na malá písmena
 */
function normalizeTag(tag: string): string {
  return tag
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Najde podobné články napříč všemi kolekcemi (prirucka, blog, podcast)
 * na základě sdílených tagů.
 * 
 * @param currentTags - tagy aktuálního článku
 * @param currentId - ID aktuálního článku (pro prirucka data.id, pro ostatní slug)
 * @param currentCollection - kolekce aktuálního článku
 * @returns pole max 3 nejnovějších článků se sdílenými tagy
 */
export async function getRelatedArticles(
  currentTags: string[],
  currentId: string,
  currentCollection: 'prirucka' | 'blog' | 'podcast'
): Promise<ArticleEntry[]> {
  // Pokud článek nemá žádné tagy, vrátíme prázdné pole
  if (!currentTags.length) return [];

  const normalizedCurrentTags = currentTags.map(normalizeTag);

  // Načíst všechny kolekce paralelně
  const [prirucka, blog, podcast] = await Promise.all([
    getCollection('prirucka', (e) => e.data.published === true),
    getCollection('blog'),
    getCollection('podcast'),
  ]);

  // Spojit všechny články
  const allArticles: ArticleEntry[] = [...prirucka, ...blog, ...podcast];

  // Filtrovat podle tagů, vyloučit aktuální článek
  return allArticles
    .filter((article) => {
      // Vyloučit aktuální článek
      const articleId = article.collection === 'prirucka' 
        ? article.data.id 
        : article.slug;
      if (articleId === currentId && article.collection === currentCollection) {
        return false;
      }
      // Najít shodu v tazích
      const articleTags = (article.data.tags || []).map(normalizeTag);
      return articleTags.some((tag) => normalizedCurrentTags.includes(tag));
    })
    .sort((a, b) => 
      (b.data.date?.getTime() || 0) - (a.data.date?.getTime() || 0)
    )
    .slice(0, 3);
}
