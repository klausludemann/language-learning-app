import type { CardState } from "../types";

export type Rating = 0 | 1 | 2 | 3; // 0=again, 1=hard, 2=good, 3=easy

const DAY_MS = 24 * 60 * 60 * 1000;

export const newCard = (id: string): CardState => ({
  id,
  ease: 2.5,
  intervalDays: 0,
  repetitions: 0,
  dueAt: Date.now(),
});

/**
 * SM-2-inspired update. Returns the new state.
 */
export const reviewCard = (card: CardState, rating: Rating): CardState => {
  const now = Date.now();
  let { ease, intervalDays, repetitions } = card;

  if (rating === 0) {
    repetitions = 0;
    intervalDays = 0;
    ease = Math.max(1.3, ease - 0.2);
  } else {
    const q = rating === 1 ? 3 : rating === 2 ? 4 : 5;
    ease = Math.max(1.3, ease + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    repetitions += 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 3;
    else intervalDays = Math.round(intervalDays * ease);
    if (rating === 1) intervalDays = Math.max(1, Math.round(intervalDays * 0.6));
  }

  const dueAt = rating === 0 ? now + 5 * 60 * 1000 : now + intervalDays * DAY_MS;
  return { ...card, ease, intervalDays, repetitions, dueAt, lastReviewed: now };
};

export const dueCards = (cards: Record<string, CardState>, allIds: string[]): string[] => {
  const now = Date.now();
  return allIds.filter((id) => {
    const c = cards[id];
    return !c || c.dueAt <= now;
  });
};
