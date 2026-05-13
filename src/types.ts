export type Topic =
  | "begruessung"
  | "restaurant"
  | "hotel"
  | "verkehr"
  | "camping"
  | "wandern"
  | "radfahren";

export interface VocabItem {
  id: string;
  topic: Topic;
  de: string;
  es: string;
  /** Optional grammatical hint (e.g. m/f, plural, verb form) */
  hint?: string;
  /** Optional example sentence */
  exampleEs?: string;
  exampleDe?: string;
}

export interface DialogueLine {
  speaker: "A" | "B";
  es: string;
  de: string;
}

export interface Dialogue {
  id: string;
  topic: Topic;
  title: string;
  lines: DialogueLine[];
}

export interface GrammarLesson {
  id: string;
  title: string;
  summary: string;
  /** Markdown-like sections rendered as paragraphs */
  sections: { heading: string; body: string; examples?: { es: string; de: string }[] }[];
}

/** Spaced-Repetition card state (SM-2 style) */
export interface CardState {
  id: string;
  ease: number;
  intervalDays: number;
  repetitions: number;
  dueAt: number; // epoch ms
  lastReviewed?: number;
}

export interface UserProgress {
  cards: Record<string, CardState>;
  streak: { count: number; lastDay: string };
  totalReviews: number;
  dailyGoal: number;
}
