export type Detent = 'peek' | 'half' | 'full';

export const DETENTS: readonly Detent[] = ['peek', 'half', 'full'] as const;

export function nextDetent(current: Detent, direction: 'up' | 'down'): Detent {
  const i = DETENTS.indexOf(current);
  const j = direction === 'up' ? Math.min(i + 1, DETENTS.length - 1) : Math.max(i - 1, 0);
  return DETENTS[j];
}
