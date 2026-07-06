import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { IRoadmapRepository } from '../../domain/repositories/IRoadmapRepository';
import type { RoadmapPhase, ResourceType } from '../../domain/entities/RoadmapPhase';

@Injectable()
export class PrismaRoadmapRepository implements IRoadmapRepository {
  constructor(private readonly db: PrismaService) {}

  async findAll(): Promise<RoadmapPhase[]> {
    const rows = await this.db.roadmapPhase.findMany({
      orderBy: { number: 'asc' },
      include: {
        resources: { orderBy: { order: 'asc' } },
      },
    });

    return rows.map((phase) => ({
      id: phase.id,
      number: phase.number,
      eta: phase.eta,
      title: phase.title,
      goal: phase.goal,
      tags: phase.tags,
      milestone: phase.milestone,
      resources: phase.resources.map((r) => ({
        id: r.id,
        dataId: r.dataId,
        type: r.type as ResourceType,
        title: r.title,
        url: r.url,
        source: r.source,
        order: r.order,
      })),
    }));
  }
}
