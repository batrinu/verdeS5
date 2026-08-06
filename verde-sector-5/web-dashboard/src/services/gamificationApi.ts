import type { RewardItem, SponsorItem, ChallengeItem } from '../types/gamification';
import { API_BASE_URL } from '../config';

export async function fetchRewardsApi(): Promise<RewardItem[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/rewards`);
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.rewards)) {
        return data.rewards;
      }
    }
  } catch (err) {
    console.warn('API fetchRewards error:', err);
  }
  return null;
}

export async function fetchSponsorsApi(): Promise<SponsorItem[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/sponsors`);
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.sponsors)) {
        return data.sponsors;
      }
    }
  } catch (err) {
    console.warn('API fetchSponsors error:', err);
  }
  return null;
}

export async function fetchChallengeApi(): Promise<{
  challenge: ChallengeItem;
  progress: { total: number; goal: number; byNeighborhood: Array<{ neighborhood: string; count: number }> };
} | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/challenges/current`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.challenge && data.progress) {
        return { challenge: data.challenge, progress: data.progress };
      }
    }
  } catch (err) {
    console.warn('API fetchChallenge error:', err);
  }
  return null;
}
