// First-person „vocea copacului" messages (spec §3.2). Template-based, no AI.
import type { WaterStatus } from './waterStatus';

const isSummer = (month: number) => month >= 5 && month <= 7;
const isWinter = (month: number) => month === 11 || month <= 1;

export function composeTreeMessage(input: {
  nickname?: string | null;
  waterStatusBefore: WaterStatus;
  month: number; // 0-indexed
  liters: number;
}): string {
  const { waterStatusBefore, month, liters } = input;
  let body: string;
  if (waterStatusBefore === 'urgent') {
    body = `Uf, chiar aveam nevoie! Cei ${liters} litri m-au salvat de arșiță.`;
  } else if (waterStatusBefore === 'thirsty') {
    body = `Începeam să mă usuc — mulțumesc pentru cei ${liters} litri!`;
  } else if (isWinter(month)) {
    body = 'Mulțumesc! Iarna beau mai puțin, dar grija ta mă ține puternic.';
  } else if (isSummer(month)) {
    body = 'Mulțumesc pentru apă! Pe căldura asta, orice strop contează.';
  } else {
    body = 'Mulțumesc pentru apă! Cresc frumos datorită ție.';
  }
  return input.nickname ? `${body} — ${input.nickname}` : body;
}
