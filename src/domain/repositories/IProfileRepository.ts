import type { Profile } from "../entities/Profile";

/**
 * IProfileRepository — contract for fetching the portfolio owner's profile.
 *
 * The domain layer defines this interface; the infrastructure layer provides
 * a concrete implementation (PrismaProfileRepository).
 * This separation means you could swap Postgres for a JSON file, an API,
 * or any other source without touching the application or presentation layers.
 */
export interface IProfileRepository {
  /** Returns the single profile record, or null if none exists yet. */
  find(): Promise<Profile | null>;
}
