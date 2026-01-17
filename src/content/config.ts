import { defineCollection, z } from 'astro:content';

// Blog collection
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string().default('Martin Michálek'),
    tags: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
  }),
});

// Podcast collection
const podcast = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string().default('Martin Michálek'),
    audioUrl: z.string().optional(),
    tags: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
  }),
});

// Příručka collection
const prirucka = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog,
  podcast,
  prirucka,
};
