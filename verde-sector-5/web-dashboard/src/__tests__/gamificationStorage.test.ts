import { describe, it, expect, beforeEach } from 'vitest';
import { getRewards, getRedemptions, redeemReward } from '../services/gamificationStorage';
import { SEED_REWARDS } from '../data/gamificationSeedData';

beforeEach(() => localStorage.clear());

describe('gamificationStorage', () => {
  it('serves the seed catalog on first load', () => {
    expect(getRewards()).toEqual(SEED_REWARDS);
  });

  it('redeems: issues a VS5 code, decrements stock, records the redemption', () => {
    const reward = SEED_REWARDS[0];
    const result = redeemReward(reward.id, reward.costPoints + 100);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.redemption.code).toMatch(/^VS5-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
      expect(result.redemption.rewardTitle).toBe(reward.title);
    }
    expect(getRewards().find(r => r.id === reward.id)!.stock).toBe(reward.stock - 1);
    expect(getRedemptions()).toHaveLength(1);
  });

  it('rejects insufficient balance without touching stock', () => {
    const reward = SEED_REWARDS[0];
    const result = redeemReward(reward.id, reward.costPoints - 1);
    expect(result).toEqual({ ok: false, error: 'insufficient_points' });
    expect(getRewards().find(r => r.id === reward.id)!.stock).toBe(reward.stock);
  });

  it('rejects when stock is exhausted', () => {
    const reward = SEED_REWARDS[0];
    for (let i = 0; i < reward.stock; i++) redeemReward(reward.id, 99999);
    expect(redeemReward(reward.id, 99999)).toEqual({ ok: false, error: 'out_of_stock' });
  });

  it('rejects unknown rewards', () => {
    expect(redeemReward('nope', 99999)).toEqual({ ok: false, error: 'not_found' });
  });
});
