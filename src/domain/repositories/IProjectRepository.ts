import type { Project } from "../entities/Project";

/**
 * IProjectRepository — contract for reading portfolio projects.
 */
export interface IProjectRepository {
  /** Returns all projects in display order. */
  findAll(): Promise<Project[]>;

  /** Returns a single project by its slug, or null if not found. */
  findBySlug(slug: string): Promise<Project | null>;
}
