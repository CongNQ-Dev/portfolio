import { Module } from '@nestjs/common';
import { SKILL_GROUP_REPOSITORY } from '../tokens';
import { PrismaSkillGroupRepository } from '../repositories/prisma-skill-group.repository';
import { SkillsService } from '../../application/skills.service';
import { SkillGroupsController } from '../../presentation/controllers/skill-groups.controller';

@Module({
  providers: [
    {
      provide: SKILL_GROUP_REPOSITORY,
      useClass: PrismaSkillGroupRepository,
    },
    SkillsService,
  ],
  controllers: [SkillGroupsController],
})
export class SkillsModule {}
