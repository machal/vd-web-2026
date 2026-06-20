/**
 * Centralizované validace pro prirucka kolekci
 * 
 * Tento modul obsahuje všechny validace pro příručku:
 * - Validace duplicitních ID (pouze pro published soubory)
 * - Validace frontmatter
 * 
 * Validace vylučují soubory s published: false, protože tyto soubory
 * jsou součástí ebooků a duplicita ID je očekávaná a v pořádku.
 */

import type { CollectionEntry } from 'astro:content';

export interface ValidationError {
  type: 'duplicate_id' | 'missing_frontmatter' | 'other';
  message: string;
  details?: Array<{
    id?: string;
    files?: Array<{ slug: string; id: string; file: string }>;
  }>;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Validuje duplicitní ID v kolekci
 * Kontroluje pouze soubory s published !== false
 */
export function validateDuplicateIds(
  entries: Array<CollectionEntry<'prirucka'> & { data: { id: string } }>
): ValidationResult {
  const errors: ValidationError[] = [];
  
  // Filtrujeme pouze published soubory (published !== false)
  const publishedEntries = entries.filter(entry => entry.data.published !== false);
  
  // Vytvoříme mapu ID -> soubory
  const idMap = new Map<string, Array<{ slug: string; id: string; file: string }>>();
  
  for (const item of publishedEntries) {
    const id = item.data.id;
    const file = `${item.slug}.md`;
    
    if (!idMap.has(id)) {
      idMap.set(id, []);
    }
    
    idMap.get(id)!.push({
      slug: item.slug,
      id: id,
      file: file,
    });
  }
  
  // Najdeme všechny duplicity (ID, která mají více než jeden soubor)
  const duplicates = Array.from(idMap.entries())
    .filter(([_, files]) => files.length > 1)
    .map(([id, files]) => ({ id, files }));
  
  if (duplicates.length > 0) {
    // Sestavíme detailní chybovou zprávu
    const errorMessages = duplicates.map(({ id, files }) => {
      const fileList = files.map(f => `  - ${f.file} (slug: ${f.slug}, id: ${f.id})`).join('\n');
      return `ID "${id}" je použito v ${files.length} souborech:\n${fileList}`;
    });
    
    const message = `Nalezeny duplicitní ID v prirucka kolekci!\n\n` +
      `Duplicitní ID způsobují konflikty v routingu a mohou vést k neočekávaným přesměrováním.\n\n` +
      `Nalezené duplicity:\n${errorMessages.join('\n\n')}\n\n` +
      `Řešení: Zkontrolujte front matter v uvedených souborech a zajistěte, že každý článek má jedinečné ID.\n` +
      `Soubory najdete v: src/content/prirucka/\n` +
      `Poznámka: Soubory s published: false jsou z validace vyloučeny (jsou součástí ebooků).`;
    
    errors.push({
      type: 'duplicate_id',
      message,
      details: duplicates.map(({ id, files }) => ({ id, files })),
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validuje frontmatter v souborech
 * Volitelně může vyloučit soubory s published: false
 */
export function validateFrontmatter(
  entries: Array<CollectionEntry<'prirucka'>>,
  options: { excludeUnpublished?: boolean } = {}
): ValidationResult {
  const errors: ValidationError[] = [];
  
  // Pokud excludeUnpublished je true, filtrujeme pouze published soubory
  const entriesToCheck = options.excludeUnpublished
    ? entries.filter(entry => entry.data.published !== false)
    : entries;
  
  // Kontrolujeme, zda všechny soubory mají id
  const entriesWithoutId = entriesToCheck.filter(entry => !entry.data.id);
  
  if (entriesWithoutId.length > 0) {
    const fileList = entriesWithoutId.map(entry => `  - ${entry.slug}.md`).join('\n');
    errors.push({
      type: 'missing_frontmatter',
      message: `Nalezeny soubory bez ID v frontmatter:\n${fileList}\n\n` +
        `Řešení: Přidejte pole 'id' do frontmatter těchto souborů.`,
      details: entriesWithoutId.map(entry => ({ files: [{ slug: entry.slug, id: '', file: `${entry.slug}.md` }] })),
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Spustí všechny validace pro prirucka kolekci
 */
export async function runAllValidations(
  entries: Array<CollectionEntry<'prirucka'> & { data: { id: string } }>
): Promise<ValidationResult> {
  const allErrors: ValidationError[] = [];
  
  // Validace duplicitních ID (pouze pro published soubory)
  const duplicateIdResult = validateDuplicateIds(entries);
  if (!duplicateIdResult.isValid) {
    allErrors.push(...duplicateIdResult.errors);
  }
  
  // Validace frontmatter (vyloučíme unpublished)
  const frontmatterResult = validateFrontmatter(entries, { excludeUnpublished: true });
  if (!frontmatterResult.isValid) {
    allErrors.push(...frontmatterResult.errors);
  }
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
}

/**
 * Formátuje validační chyby pro zobrazení v prohlížeči
 */
export function formatValidationErrorsForDisplay(errors: ValidationError[]): string {
  if (errors.length === 0) {
    return '';
  }
  
  const errorMessages = errors.map((error, index) => {
    let formatted = `\n${index + 1}. ${error.message}`;
    
    if (error.details && error.details.length > 0) {
      formatted += '\n\nDetaily:';
      error.details.forEach((detail, detailIndex) => {
        if (detail.id) {
          formatted += `\n  - ID: ${detail.id}`;
        }
        if (detail.files && detail.files.length > 0) {
          formatted += '\n    Soubory:';
          detail.files.forEach(file => {
            formatted += `\n      • ${file.file} (slug: ${file.slug})`;
          });
        }
      });
    }
    
    return formatted;
  });
  
  return `❌ CHYBA: Nalezeny validační chyby v prirucka kolekci!\n\n${errorMessages.join('\n\n')}`;
}
