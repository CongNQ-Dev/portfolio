import { Module } from '@nestjs/common';
import { PROJECT_REPOSITORY } from '../tokens';
import { PrismaProjectRepository } from '../repositories/prisma-project.repository';
import { ProjectsService } from '../../application/projects.service';
import { ProjectsController } from '../../presentation/controllers/projects.controller';

@Module({
  providers: [
    {
      provide: PROJECT_REPOSITORY,
      useClass: PrismaProjectRepository,
    },
    ProjectsService,
  ],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
