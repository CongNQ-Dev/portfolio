/**
 * ProfileService — application use case: get the portfolio owner's profile.
 *
 * APPLICATION LAYER RULE: this service only imports from the domain layer
 * and from NestJS decorators. No Prisma, no HTTP — just business logic.
 *
 * HOW DEPENDENCY INJECTION WORKS HERE:
 *   The @Inject(PROFILE_REPOSITORY) decorator tells NestJS: "when constructing
 *   this class, look up the PROFILE_REPOSITORY token in the DI container and
 *   inject whatever value is registered there."
 *
 *   The registration happens in infrastructure/modules/profile.module.ts:
 *     { provide: PROFILE_REPOSITORY, useClass: PrismaProfileRepository }
 *
 *   This is the NestJS equivalent of the old container.ts composition root —
 *   the service only knows about the IProfileRepository interface, never about
 *   the Prisma implementation. Swapping the data source means changing ONE line
 *   in the module, not in the service.
 */
import { Injectable, Inject } from '@nestjs/common';
import { PROFILE_REPOSITORY } from '../infrastructure/tokens';
import type { IProfileRepository } from '../domain/repositories/IProfileRepository';
import type { Profile } from '../domain/entities/Profile';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(PROFILE_REPOSITORY)
    private readonly repo: IProfileRepository,
  ) {}

  async getProfile(): Promise<Profile | null> {
    return this.repo.find();
  }
}
