import type { IProjectRepository } from "../../domain/repositories/IProjectRepository";
import type { Project } from "../../domain/entities/Project";

/**
 * getProjects — returns all portfolio projects in display order.
 */
export async function getProjects(
  repo: IProjectRepository
): Promise<Project[]> {
  return repo.findAll();
}
