/**
 * Dependency Injection tokens — used to bind repository interfaces to
 * their concrete implementations via NestJS modules.
 *
 * WHY SYMBOLS: using a Symbol (instead of a string) guarantees uniqueness —
 * two modules can never accidentally share the same token.
 *
 * HOW IT WORKS:
 *   1. Each feature module (infrastructure/modules/*.module.ts) registers a
 *      provider like: { provide: PROFILE_REPOSITORY, useClass: PrismaProfileRepository }
 *   2. The application service receives the implementation via:
 *      @Inject(PROFILE_REPOSITORY) private readonly repo: IProfileRepository
 *
 *   The application service only knows about the IProfileRepository interface —
 *   it never imports PrismaProfileRepository directly. NestJS resolves the token
 *   at startup and injects the right class automatically.
 *
 *   This is the NestJS equivalent of the hand-rolled container.ts from the
 *   single-app era. The difference: NestJS manages the entire object graph,
 *   including lifecycle hooks (OnModuleInit, OnModuleDestroy) and scoping.
 */

export const PROFILE_REPOSITORY = Symbol('IProfileRepository');
export const SKILL_GROUP_REPOSITORY = Symbol('ISkillGroupRepository');
export const PROJECT_REPOSITORY = Symbol('IProjectRepository');
export const ROADMAP_REPOSITORY = Symbol('IRoadmapRepository');
export const POST_REPOSITORY = Symbol('IPostRepository');
