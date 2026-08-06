import { PrismaClient } from '../generated/prisma';
import { PrismaD1 } from '@prisma/adapter-d1';

/**
 * Create a Prisma client instance bound to the Cloudflare D1 database.
 * Each request gets its own client instance via the D1 adapter.
 */
export function createPrismaClient(d1: D1Database): PrismaClient {
  const adapter = new PrismaD1(d1);
  return new PrismaClient({ adapter } as any);
}
