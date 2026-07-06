import type { IPostRepository } from "../../domain/repositories/IPostRepository";
import type { Post } from "../../domain/entities/Post";

/**
 * getPostBySlug — returns a single published post by its URL slug.
 * Returns null if the post doesn't exist or is a draft.
 */
export async function getPostBySlug(
  repo: IPostRepository,
  slug: string
): Promise<Post | null> {
  return repo.findBySlug(slug);
}
