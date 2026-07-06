import type { Profile } from '../entities/Profile';

/**
 * IProfileRepository — contract for fetching the portfolio owner's profile.
 *
 * DOMAIN LAYER RULE: this interface has zero framework imports.
 * The infrastructure layer provides a concrete NestJS-injectable implementation
 * (PrismaProfileRepository) that satisfies this contract.
 *
 * Depending on an interface rather than a concrete class means you can swap
 * Postgres for a JSON file, a remote API, or a test stub without touching
 * the application layer at all.
 */
export interface IProfileRepository {
  /** Returns the single profile record, or null if none exists yet. */
  find(): Promise<Profile | null>;
}
