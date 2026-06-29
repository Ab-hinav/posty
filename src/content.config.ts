import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Articles collection — Astro 5 Content Layer API via the glob() loader.
const articles = defineCollection({
	loader: glob({ base: './src/content/articles', pattern: '**/*.mdx' }),
	schema: z.object({
		title: z.string().max(70),
		description: z.string().min(50).max(160),
		date: z.coerce.date(),
		// Coerced (not plain z.date()) so quoted-string frontmatter dates parse.
		updated: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
		difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
		type: z.enum(['case-study', 'tutorial', 'field-note', 'ai-workflow']),
		repo: z.url().optional(),
		published: z.boolean().default(false),
	}),
});

export const collections = { articles };
