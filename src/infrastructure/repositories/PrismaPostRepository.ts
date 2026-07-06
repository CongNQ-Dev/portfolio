import type { PrismaClient } from "@prisma/client";
import type { IPostRepository } from "../../domain/repositories/IPostRepository";
import type { Post } from "../../domain/entities/Post";

export class PrismaPostRepository implements IPostRepository {
  constructor(private readonly db: PrismaClient) {}

  async findPublished(): Promise<Post[]> {
    const rows = await this.db.post.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: "desc" },
    });
    return rows.map(toPost);
  }

  async findBySlug(slug: string): Promise<Post | null> {
    const row = await this.db.post.findFirst({
      where: { slug, publishedAt: { not: null } },
    });
    return row ? toPost(row) : null;
  }
}

function toPost(row: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}): Post {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    tags: row.tags,
    publishedAt: row.publishedAt,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}
