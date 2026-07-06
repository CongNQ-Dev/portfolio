/**
 * getProfile — application use case.
 *
 * USE CASE LAYER RULE: this file may only import from the domain layer.
 * No Prisma, no Next.js, no React — just pure business logic.
 *
 * The repository is passed in as a dependency (dependency injection).
 * This makes the use case trivially testable: swap in a fake repository
 * and call the function — no database or framework needed.
 *
 * Data flow:
 *   Route (app/) → use case (here) → repository interface (domain/)
 *                                   ↑ implemented by infrastructure/
 */
import type { IProfileRepository } from "../../domain/repositories/IProfileRepository";
import type { Profile } from "../../domain/entities/Profile";

export async function getProfile(
  repo: IProfileRepository
): Promise<Profile | null> {
  return repo.find();
}
