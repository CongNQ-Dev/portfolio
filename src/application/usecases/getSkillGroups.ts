import type { ISkillGroupRepository } from "../../domain/repositories/ISkillGroupRepository";
import type { SkillGroup } from "../../domain/entities/SkillGroup";

/**
 * getSkillGroups — returns all skill groups with their nested skills.
 */
export async function getSkillGroups(
  repo: ISkillGroupRepository
): Promise<SkillGroup[]> {
  return repo.findAll();
}
