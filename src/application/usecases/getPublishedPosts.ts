import type { IPostRepository } from "../../domain/repositories/IPostRepository";
import type { Post } from "../../domain/entities/Post";

/**
 * getPublishedPosts — returns published blog posts, newest first.
 * Draft posts (publishedAt = null) are excluded by the repository.
 */
export async function getPublishedPosts(
  repo: IPostRepository
): Promise<Post[]> {
  return repo.findPublished();
}
