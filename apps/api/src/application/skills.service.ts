/**
 * SkillsService — application use case: get all skill groups with their skills.
 *
 * APPLICATION LAYER RULE: imports only from domain and NestJS decorators.
 */
import { Injectable, Inject } from '@nestjs/common';
import { SKILL_GROUP_REPOSITORY } from '../infrastructure/tokens';
import type { ISkillGroupRepository } from '../domain/repositories/ISkillGroupRepository';
import type { SkillGroup } from '../domain/entities/SkillGroup';

@Injectable()
export class SkillsService {
  constructor(
    @Inject(SKILL_GROUP_REPOSITORY)
    private readonly repo: ISkillGroupRepository,
  ) {}

  async getSkillGroups(): Promise<SkillGroup[]> {
    return this.repo.findAll();
  }
}
