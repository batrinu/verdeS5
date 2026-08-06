// Verde Points ledger (spec §3.5). points_events is the source of truth;
// users.pointsBalance / users.careScore are caches updated in the same call.
export const POINTS = { WATERING: 50, CAMPAIGN_JOIN: 100 } as const;

export async function awardPoints(
  prisma: any,
  opts: { userId: string; action: 'WATERING' | 'CAMPAIGN_JOIN'; points: number; refType?: string; refId?: string }
): Promise<void> {
  await prisma.pointsEvent.create({
    data: {
      userId: opts.userId,
      action: opts.action,
      points: opts.points,
      refType: opts.refType ?? null,
      refId: opts.refId ?? null,
    },
  });
  await prisma.user.update({
    where: { id: opts.userId },
    data: {
      pointsBalance: { increment: opts.points },
      careScore: { increment: opts.points },
    },
  });
}

export function redeemCheck(
  balance: number,
  cost: number,
  stock: number,
  active: boolean
): 'ok' | 'insufficient_points' | 'out_of_stock' {
  if (!active || stock <= 0) return 'out_of_stock';
  if (balance < cost) return 'insufficient_points';
  return 'ok';
}

const CODE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export function generateVoucherCode(): string {
  const block = () =>
    Array.from({ length: 4 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join('');
  return `VS5-${block()}-${block()}`;
}
