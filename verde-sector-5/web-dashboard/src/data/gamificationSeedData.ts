import type { SponsorItem, GroveItem, RewardItem, ChallengeItem, LeaderUserItem } from '../types/gamification';

const LOGO_SOLARIS = '<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="7" fill="#fbbf24"/><g stroke="#fbbf24" stroke-width="2" stroke-linecap="round"><line x1="16" y1="2" x2="16" y2="7"/><line x1="16" y1="25" x2="16" y2="30"/><line x1="2" y1="16" x2="7" y2="16"/><line x1="25" y1="16" x2="30" y2="16"/><line x1="6" y1="6" x2="9.5" y2="9.5"/><line x1="22.5" y1="22.5" x2="26" y2="26"/><line x1="26" y1="6" x2="22.5" y2="9.5"/><line x1="9.5" y1="22.5" x2="6" y2="26"/></g></svg>';
const LOGO_PANIFICA = '<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><ellipse cx="16" cy="18" rx="12" ry="8" fill="#d6a35c"/><path d="M8 15 Q16 9 24 15" stroke="#8a5a2b" stroke-width="2" fill="none" stroke-linecap="round"/><line x1="12" y1="14" x2="12" y2="22" stroke="#8a5a2b" stroke-width="1.5"/><line x1="16" y1="13" x2="16" y2="23" stroke="#8a5a2b" stroke-width="1.5"/><line x1="20" y1="14" x2="20" y2="22" stroke="#8a5a2b" stroke-width="1.5"/></svg>';
const LOGO_BICICLETA = '<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="12" fill="none" stroke="#60a5fa" stroke-width="2.5"/><g stroke="#60a5fa" stroke-width="1.5"><line x1="16" y1="4" x2="16" y2="28"/><line x1="4" y1="16" x2="28" y2="16"/><line x1="8" y1="8" x2="24" y2="24"/><line x1="24" y1="8" x2="8" y2="24"/></g><circle cx="16" cy="16" r="2.5" fill="#60a5fa"/></svg>';

export const SEED_SPONSORS: SponsorItem[] = [
  {
    id: 'sponsor-solaris',
    name: 'Solaris Energia',
    slug: 'solaris-energia',
    tier: 'GOLD',
    logoSvg: LOGO_SOLARIS,
    description: 'Sponsor demonstrativ — companie fictivă de energie regenerabilă. Susține campania „Augustul Udărilor" și crângul Solaris.',
    website: 'https://example.com/solaris',
  },
  {
    id: 'sponsor-panifica',
    name: 'Panifica București',
    slug: 'panifica-bucuresti',
    tier: 'SILVER',
    logoSvg: LOGO_PANIFICA,
    description: 'Sponsor demonstrativ — brutărie fictivă de cartier. Sponsorizează Crângul Sebastian.',
    website: 'https://example.com/panifica',
  },
  {
    id: 'sponsor-bicicleta',
    name: 'Bicicleta Albastră',
    slug: 'bicicleta-albastra',
    tier: 'BRONZE',
    logoSvg: LOGO_BICICLETA,
    description: 'Sponsor demonstrativ — magazin fictiv de biciclete. Contribuie la fondul de recompense.',
    website: 'https://example.com/bicicleta',
  },
];

export const SEED_GROVES: GroveItem[] = [
  {
    id: 'grove-solaris',
    name: 'Crângul Solaris — Parcul Izvor',
    description: 'Aliniament susținut de Solaris Energia (demo).',
    sponsorId: 'sponsor-solaris',
    treeIds: ['tree-izv-1', 'tree-izv-2', 'tree-izv-3', 'tree-izv-4', 'tree-izv-5'],
  },
  {
    id: 'grove-sebastian',
    name: 'Crângul Sebastian',
    description: 'Zona de nord a Parcului Sebastian, susținută de Panifica București (demo).',
    sponsorId: 'sponsor-panifica',
    treeIds: ['tree-seb-1', 'tree-seb-2', 'tree-seb-3', 'tree-seb-4', 'tree-seb-5'],
  },
];

export const SEED_REWARDS: RewardItem[] = [
  {
    id: 'reward-sac-udare',
    title: 'Sac de udare lentă (Tree Gator)',
    description: 'Kit care udă copacul 6–8 ore. Ridicare de la sediul Primăriei.',
    merchantName: 'Primăria Sectorului 5',
    sponsorId: null,
    costPoints: 400,
    stock: 20,
  },
  {
    id: 'reward-voucher-paine',
    title: 'Voucher 20 lei — Panifica',
    description: 'Reducere la orice produs de panificație.',
    merchantName: 'Panifica București',
    sponsorId: 'sponsor-panifica',
    costPoints: 300,
    stock: 30,
  },
  {
    id: 'reward-service-bicicleta',
    title: 'Revizie gratuită bicicletă',
    description: 'Verificare completă la Bicicleta Albastră.',
    merchantName: 'Bicicleta Albastră',
    sponsorId: 'sponsor-bicicleta',
    costPoints: 500,
    stock: 10,
  },
  {
    id: 'reward-bilet-gradina',
    title: 'Bilet Grădina Botanică',
    description: 'Intrare gratuită pentru doi.',
    merchantName: 'Grădina Botanică',
    sponsorId: null,
    costPoints: 250,
    stock: 40,
  },
  {
    id: 'reward-manusi',
    title: 'Set mănuși + unelte de grădinărit',
    description: 'Pentru gardienii care plantează.',
    merchantName: 'Primăria Sectorului 5',
    sponsorId: null,
    costPoints: 350,
    stock: 15,
  },
  {
    id: 'reward-workshop',
    title: 'Atelier de îngrijire a copacilor',
    description: 'Instruire cu peisagiștii primăriei — pas spre Super-Gardian.',
    merchantName: 'Primăria Sectorului 5',
    sponsorId: 'sponsor-solaris',
    costPoints: 600,
    stock: 12,
  },
];

export const SEED_CHALLENGE: ChallengeItem = {
  id: 'challenge-august-2026',
  name: 'Augustul Udărilor',
  description: '500 de udări în tot Sectorul 5 în luna august. Cartierul câștigător primește un micro-grant pentru un proiect verde.',
  goal: 500,
  startsAt: '2026-08-01',
  endsAt: '2026-08-31',
  sponsorId: 'sponsor-solaris',
};

export const SEED_LEADER_USERS: LeaderUserItem[] = [
  { name: 'Mihai Ionescu', neighborhood: 'Cotroceni', points: 2350, waterings: 44 },
  { name: 'Ana Maria', neighborhood: 'Sebastian', points: 1480, waterings: 22 },
  { name: 'Alexandru D.', neighborhood: 'Izvor', points: 1320, waterings: 25 },
  { name: 'Elena Popa', neighborhood: 'Cotroceni', points: 800, waterings: 14 },
  { name: 'Carmen Enache', neighborhood: 'Sebastian', points: 720, waterings: 20 },
  { name: 'Andrei Stanciu', neighborhood: 'Rahova', points: 540, waterings: 11 },
  { name: 'Florin Nistor', neighborhood: 'Ferentari', points: 410, waterings: 12 },
  { name: 'Daria M.', neighborhood: 'Izvor', points: 180, waterings: 18 },
];
