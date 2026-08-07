import { describe, it, expect } from 'vitest';
import { nextDetent } from '../utils/sheetDetent';

describe('nextDetent', () => {
  it('steps up peek -> half -> full and clamps at full', () => {
    expect(nextDetent('peek', 'up')).toBe('half');
    expect(nextDetent('half', 'up')).toBe('full');
    expect(nextDetent('full', 'up')).toBe('full');
  });

  it('steps down full -> half -> peek and clamps at peek', () => {
    expect(nextDetent('full', 'down')).toBe('half');
    expect(nextDetent('half', 'down')).toBe('peek');
    expect(nextDetent('peek', 'down')).toBe('peek');
  });
});
