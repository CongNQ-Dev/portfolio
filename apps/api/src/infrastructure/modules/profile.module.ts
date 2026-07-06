/**
 * ProfileModule — the NestJS composition root for the profile feature.
 *
 * THIS IS WHERE DEPENDENCY INVERSION IS RESOLVED.
 *
 * It wires three things together:
 *   1. PROFILE_REPOSITORY token → PrismaProfileRepository implementation
 *   2. ProfileService (application layer) — gets the repository via the token
 *   3. ProfileController (presentation layer) — gets the service via DI
 *
 * Compare to the old container.ts approach:
 *   OLD:  export const profileRepository = new PrismaProfileRepository(prisma);
 *   NEW:  { provide: PROFILE_REPOSITORY, useClass: PrismaProfileRepository }
 *
 * The difference: NestJS manages instantiation, lifecycle, and scope.
 * You never call `new` manually — the framework does it.
 */
import { Module } from '@nestjs/common';
import { PROFILE_REPOSITORY } from '../tokens';
import { PrismaProfileRepository } from '../repositories/prisma-profile.repository';
import { ProfileService } from '../../application/profile.service';
import { ProfileController } from '../../presentation/controllers/profile.controller';

@Module({
  providers: [
    // Bind the interface token to the concrete Prisma implementation.
    // Any class in this module that @Inject(PROFILE_REPOSITORY) will receive
    // a PrismaProfileRepository instance.
    {
      provide: PROFILE_REPOSITORY,
      useClass: PrismaProfileRepository,
    },
    ProfileService,
  ],
  controllers: [ProfileController],
})
export class ProfileModule {}
