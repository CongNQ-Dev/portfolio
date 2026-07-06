/**
 * Post — a blog post entry.
 *
 * `publishedAt` is null when the post is a draft and should not appear
 * on the public blog list. `content` stores raw Markdown — the frontend
 * is responsible for converting it to HTML.
 */
export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
