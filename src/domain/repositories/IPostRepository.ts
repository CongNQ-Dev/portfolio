import type { Post } from "../entities/Post";

/**
 * IPostRepository — contract for reading blog posts.
 */
export interface IPostRepository {
  /**
   * Returns all posts where publishedAt is not null, newest first.
   * Draft posts (publishedAt = null) are excluded.
   */
  findPublished(): Promise<Post[]>;

  /** Returns a single published post by slug, or null. */
  findBySlug(slug: string): Promise<Post | null>;
}
