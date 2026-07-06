import type { IRoadmapRepository } from "../../domain/repositories/IRoadmapRepository";
import type { RoadmapPhase } from "../../domain/entities/RoadmapPhase";

/**
 * getRoadmap — returns all roadmap phases with their learning resources.
 */
export async function getRoadmap(
  repo: IRoadmapRepository
): Promise<RoadmapPhase[]> {
  return repo.findAll();
}
