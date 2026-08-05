import { Hono } from 'hono';
import { AppEnv } from '../types/hono';

const neighborhoods = new Hono<AppEnv>();

// Get neighborhood eco leaderboard stats
neighborhoods.get('/stats', async (c) => {
  const prisma = c.get('prisma');
  try {
    const stats = await (prisma as any).neighborhoodStats.findMany({
      orderBy: { ecoPoints: 'desc' },
    });
    return c.json({ stats });
  } catch (error) {
    console.error('Get neighborhood stats error:', error);
    return c.json({ error: 'Failed to fetch neighborhood stats' }, 500);
  }
});

export default neighborhoods;
