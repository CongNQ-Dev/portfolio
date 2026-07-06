/**
 * AppModule — the root NestJS module.
 *
 * Imports:
 *  - ConfigModule  : loads .env into process.env (isGlobal = available everywhere)
 *  - PrismaModule  : provides PrismaService globally (no re-import needed)
 *  - Feature modules: each module owns one domain area — its controller,
 *    application service, and repository binding (see infrastructure/modules/)
 */
import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { ProfileModule } from './infrastructure/modules/profile.module';
import { SkillsModule } from './infrastructure/modules/skills.module';
import { ProjectsModule } from './infrastructure/modules/projects.module';
import { RoadmapModule } from './infrastructure/modules/roadmap.module';
import { PostsModule } from './infrastructure/modules/posts.module';

@Module({
  imports: [
    // ConfigModule makes process.env values available via ConfigService
    // throughout the whole application without importing again.
    ConfigModule.forRoot({
      isGlobal: true,
      // Resolve .env relative to this file so it works regardless of CWD.
      envFilePath: path.join(__dirname, '..', '.env'),
    }),

    // PrismaModule is @Global() so all feature modules can use PrismaService
    // without explicitly importing PrismaModule themselves.
    PrismaModule,

    // Feature modules — each is a self-contained slice of the application.
    ProfileModule,
    SkillsModule,
    ProjectsModule,
    RoadmapModule,
    PostsModule,
  ],
})
export class AppModule {}
