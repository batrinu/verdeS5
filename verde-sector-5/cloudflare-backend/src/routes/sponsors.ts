import { Hono } from 'hono';
import { AppEnv } from '../types/hono';
import { computeImpact } from '../lib/impact';

const sponsors = new Hono<AppEnv>();

const TIER_ORDER: Record<string, number> = { GOLD: 0, SILVER: 1, BRONZE: 2 };

sponsors.get('/', async (c) => {
  const prisma = c.get('prisma');
  try {
    const all = await prisma.sponsor.findMany();
    all.sort((a: any, b: any) => (TIER_ORDER[a.tier] ?? 9) - (TIER_ORDER[b.tier] ?? 9));
    return c.json({ sponsors: all });
  } catch (error) {
    console.error('Get sponsors error:', error);
    return c.json({ error: 'Failed to fetch sponsors' }, 500);
  }
});

sponsors.get('/:slug', async (c) => {
  const prisma = c.get('prisma');
  const slug = c.req.param('slug');
  try {
    const sponsor = await prisma.sponsor.findUnique({
      where: { slug },
      include: {
        groves: { include: { trees: true } },
        campaigns: true,
      },
    });
    if (!sponsor) return c.json({ error: 'Sponsor not found' }, 404);
    const { groves, campaigns, ...rest } = sponsor;
    return c.json({ sponsor: rest, groves, campaigns });
  } catch (error) {
    console.error('Get sponsor error:', error);
    return c.json({ error: 'Failed to fetch sponsor' }, 500);
  }
});

// ESG dashboard (spec §4.2): survival evidence aggregated from the care graph.
sponsors.get('/:slug/dashboard', async (c) => {
  const prisma = c.get('prisma');
  const slug = c.req.param('slug');
  try {
    const sponsor = await prisma.sponsor.findUnique({
      where: { slug },
      include: { groves: { include: { trees: { include: { wateringLogs: true } } } } },
    });
    if (!sponsor) return c.json({ error: 'Sponsor not found' }, 404);

    const trees = sponsor.groves.flatMap((g: any) => g.trees);
    const aliveCount = trees.filter((t: any) => t.healthStatus !== 'DEAD').length;
    const healthyCount = trees.filter((t: any) => t.healthStatus === 'EXCELLENT' || t.healthStatus === 'GOOD').length;
    const logs = trees.flatMap((t: any) => t.wateringLogs);
    const photoProofCount = logs.filter((l: any) => l.photoProof).length;

    let co2 = 0, shade = 0;
    for (const t of trees) {
      const impact = computeImpact({ species: t.species, trunkDiameter: t.trunkDiameter, plantingDate: t.plantingDate });
      co2 += impact.co2KgPerYear;
      shade += impact.shadeM2;
    }

    // Simple monthly watering series, last 6 months incl. current.
    const monthlyWaterings: Array<{ month: string; count: number }> = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const count = logs.filter((l: any) => {
        const at = new Date(l.loggedAt);
        return at.getFullYear() === d.getFullYear() && at.getMonth() === d.getMonth();
      }).length;
      monthlyWaterings.push({ month: key, count });
    }

    if (c.req.query('format') === 'csv') {
      const header = 'treeId,nickname,species,latitude,longitude,healthStatus,wateringsCount,lastWateredAt,photoProofCount,co2KgPerYear';
      const rows = trees.map((t: any) => {
        const impact = computeImpact({ species: t.species, trunkDiameter: t.trunkDiameter, plantingDate: t.plantingDate });
        const tLogs = t.wateringLogs as any[];
        const photoCount = tLogs.filter((l) => l.photoProof).length;
        // Escape double quotes so nicknames can't break the CSV shape.
        const nickname = `"${String(t.nickname ?? '').replace(/"/g, '""')}"`;
        return [t.id, nickname, t.species, t.latitude, t.longitude, t.healthStatus,
          tLogs.length, t.lastWateredAt ? new Date(t.lastWateredAt).toISOString() : '',
          photoCount, impact.co2KgPerYear].join(',');
      });
      return c.text([header, ...rows].join('\n'), 200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="esg-${slug}.csv"`,
      });
    }

    return c.json({
      sponsor: { name: sponsor.name, slug: sponsor.slug, tier: sponsor.tier },
      stats: {
        treeCount: trees.length,
        aliveCount,
        survivalRate: trees.length ? Math.round((aliveCount / trees.length) * 100) : 0,
        healthyRate: trees.length ? Math.round((healthyCount / trees.length) * 100) : 0,
        wateringsCount: logs.length,
        photoProofCount,
        co2KgPerYear: Math.round(co2 * 10) / 10,
        shadeM2: Math.round(shade * 10) / 10,
      },
      monthlyWaterings,
    });
  } catch (error) {
    console.error('Sponsor dashboard error:', error);
    return c.json({ error: 'Failed to build sponsor dashboard' }, 500);
  }
});

export default sponsors;
