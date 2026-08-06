import { describe, it, expect } from 'vitest';
import { guardianLevelFor, nextLevelProgress } from '../guardianLevel';

describe('guardianLevelFor', () => {
  it('maps care score to levels at 0 / 500 / 2000', () => {
    expect(guardianLevelFor(0).key).toBe('PRIETEN');
    expect(guardianLevelFor(499).key).toBe('PRIETEN');
    expect(guardianLevelFor(500).key).toBe('GARDIAN');
    expect(guardianLevelFor(1999).key).toBe('GARDIAN');
    expect(guardianLevelFor(2000).key).toBe('SUPER_GARDIAN');
  });

  it('has Romanian titles', () => {
    expect(guardianLevelFor(0).title).toBe('Prieten al Copacilor');
    expect(guardianLevelFor(500).title).toBe('Gardian Verde');
    expect(guardianLevelFor(2000).title).toBe('Super-Gardian');
  });
});

describe('nextLevelProgress', () => {
  it('reports progress toward the next threshold', () => {
    expect(nextLevelProgress(250)).toEqual({ next: expect.objectContaining({ key: 'GARDIAN' }), progress: 0.5 });
    expect(nextLevelProgress(1250)).toEqual({ next: expect.objectContaining({ key: 'SUPER_GARDIAN' }), progress: 0.5 });
  });

  it('returns null next at the top level', () => {
    expect(nextLevelProgress(2500)).toEqual({ next: null, progress: 1 });
  });
});
