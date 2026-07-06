/**
 * Prisma Client Singleton — infrastructure layer.
 *
 * WHY: Next.js runs in dev mode with Hot Module Replacement (HMR).
 * Each HMR cycle would create a new PrismaClient instance, eventually
 * exhausting the Postgres connection pool.
 *
 * FIX: We store one instance on `globalThis` so it survives HMR.
 * In production there is no HMR, so a fresh instance is created once
 * and reused for the lifetime of the process.
 *
 * This file is the ONLY place in the codebase that imports PrismaClient.
 * Every other file goes through the container (src/infrastructure/container.ts).
 */
import { PrismaClient } from "@prisma/client";

// Extend the global type so TypeScript knows the shape.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
