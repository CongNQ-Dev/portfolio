import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PostsService } from '../../application/posts.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all published blog posts, newest first' })
  async getPosts() {
    return this.postsService.getPublishedPosts();
  }

  @Get(':slug')
  @ApiParam({ name: 'slug', description: 'URL-safe post identifier' })
  @ApiOperation({ summary: 'Get a single published post by slug' })
  async getPostBySlug(@Param('slug') slug: string) {
    const post = await this.postsService.getPostBySlug(slug);
    if (!post) {
      throw new NotFoundException(`Post with slug "${slug}" not found or is a draft.`);
    }
    return post;
  }
}
