import { defineCollection, z } from 'astro:content';

// Blog collection - struktura odpovídá exportovaným souborům
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    postID: z.number().optional(),
    postTitle: z.string(),
    postUrlId: z.string().optional(),
    postDateTime: z.union([z.string(), z.date()]).optional().transform((val) => {
      if (!val) return undefined;
      if (typeof val === 'string') {
        const dateStr = val.trim();
        if (dateStr === '') return undefined;
        return new Date(dateStr);
      }
      return val;
    }),
    excerpt: z.string().optional(),
    postStatus: z.string().optional(),
    authorID: z.number().optional(),
    sectionID: z.number().optional(),
    category: z.array(z.string()).optional().default([]),
    no_ads: z.union([z.boolean(), z.string()]).optional(),
    include_rss: z.union([z.boolean(), z.string()]).optional(),
    category_highlight: z.union([z.boolean(), z.string()]).optional(),
    og_title: z.string().optional(),
    og_description: z.string().optional(),
    og_image: z.string().optional(),
    og_type: z.string().optional(),
    // Pro zpětnou kompatibilitu a snadnější použití
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.union([z.string(), z.date()]).optional().transform((val) => {
      if (!val) return undefined;
      if (typeof val === 'string') {
        const dateStr = val.trim();
        if (dateStr === '') return undefined;
        return new Date(dateStr);
      }
      return val;
    }),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
    published: z.union([z.boolean(), z.string()]).optional(),
  }).transform((data) => {
    // Mapování na standardní pole pro snadnější použití
    const dateValue = data.date || data.postDateTime;
    return {
      ...data,
      title: data.title || data.postTitle,
      description: data.description || data.excerpt || '',
      date: dateValue,
      author: data.author || 'Martin Michálek',
      tags: data.tags || data.category || [],
      ogImage: data.ogImage || data.og_image,
      published: data.published !== false && data.postStatus !== 'Draft',
    };
  }),
});

// Podcast collection - podobná struktura jako blog
const podcast = defineCollection({
  type: 'content',
  schema: z.object({
    postID: z.number().optional(),
    postTitle: z.string(),
    postUrlId: z.string().optional(),
    postDateTime: z.union([z.string(), z.date()]).optional().transform((val) => {
      if (!val) return undefined;
      if (typeof val === 'string') {
        const dateStr = val.trim();
        if (dateStr === '') return undefined;
        return new Date(dateStr);
      }
      return val;
    }),
    excerpt: z.string().optional(),
    postStatus: z.string().optional(),
    authorID: z.number().optional(),
    sectionID: z.number().optional(),
    category: z.array(z.string()).optional().default([]),
    no_ads: z.union([z.boolean(), z.string()]).optional(),
    include_rss: z.union([z.boolean(), z.string()]).optional(),
    category_highlight: z.union([z.boolean(), z.string()]).optional(),
    og_title: z.string().optional(),
    og_description: z.string().optional(),
    og_image: z.string().optional(),
    og_type: z.string().optional(),
    audioUrl: z.string().optional(),
    // Pro zpětnou kompatibilitu
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.union([z.string(), z.date()]).optional().transform((val) => {
      if (!val) return undefined;
      if (typeof val === 'string') {
        const dateStr = val.trim();
        if (dateStr === '') return undefined;
        return new Date(dateStr);
      }
      return val;
    }),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
    published: z.union([z.boolean(), z.string()]).optional(),
  }).transform((data) => {
    const dateValue = data.date || data.postDateTime;
    return {
      ...data,
      title: data.title || data.postTitle,
      description: data.description || data.excerpt || '',
      date: dateValue,
      author: data.author || 'Martin Michálek',
      tags: data.tags || data.category || [],
      ogImage: data.ogImage || data.og_image,
      published: data.published !== false && data.postStatus !== 'Draft',
    };
  }),
});

// Příručka collection - struktura odpovídá exportovaným souborům
const prirucka = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    heading: z.string().optional(),
    slug: z.string().optional(),
    date: z.union([z.string(), z.date()]).optional().transform((val) => {
      if (!val) return undefined;
      if (typeof val === 'string') {
        const dateStr = val.trim();
        if (dateStr === '') return undefined;
        return new Date(dateStr);
      }
      return val;
    }),
    perex: z.string().optional(),
    published: z.union([z.boolean(), z.string()]).optional(),
    category: z.array(z.string()).optional().default([]),
    category_highlight: z.union([z.boolean(), z.string()]).optional(),
    include_rss: z.union([z.boolean(), z.string()]).optional(),
    no_ads: z.union([z.boolean(), z.string()]).optional(),
    og_title: z.string().optional(),
    og_description: z.string().optional(),
    og_type: z.string().optional(),
    // Pro zpětnou kompatibilitu
    title: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }).transform((data) => {
    // Pokud je heading prázdný, použijeme id nebo title
    const title = data.title || (data.heading && data.heading.trim() !== '' ? data.heading : data.id) || data.id;
    const published = typeof data.published === 'boolean' ? data.published : data.published === 'Publikováno' || data.published === true;
    return {
      ...data,
      title: title,
      description: data.description || (data.perex && data.perex.trim() !== '' ? data.perex : '') || '',
      tags: data.tags || data.category || [],
      published: published,
    };
  }),
});

export const collections = {
  blog,
  podcast,
  prirucka,
};
