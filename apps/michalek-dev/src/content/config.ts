import { defineCollection, z } from 'astro:content';

const adaptedFromSchema = z.object({
  title: z.string(),
  url: z.string().url(),
}).optional();

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional().default(''),
    date: z.union([z.string(), z.date()]).transform((val) => {
      if (typeof val === 'string') {
        return new Date(val.trim());
      }
      return val;
    }),
    author: z.string().optional().default('Martin Michálek'),
    tags: z.array(z.string()).optional().default([]),
    published: z.union([z.boolean(), z.string()]).optional().default(true),
    ogImage: z.string().optional(),
    pairId: z.string().optional(),
    adaptedFrom: adaptedFromSchema,
  }).transform((data) => ({
    ...data,
    published: data.published !== false && data.published !== 'false',
  })),
});

const guide = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional().default(''),
    date: z.union([z.string(), z.date()]).optional().transform((val) => {
      if (!val) return undefined;
      if (typeof val === 'string') {
        const dateStr = val.trim();
        if (dateStr === '') return undefined;
        return new Date(dateStr);
      }
      return val;
    }),
    published: z.union([z.boolean(), z.string()]).optional(),
    tags: z.array(z.string()).optional().default([]),
    heading: z.string().optional(),
    perex: z.string().optional(),
    pairId: z.string().optional(),
    author: z.string().optional().default('Martin Michálek'),
    adaptedFrom: adaptedFromSchema,
  }).transform((data) => {
    const title = data.title || (data.heading?.trim() ? data.heading : data.id) || '';
    const published = typeof data.published === 'boolean'
      ? data.published
      : data.published === 'Publikováno' || data.published === 'true' || data.published === true;
    return {
      ...data,
      title,
      description: data.description || data.perex || '',
      tags: data.tags || [],
      published: published !== false,
    };
  }),
});

export const collections = {
  blog,
  guide,
};
