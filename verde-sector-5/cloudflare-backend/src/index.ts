import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import reportRoutes from './routes/reports';
import treeRoutes from './routes/trees';
import greenSpaceRoutes from './routes/green-spaces';
import campaignRoutes from './routes/campaigns';
import uploadRoutes from './routes/upload';
import analyticsRoutes from './routes/analytics';
import notificationRoutes from './routes/notifications';
import alertRoutes from './routes/alerts';
import neighborhoodRoutes from './routes/neighborhoods';
import rewardRoutes from './routes/rewards';
import { createPrismaClient } from './lib/prisma';

// Extend Hono context with our bindings and variables
type Bindings = {
  DB: D1Database;
  PHOTOS: R2Bucket;
  JWT_SECRET: string;
  ENVIRONMENT?: string;
};

type Variables = {
  user?: {
    id: string;
    email: string;
    role: string;
  };
  prisma: any;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Global middleware
app.use('*', logger());
app.use('*', secureHeaders());
app.use('*', cors({
  origin: ['http://localhost:3000', 'https://verde-sector5.ro', 'https://staging.verde-sector5.ro', 'https://verde-sector-5.pages.dev'],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400,
}));

// Initialize Prisma client for each request using D1
app.use('*', async (c, next) => {
  const prisma = createPrismaClient(c.env.DB);
  c.set('prisma', prisma);
  
  try {
    await next();
  } finally {
    await prisma.$disconnect();
  }
});

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: c.env?.ENVIRONMENT || 'development',
  });
});

// API routes
app.route('/api/v1/auth', authRoutes);
app.route('/api/v1/users', userRoutes);
app.route('/api/v1/reports', reportRoutes);
app.route('/api/v1/trees', treeRoutes);
app.route('/api/v1/green-spaces', greenSpaceRoutes);
app.route('/api/v1/campaigns', campaignRoutes);
app.route('/api/v1/upload', uploadRoutes);
app.route('/api/v1/analytics', analyticsRoutes);
app.route('/api/v1/notifications', notificationRoutes);
app.route('/api/v1/alerts', alertRoutes);
app.route('/api/v1/neighborhoods', neighborhoodRoutes);
app.route('/api/v1/rewards', rewardRoutes);

// Error handling
app.onError((err, c) => {
  console.error('Error:', err);
  
  if (err.name === 'UnauthorizedError') {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  if (err.name === 'ValidationError') {
    return c.json({ error: err.message }, 400);
  }
  
  return c.json({ error: 'Internal server error' }, 500);
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404);
});

export default app;
