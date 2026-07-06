import type { SkillGroup } from "../entities/SkillGroup";

/**
 * ISkillGroupRepository — contract for reading skill groups and their skills.
 */
export interface ISkillGroupRepository {
  /** Returns all skill groups, ordered, each including their child skills. */
  findAll(): Promise<SkillGroup[]>;
}
