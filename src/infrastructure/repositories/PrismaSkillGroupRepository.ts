import type { PrismaClient } from "@prisma/client";
import type { ISkillGroupRepository } from "../../domain/repositories/ISkillGroupRepository";
import type { SkillGroup } from "../../domain/entities/SkillGroup";

export class PrismaSkillGroupRepository implements ISkillGroupRepository {
  constructor(private readonly db: PrismaClient) {}

  async findAll(): Promise<SkillGroup[]> {
    const rows = await this.db.skillGroup.findMany({
      orderBy: { order: "asc" },
      include: {
        skills: { orderBy: { order: "asc" } },
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
