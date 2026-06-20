import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { createRemarkPriruckaImages } from './remark-prirucka-images.ts';
import { remarkNormalizeCodeLang } from './remark-normalize-code-lang.ts';
import { remarkProcessMarkdownAttributes } from './remark-process-markdown-attributes.ts';
import { createRehypePriruckaImages } from './rehype-prirucka-images.ts';
import { createRehypeContentLinks } from './rehype-prirucka-links.ts';
import { rehypeConnectedElements } from './rehype-connected-elements.ts';
import { rehypeRelatedToInnerBox } from './rehype-related-to-inner-box.ts';
import { rehypeRemoveEbookOnly } from './rehype-remove-ebook-only.ts';
import { rehypeHeadingAnchors } from './rehype-heading-anchors.ts';
import { rehypeRemoveFirstH1 } from './rehype-remove-first-h1.ts';

export interface MarkdownConfigOptions {
  contentPathPrefix?: string;
  guideImagesPrefix?: string;
  collections?: string[];
  includeEbookOnly?: boolean;
}

const DEFAULT_OPTIONS: Required<MarkdownConfigOptions> = {
  contentPathPrefix: '/prirucka',
  guideImagesPrefix: '/prirucka/images',
  collections: ['prirucka', 'blog', 'podcast'],
  includeEbookOnly: true,
};

export function createMarkdownConfig(opts: MarkdownConfigOptions = {}) {
  const options = { ...DEFAULT_OPTIONS, ...opts };

  const remarkPriruckaImages = createRemarkPriruckaImages({
    imagesPrefix: options.guideImagesPrefix,
  });
  const rehypePriruckaImages = createRehypePriruckaImages({
    imagesPrefix: options.guideImagesPrefix,
  });
  const rehypePriruckaLinks = createRehypeContentLinks({
    collections: options.collections,
    contentPathPrefix: options.contentPathPrefix,
  });

  const rehypePlugins = [
    rehypeRaw,
    rehypePriruckaImages,
    ...(options.includeEbookOnly ? [rehypeRemoveEbookOnly] : []),
    rehypeConnectedElements,
    rehypeRelatedToInnerBox,
    rehypeHeadingAnchors,
    rehypePriruckaLinks,
    rehypeRemoveFirstH1,
  ];

  return {
    shikiConfig: {
      theme: 'css-variables',
      langAlias: {
        url: 'text',
        terminal: 'text',
        img: 'text',
        htaccess: 'text',
        robotstxt: 'text',
        svg: 'xml',
      },
    },
    remarkPlugins: [
      remarkGfm,
      remarkPriruckaImages,
      remarkNormalizeCodeLang,
      remarkProcessMarkdownAttributes,
    ],
    remarkRehype: {
      allowDangerousHtml: true,
    },
    rehypePlugins,
  };
}
