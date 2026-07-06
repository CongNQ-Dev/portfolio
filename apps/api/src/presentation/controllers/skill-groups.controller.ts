import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkillsService } from '../../application/skills.service';

@ApiTags('skills')
@Controller('skill-groups')
export class SkillGroupsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all skill groups with their skills' })
  async getSkillGroups() {
    return this.skillsService.getSkillGroups();
  }
}
