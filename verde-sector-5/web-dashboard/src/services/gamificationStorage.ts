import type { RewardItem, RedemptionItem } from '../types/gamification';
import { SEED_REWARDS } from '../data/gamificationSeedData';

const REWARDS_STORAGE_KEY = 'verde_s5_rewards';
const REDEMPTIONS_STORAGE_KEY = 'verde_s5_redemptions';

function isLocalStorageAvailable(): boolean {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
}

export function getRewards(): RewardItem[] {
  if (!isLocalStorageAvailable()) return SEED_REWARDS;
  try {
    const raw = localStorage.getItem(REWARDS_STORAGE_KEY);
    if (!raw) {
      saveRewards(SEED_REWARDS);
      return SEED_REWARDS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    saveRewards(SEED_REWARDS);
    return SEED_REWARDS;
  } catch {
    return SEED_REWARDS;
  }
}

export function saveRewards(rewards: RewardItem[]): void {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(REWARDS_STORAGE_KEY, JSON.stringify(rewards));
  } catch (err) {
    console.error('Failed to save rewards to localStorage:', err);
  }
}

export function getRedemptions(): RedemptionItem[] {
  if (!isLocalStorageAvailable()) return [];
  try {
    const raw = localStorage.getItem(REDEMPTIONS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveRedemptions(redemptions: RedemptionItem[]): void {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(REDEMPTIONS_STORAGE_KEY, JSON.stringify(redemptions));
  } catch (err) {
    console.error('Failed to save redemptions to localStorage:', err);
  }
}

export function generateVoucherCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segment = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `VS5-${segment()}-${segment()}`;
}

export function redeemReward(
  rewardId: string,
  balance: number
): { ok: true; redemption: RedemptionItem } | { ok: false; error: 'insufficient_points' | 'out_of_stock' | 'not_found' } {
  const currentRewards = getRewards();
  const reward = currentRewards.find(r => r.id === rewardId);

  if (!reward) {
    return { ok: false, error: 'not_found' };
  }
  if (reward.stock <= 0) {
    return { ok: false, error: 'out_of_stock' };
  }
  if (balance < reward.costPoints) {
    return { ok: false, error: 'insufficient_points' };
  }

  const updatedRewards = currentRewards.map(r =>
    r.id === rewardId ? { ...r, stock: r.stock - 1 } : r
  );

  const redemption: RedemptionItem = {
    id: `redemption-${Date.now()}`,
    rewardId: reward.id,
    rewardTitle: reward.title,
    code: generateVoucherCode(),
    createdAt: new Date().toISOString(),
  };

  const updatedRedemptions = [...getRedemptions(), redemption];

  saveRewards(updatedRewards);
  saveRedemptions(updatedRedemptions);

  return { ok: true, redemption };
}
