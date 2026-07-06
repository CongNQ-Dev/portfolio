/**
 * RoadmapService — application use case: get all roadmap phases.
 *
 * APPLICATION LAYER RULE: imports only from domain and NestJS decorators.
 */
import { Injectable, Inject } from '@nestjs/common';
import { ROADMAP_REPOSITORY } from '../infrastructure/tokens';
import type { IRoadmapRepository } from '../domain/repositories/IRoadmapRepository';
import type { RoadmapPhase } from '../domain/entities/RoadmapPhase';

@Injectable()
export class RoadmapService {
  constructor(
    @Inject(ROADMAP_REPOSITORY)
    private readonly repo: IRoadmapRepository,
  ) {}

  async getRoadmap(): Promise<RoadmapPhase[]> {
    return this.repo.findAll();
  }
}
