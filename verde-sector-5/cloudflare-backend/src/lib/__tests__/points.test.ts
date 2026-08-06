import { describe, it, expect } from 'vitest';
import { redeemCheck, generateVoucherCode, POINTS } from '../points';

describe('redeemCheck', () => {
  it('accepts when balance covers cost and stock exists', () => {
    expect(redeemCheck(500, 300, 5, true)).toBe('ok');
  });
  it('rejects insufficient balance', () => {
    expect(redeemCheck(200, 300, 5, true)).toBe('insufficient_points');
  });
  it('rejects zero stock and inactive rewards', () => {
    expect(redeemCheck(500, 300, 0, true)).toBe('out_of_stock');
    expect(redeemCheck(500, 300, 5, false)).toBe('out_of_stock');
  });
});

describe('generateVoucherCode', () => {
  it('matches VS5-XXXX-XXXX with uppercase alphanumerics', () => {
    for (let i = 0; i < 20; i++) {
      expect(generateVoucherCode()).toMatch(/^VS5-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
    }
  });
});

describe('POINTS', () => {
  it('has the spec values', () => {
    expect(POINTS.WATERING).toBe(50);
    expect(POINTS.CAMPAIGN_JOIN).toBe(100);
  });
});
