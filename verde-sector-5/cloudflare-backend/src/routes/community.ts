import { Hono } from 'hono';
import { AppEnv } from '../types/hono';

async function activeChallenge(prisma: any) {
  const now = new Date();
  const all = await prisma.challenge.findMany({ include: { sponsor: { select: { name: true, slug: true } } } });
  return all.find((ch: any) => new Date(ch.startsAt) <= now && now <= new Date(ch.endsAt)) ?? null;
}

export const leaderboard = new Hono<AppEnv>();

leaderboard.get('/', async (c) => {
  const prisma = c.get('prisma');
  const scope = c.req.query('scope') === 'users' ? 'users' : 'neighborhoods';
  try {
    const challenge = await activeChallenge(prisma);
    const window = challenge
      ? { startsAt: challenge.startsAt, endsAt: challenge.endsAt }
      : null;
    const loggedAtFilter = window
      ? { loggedAt: { gte: new Date(window.startsAt), lte: new Date(window.endsAt) } }
      : {};

    if (scope === 'neighborhoods') {
      // Group waterings by the TREE's neighborhood (spec §5 note).
      const logs = await prisma.wateringLog.findMany({
        where: loggedAtFilter,
        include: { tree: { select: { neighborhood: true } } },
      });
      const counts = new Map<string, number>();
      for (const log of logs) {
        const hood = log.tree?.neighborhood ?? 'Sector 5';
        counts.set(hood, (counts.get(hood) ?? 0) + 1);
      }
      const entries = [...counts.entries()]
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .map((e, i) => ({ rank: i + 1, ...e }));
      return c.json({ scope, window, entries });
    }

    // users: positive points earned in window
    const createdAtFilter = window
      ? { createdAt: { gte: new Date(window.startsAt), lte: new Date(window.endsAt) } }
      : {};
    const events = await prisma.pointsEvent.findMany({
      where: { points: { gt: 0 }, ...createdAtFilter },
      include: { user: { select: { name: true, email: true } } },
    });
    const byUser = new Map<string, { name: string; value: number }>();
    for (const ev of events) {
      const key = ev.userId;
      const name = ev.user?.name || ev.user?.email || 'Cetățean';
      const prev = byUser.get(key) ?? { name, value: 0 };
      byUser.set(key, { name, value: prev.value + ev.points });
    }
    const entries = [...byUser.values()]
      .sort((a, b) => b.value - a.value)
      .slice(0, 20)
      .map((e, i) => ({ rank: i + 1, ...e }));
    return c.json({ scope, window, entries });
  } catch (error) {
    console.error('Leaderboard error:', error);
    return c.json({ error: 'Failed to build leaderboard' }, 500);
  }
});

export const challenges = new Hono<AppEnv>();

challenges.get('/current', async (c) => {
  const prisma = c.get('prisma');
  try {
    const challenge = await activeChallenge(prisma);
    if (!challenge) return c.json({ challenge: null, progress: null });

    const logs = await prisma.wateringLog.findMany({
      where: { loggedAt: { gte: new Date(challenge.startsAt), lte: new Date(challenge.endsAt) } },
      include: { tree: { select: { neighborhood: true } } },
    });
    const counts = new Map<string, number>();
    for (const log of logs) {
      const hood = log.tree?.neighborhood ?? 'Sector 5';
      counts.set(hood, (counts.get(hood) ?? 0) + 1);
    }
    return c.json({
      challenge: { ...challenge, sponsorName: challenge.sponsor?.name },
      progress: {
        total: logs.length,
        goal: challenge.goal,
        byNeighborhood: [...counts.entries()]
          .map(([neighborhood, count]) => ({ neighborhood, count }))
          .sort((a, b) => b.count - a.count),
      },
    });
  } catch (error) {
    console.error('Challenge error:', error);
    return c.json({ error: 'Failed to fetch challenge' }, 500);
  }
});
