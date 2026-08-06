import { Hono } from 'hono';
import { jwtMiddleware } from './auth';
import { AppEnv } from '../types/hono';
import { redeemCheck, generateVoucherCode } from '../lib/points';

const rewards = new Hono<AppEnv>();

// Public catalog
rewards.get('/', async (c) => {
  const prisma = c.get('prisma');
  try {
    const items = await prisma.reward.findMany({
      where: { active: true },
      orderBy: { costPoints: 'asc' },
      include: { sponsor: { select: { id: true, name: true, slug: true, tier: true } } },
    });
    return c.json({ rewards: items });
  } catch (error) {
    console.error('Get rewards error:', error);
    return c.json({ error: 'Failed to fetch rewards' }, 500);
  }
});

// Redeem — atomic via guarded updateMany (no double-spend window on D1).
rewards.post('/:id/redeem', jwtMiddleware, async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  const id = c.req.param('id');

  try {
    const reward = await prisma.reward.findUnique({ where: { id } });
    if (!reward) return c.json({ error: 'Reward not found' }, 404);

    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!dbUser) return c.json({ error: 'Unauthorized' }, 401);

    const verdict = redeemCheck(dbUser.pointsBalance, reward.costPoints, reward.stock, reward.active);
    if (verdict !== 'ok') return c.json({ error: verdict }, 400);

    // Guarded decrements: each returns count=0 if the precondition no longer
    // holds (concurrent redeem), so we never go negative.
    const balanceUpdate = await prisma.user.updateMany({
      where: { id: user.id, pointsBalance: { gte: reward.costPoints } },
      data: { pointsBalance: { decrement: reward.costPoints } },
    });
    if (balanceUpdate.count === 0) return c.json({ error: 'insufficient_points' }, 400);

    const stockUpdate = await prisma.reward.updateMany({
      where: { id: reward.id, stock: { gt: 0 }, active: true },
      data: { stock: { decrement: 1 } },
    });
    if (stockUpdate.count === 0) {
      // Refund the balance we already took.
      await prisma.user.update({
        where: { id: user.id },
        data: { pointsBalance: { increment: reward.costPoints } },
      });
      return c.json({ error: 'out_of_stock' }, 400);
    }

    // Balance and stock are already decremented at this point. Any failure
    // below must be compensated with a best-effort refund so the ledger
    // (points_events) never silently diverges from users.pointsBalance.
    try {
      let redemption = null;
      let lastError: unknown;
      for (let attempt = 0; attempt < 3 && !redemption; attempt++) {
        try {
          redemption = await prisma.redemption.create({
            data: { userId: user.id, rewardId: reward.id, code: generateVoucherCode() },
          });
        } catch (createError) {
          lastError = createError; // likely a voucher-code unique collision; retry with a fresh code
        }
      }
      if (!redemption) throw lastError ?? new Error('Failed to create redemption');

      await prisma.pointsEvent.create({
        data: {
          userId: user.id,
          action: 'REDEMPTION',
          points: -reward.costPoints,
          refType: 'REDEMPTION',
          refId: redemption.id,
        },
      });

      const updated = await prisma.user.findUnique({ where: { id: user.id } });
      return c.json({
        redemption: {
          id: redemption.id,
          code: redemption.code,
          rewardTitle: reward.title,
          costPoints: reward.costPoints,
          createdAt: redemption.createdAt,
        },
        pointsBalance: updated?.pointsBalance ?? 0,
      }, 201);
    } catch (postDecrementError) {
      console.error('Redeem post-decrement error:', postDecrementError);
      // Best-effort compensating refund — don't let a refund failure mask the original error.
      await prisma.user
        .update({ where: { id: user.id }, data: { pointsBalance: { increment: reward.costPoints } } })
        .catch(() => {});
      await prisma.reward
        .update({ where: { id: reward.id }, data: { stock: { increment: 1 } } })
        .catch(() => {});
      return c.json({ error: 'Failed to redeem reward' }, 500);
    }
  } catch (error) {
    console.error('Redeem error:', error);
    return c.json({ error: 'Failed to redeem reward' }, 500);
  }
});

export default rewards;
