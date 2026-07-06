/**
 * PrismaService — the single Prisma client instance for the entire application.
 *
 * WHY extends PrismaClient:
 *   By extending PrismaClient, PrismaService inherits all of its methods
 *   (prisma.profile.findFirst(), prisma.project.findMany(), etc.) while also
 *   being a NestJS injectable. Repository classes can type-hint against
 *   PrismaService and receive the full Prisma API.
 *
 * Lifecycle hooks:
 *   onModuleInit  — connects to Postgres when the NestJS app starts.
 *   onModuleDestroy — disconnects cleanly when the app shuts down (Ctrl+C).
 *
 * WHY NOT a singleton globalThis pattern (like the old client.ts):
 *   NestJS manages its own module lifecycle so we don't need the HMR workaround
 *   from the Next.js codebase. NestJS creates exactly one instance per module
 *   scope, so there is no risk of connection pool exhaustion.
 */
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log:
        process.env.NODE_ENV === 'development'
          ? ['error', 'warn']
          : ['error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
