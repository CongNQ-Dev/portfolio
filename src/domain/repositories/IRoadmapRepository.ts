import type { RoadmapPhase } from "../entities/RoadmapPhase";

/**
 * IRoadmapRepository — contract for reading roadmap phases and their resources.
 */
export interface IRoadmapRepository {
  /** Returns all phases in phase-number order, each including resources. */
  findAll(): Promise<RoadmapPhase[]>;
}
