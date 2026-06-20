import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';
import sanitizeHtml from 'sanitize-html';
import { VFile } from 'vfile';
import { createRemarkPriruckaImages } from './remark-prirucka-images.ts';
import { remarkNormalizeCodeLang } from './remark-normalize-code-lang.ts';
import { remarkProcessMarkdownAttributes } from './remark-process-markdown-attributes.ts';
import { createRehypePriruckaImages } from './rehype-prirucka-images.ts';
import { createRehypeContentLinks } from './rehype-prirucka-links.ts';
import { rehypeRemoveEbookOnly } from './rehype-remove-ebook-only.ts';
import { rehypeConnectedElements } from './rehype-connected-elements.ts';
import { rehypeRelatedToInnerBox } from './rehype-related-to-inner-box.ts';
import { rehypeHeadingAnchors } from './rehype-heading-anchors.ts';
import { rehypeRemoveFirstH1 } from './rehype-remove-first-h1.ts';
import type { MarkdownConfigOptions } from './create-markdown-config.ts';

const RSS_ALLOWED_TAGS = [
  ...sanitizeHtml.defaults.allowedTags,
  'img',
  'figure',
  'figcaption',
  'picture',
  'source',
  'small',
  'hr',
  'br',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
];

export interface RenderMarkdownForRssOptions extends MarkdownConfigOptions {
  /** Virtual source path so relative .md links resolve like on the site. */
  sourcePath?: string;
}

export async function renderMarkdownForRss(
  markdown: string,
  options: RenderMarkdownForRssOptions = {},
): Promise<string> {
  const contentPathPrefix = options.contentPathPrefix ?? '/prirucka';
  const guideImagesPrefix = options.guideImagesPrefix ?? '/prirucka/images';
  const collections = options.collections ?? ['prirucka', 'blog', 'podcast'];
  const includeEbookOnly = options.includeEbookOnly ?? true;

  const remarkPriruckaImages = createRemarkPriruckaImages({
    imagesPrefix: guideImagesPrefix,
  });
  const rehypePriruckaImages = createRehypePriruckaImages({
    imagesPrefix: guideImagesPrefix,
  });
  const rehypePriruckaLinks = createRehypeContentLinks({
    collections,
    contentPathPrefix,
  });

  const file = new VFile({
    value: markdown,
    path: options.sourcePath,
  });

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkPriruckaImages)
    .use(remarkNormalizeCodeLang)
    .use(remarkProcessMarkdownAttributes)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypePriruckaImages)
    .use(...(includeEbookOnly ? [rehypeRemoveEbookOnly] : []))
    .use(rehypeConnectedElements)
    .use(rehypeRelatedToInnerBox)
    .use(rehypeHeadingAnchors)
    .use(rehypePriruckaLinks)
    .use(rehypeRemoveFirstH1)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(file);

  return sanitizeHtml(String(result), {
    allowedTags: RSS_ALLOWED_TAGS,
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
      a: ['href', 'name', 'target', 'rel', 'title'],
      td: ['colspan', 'rowspan'],
      th: ['colspan', 'rowspan'],
    },
  });
}
