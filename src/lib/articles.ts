import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

/** Published articles, newest first. */
export async function getPublishedArticles(): Promise<Article[]> {
	const articles = await getCollection('articles', ({ data }) => data.published);
	return articles.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Rough reading time from the raw MDX body (~200 wpm). */
export function readingTime(body: string | undefined): string {
	const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
	const minutes = Math.max(1, Math.round(words / 200));
	return `${minutes} min read`;
}

/** Unique tags across articles, preserving first-seen order. */
export function collectTags(articles: Article[]): string[] {
	const seen = new Set<string>();
	for (const a of articles) for (const t of a.data.tags) seen.add(t);
	return [...seen];
}

/** Difficulty → pill colour classes (design tokens). */
export const difficultyBadge: Record<string, string> = {
	beginner: 'bg-primary/10 text-primary',
	intermediate: 'bg-surface-container text-on-surface',
	advanced: 'bg-surface-variant text-on-surface',
};
