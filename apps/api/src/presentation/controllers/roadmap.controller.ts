import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoadmapService } from '../../application/roadmap.service';

@ApiTags('roadmap')
@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Get()
  @ApiOperation({ summary: 'Get all roadmap phases with their learning resources' })
  async getRoadmap() {
    return this.roadmapService.getRoadmap();
  }
}
