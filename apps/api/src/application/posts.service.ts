/**
 * PostsService — application use cases: list published posts / get one by slug.
 *
 * APPLICATION LAYER RULE: imports only from domain and NestJS decorators.
 */
import { Injectable, Inject } from '@nestjs/common';
import { POST_REPOSITORY } from '../infrastructure/tokens';
import type { IPostRepository } from '../domain/repositories/IPostRepository';
import type { Post } from '../domain/entities/Post';

@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly repo: IPostRepository,
  ) {}

  async getPublishedPosts(): Promise<Post[]> {
    return this.repo.findPublished();
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    return this.repo.findBySlug(slug);
  }
}
