/**
 * PrismaProfileRepository — concrete implementation of IProfileRepository.
 *
 * This class lives in the infrastructure layer because it has a direct
 * dependency on Prisma (a framework). The domain and application layers
 * never import from here — they only know about the IProfileRepository interface.
 */
import type { PrismaClient } from "@prisma/client";
import type { IProfileRepository } from "../../domain/repositories/IProfileRepository";
import type { Profile } from "../../domain/entities/Profile";

export class PrismaProfileRepository implements IProfileRepository {
  // Inject the Prisma client; makes this class testable with a mock client.
  constructor(private readonly db: PrismaClient) {}

  async find(): Promise<Profile | null> {
    const row = await this.db.profile.findFirst();
    if (!row) return null;

    // Map the Prisma model (database row) → domain entity.
    // If you ever rename a DB column, you fix it here — nowhere else.
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
