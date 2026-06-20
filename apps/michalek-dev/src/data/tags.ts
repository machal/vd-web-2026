import type { CategoryConfig } from '@vd/shared/types';

/** EN tag taxonomy — slugs match front matter `tags` on pilot articles. */
export const tags: CategoryConfig[] = [
  {
    slug: 'ai',
    title: 'AI',
    description: 'Articles on artificial intelligence, vibe coding, and how AI changes development work.',
    hasTOC: false,
    tags: ['ai'],
  },
  {
    slug: 'business',
    title: 'Business',
    description: 'Consulting, SaaS, and lessons from running a small web performance practice.',
    hasTOC: false,
    tags: ['business'],
  },
  {
    slug: 'consulting',
    title: 'Consulting',
    description: 'When to hire consultants, how to scope performance work, and what good advice costs.',
    hasTOC: false,
    tags: ['consulting'],
  },
  {
    slug: 'development',
    title: 'Development',
    description: 'How developers work today — tooling, workflows, and craft.',
    hasTOC: false,
    tags: ['development'],
  },
  {
    slug: 'email',
    title: 'Email',
    description: 'Inbox habits, async communication, and staying focused.',
    hasTOC: false,
    tags: ['email'],
  },
  {
    slug: 'images',
    title: 'Images',
    description: 'Modern image formats, compression, and delivery on the web.',
    hasTOC: false,
    tags: ['images'],
  },
  {
    slug: 'performance',
    title: 'Performance',
    description: 'Web performance metrics, optimization, and why speed matters for users and business.',
    hasTOC: false,
    tags: ['performance'],
  },
  {
    slug: 'personal',
    title: 'Personal',
    description: 'Year-in-review notes and reflections on work and life.',
    hasTOC: false,
    tags: ['personal'],
  },
  {
    slug: 'productivity',
    title: 'Productivity',
    description: 'Focus, saying no, and sustainable work habits.',
    hasTOC: false,
    tags: ['productivity'],
  },
  {
    slug: 'saas',
    title: 'SaaS',
    description: 'Software as a service — product thinking and what AI might change.',
    hasTOC: false,
    tags: ['saas'],
  },
  {
    slug: 'seo',
    title: 'SEO',
    description: 'Search, Core Web Vitals, and how performance ties into discoverability.',
    hasTOC: false,
    tags: ['seo'],
  },
  {
    slug: 'soft-skills',
    title: 'Soft skills',
    description: 'Communication, boundaries, and the non-technical side of a technical career.',
    hasTOC: false,
    tags: ['soft-skills'],
  },
  {
    slug: 'vibe-coding',
    title: 'Vibe coding',
    description: 'AI-assisted development — when it helps, when it hurts, and how to stay in control.',
    hasTOC: false,
    tags: ['vibe-coding'],
  },
  {
    slug: 'web-design',
    title: 'Web design',
    description: 'Design decisions, budgets, and the trade-offs behind good websites.',
    hasTOC: false,
    tags: ['web-design'],
  },
  {
    slug: 'web-vitals',
    title: 'Web Vitals',
    description: 'LCP, INP, CLS, and measuring real-user experience.',
    hasTOC: false,
    tags: ['web-vitals'],
  },
  {
    slug: 'webp',
    title: 'WebP',
    description: 'WebP images — savings, fallbacks, and when the format pays off.',
    hasTOC: false,
    tags: ['webp'],
  },
  {
    slug: 'year-in-review',
    title: 'Year in review',
    description: 'Annual retrospectives on projects, learning, and what comes next.',
    hasTOC: false,
    tags: ['year-in-review'],
  },
];

export function getTagBySlug(slug: string): CategoryConfig | undefined {
  return tags.find((tag) => tag.slug === slug);
}

export function getTagsForArticle(articleTags: string[]): CategoryConfig[] {
  if (!articleTags.length) return [];
  return tags.filter((tag) => tag.tags.some((t) => articleTags.includes(t)));
}
