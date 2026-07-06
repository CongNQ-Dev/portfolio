/**
 * ProjectsService — application use cases: list projects / get one by slug.
 *
 * APPLICATION LAYER RULE: imports only from domain and NestJS decorators.
 */
import { Injectable, Inject } from '@nestjs/common';
import { PROJECT_REPOSITORY } from '../infrastructure/tokens';
import type { IProjectRepository } from '../domain/repositories/IProjectRepository';
import type { Project } from '../domain/entities/Project';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly repo: IProjectRepository,
  ) {}

  async getProjects(): Promise<Project[]> {
    return this.repo.findAll();
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    return this.repo.findBySlug(slug);
  }
}
