import { Module } from '@nestjs/common';
import { POST_REPOSITORY } from '../tokens';
import { PrismaPostRepository } from '../repositories/prisma-post.repository';
import { PostsService } from '../../application/posts.service';
import { PostsController } from '../../presentation/controllers/posts.controller';

@Module({
  providers: [
    {
      provide: POST_REPOSITORY,
      useClass: PrismaPostRepository,
    },
    PostsService,
  ],
  controllers: [PostsController],
})
export class PostsModule {}
