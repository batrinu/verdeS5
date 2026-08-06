export type SponsorTier = 'BRONZE' | 'SILVER' | 'GOLD';

export interface SponsorItem {
  id: string;
  name: string;
  slug: string;
  tier: SponsorTier;
  logoSvg: string;
  description: string;
  website?: string;
}

export interface GroveItem {
  id: string;
  name: string;
  description: string;
  sponsorId: string;
  treeIds: string[];
}

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  merchantName: string;
  sponsorId?: string | null;
  costPoints: number;
  stock: number;
}

export interface RedemptionItem {
  id: string;
  rewardId: string;
  rewardTitle: string;
  code: string;
  createdAt: string;
}

export interface ChallengeItem {
  id: string;
  name: string;
  description: string;
  goal: number;
  startsAt: string;
  endsAt: string;
  sponsorId: string;
}

export interface LeaderUserItem {
  name: string;
  neighborhood: string;
  points: number;
  waterings: number;
}
