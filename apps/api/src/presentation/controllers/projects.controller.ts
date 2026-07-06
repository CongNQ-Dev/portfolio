import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from '../../application/projects.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all portfolio projects in display order' })
  async getProjects() {
    return this.projectsService.getProjects();
  }

  @Get(':slug')
  @ApiParam({ name: 'slug', description: 'URL-safe project identifier' })
  @ApiOperation({ summary: 'Get a single project by slug' })
  async getProjectBySlug(@Param('slug') slug: string) {
    const project = await this.projectsService.getProjectBySlug(slug);
    if (!project) {
      throw new NotFoundException(`Project with slug "${slug}" not found.`);
    }
    return project;
  }
}
