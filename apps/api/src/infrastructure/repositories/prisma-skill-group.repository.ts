import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { ISkillGroupRepository } from '../../domain/repositories/ISkillGroupRepository';
import type { SkillGroup } from '../../domain/entities/SkillGroup';

@Injectable()
export class PrismaSkillGroupRepository implements ISkillGroupRepository {
  constructor(private readonly db: PrismaService) {}

  async findAll(): Promise<SkillGroup[]> {
    const rows = await this.db.skillGroup.findMany({
      orderBy: { order: 'asc' },
      include: {
        skills: { orderBy: { order: 'asc' } },
      },
    });

    return rows.map((group) => ({
      id: group.id,
      name: group.name,
      order: group.order,
      skills: group.skills.map((s) => ({
        id: s.id,
        name: s.name,
        iconPath: s.iconPath,
        iconBg: s.iconBg,
        iconText: s.iconText,
        iconColor: s.iconColor,
        order: s.order,
      })),
    }));
  }
}
