/**
 * PrismaProfileRepository — concrete implementation of IProfileRepository.
 *
 * INFRASTRUCTURE LAYER: this is the only file in the chain allowed to
 * import PrismaService (and thus use Prisma). The domain and application
 * layers never reach into here — they only know about IProfileRepository.
 *
 * @Injectable() makes this class available to NestJS DI. It is bound to the
 * PROFILE_REPOSITORY token inside ProfileModule, NOT imported directly.
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { IProfileRepository } from '../../domain/repositories/IProfileRepository';
import type { Profile } from '../../domain/entities/Profile';

@Injectable()
export class PrismaProfileRepository implements IProfileRepository {
  constructor(private readonly db: PrismaService) {}

  async find(): Promise<Profile | null> {
    const row = await this.db.profile.findFirst();
    if (!row) return null;

    // Explicit mapping: Prisma row → domain entity.
    // If a DB column is ever renamed, you fix it here — nowhere else.
    return {
      id: row.id,
      name: row.name,
      title: row.title,
      yearsExp: row.yearsExp,
      email: row.email,
      github: row.github,
      linkedin: row.linkedin,
      quote: row.quote,
    };
  }
}
