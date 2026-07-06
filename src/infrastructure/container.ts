/**
 * Composition Root — the single place where interfaces are wired to implementations.
 *
 * WHY THIS MATTERS (dependency inversion):
 *   The application and domain layers never import Prisma directly.
 *   They only depend on repository interfaces (contracts).
 *   Here in the infrastructure layer we satisfy those contracts by
 *   creating concrete repository instances with a real Prisma client.
 *
 *   If you ever want to replace Postgres with a different storage backend,
 *   you write a new repository class and swap it here — zero changes in
 *   application/ or domain/.
 *
 * USAGE in route files (app/):
 *   import { projectRepository } from '@/infrastructure/container';
 *   const projects = await getProjects(projectRepository);
 */
import { prisma } from "./prisma/client";
import { PrismaProfileRepository } from "./repositories/PrismaProfileRepository";
import { PrismaSkillGroupRepository } from "./repositories/PrismaSkillGroupRepository";
import { PrismaProjectRepository } from "./repositories/PrismaProjectRepository";
import { PrismaRoadmapRepository } from "./repositories/PrismaRoadmapRepository";
import { PrismaPostRepository } from "./repositories/PrismaPostRepository";

export const profileRepository = new PrismaProfileRepository(prisma);
export const skillGroupRepository = new PrismaSkillGroupRepository(prisma);
export const projectRepository = new PrismaProjectRepository(prisma);
export const roadmapRepository = new PrismaRoadmapRepository(prisma);
export const postRepository = new PrismaPostRepository(prisma);
