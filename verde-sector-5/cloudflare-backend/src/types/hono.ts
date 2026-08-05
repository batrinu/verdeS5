import { PrismaClient } from '../generated/prisma';

export type Bindings = {
  DB: D1Database;
  PHOTOS: R2Bucket;
  JWT_SECRET: string;
  ENVIRONMENT?: string;
};

export type UserContext = {
  id: string;
  email: string;
  role: string;
  name?: string;
};

export type Variables = {
  user: UserContext;
  prisma: PrismaClient;
};

export type AppEnv = {
  Bindings: Bindings;
  Variables: Variables;
};
