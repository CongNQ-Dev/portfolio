/**
 * PrismaModule — provides PrismaService to the entire application.
 *
 * @Global() means this module is registered once at the root level and its
 * exports are available everywhere without re-importing. Any module that
 * needs PrismaService (all repository modules) gets it automatically.
 */
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
