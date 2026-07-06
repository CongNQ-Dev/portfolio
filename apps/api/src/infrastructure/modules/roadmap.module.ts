import { Module } from '@nestjs/common';
import { ROADMAP_REPOSITORY } from '../tokens';
import { PrismaRoadmapRepository } from '../repositories/prisma-roadmap.repository';
import { RoadmapService } from '../../application/roadmap.service';
import { RoadmapController } from '../../presentation/controllers/roadmap.controller';

@Module({
  providers: [
    {
      provide: ROADMAP_REPOSITORY,
      useClass: PrismaRoadmapRepository,
    },
    RoadmapService,
  ],
  controllers: [RoadmapController],
})
export class RoadmapModule {}
