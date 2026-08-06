import { describe, it, expect } from 'vitest';
import { composeTreeMessage } from '../treeMessages';

describe('composeTreeMessage', () => {
  it('thanks urgently-thirsty trees with relief, mentioning liters', () => {
    const msg = composeTreeMessage({ nickname: 'Teiul Prosper', waterStatusBefore: 'urgent', month: 6, liters: 15 });
    expect(msg).toBe('Uf, chiar aveam nevoie! Cei 15 litri m-au salvat de arșiță. — Teiul Prosper');
  });

  it('is calmer for ok trees', () => {
    const msg = composeTreeMessage({ nickname: null, waterStatusBefore: 'ok', month: 6, liters: 10 });
    expect(msg).toBe('Mulțumesc pentru apă! Pe căldura asta, orice strop contează.');
  });

  it('uses the winter variant in December–February', () => {
    const msg = composeTreeMessage({ nickname: null, waterStatusBefore: 'ok', month: 0, liters: 10 });
    expect(msg).toBe('Mulțumesc! Iarna beau mai puțin, dar grija ta mă ține puternic.');
  });

  it('signs with the nickname when present', () => {
    const msg = composeTreeMessage({ nickname: 'Stejarul Rahova', waterStatusBefore: 'thirsty', month: 4, liters: 10 });
    expect(msg.endsWith('— Stejarul Rahova')).toBe(true);
  });
});
