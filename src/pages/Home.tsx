import { Link } from "react-router-dom";
import { TOPICS, VOCABULARY } from "../data/vocabulary";
import ProgressBar from "../components/ProgressBar";
import type { UserProgress } from "../types";
import { dueCards } from "../lib/srs";

export default function Home({ progress }: { progress: UserProgress }) {
  const allIds = VOCABULARY.map((v) => v.id);
  const due = dueCards(progress.cards, allIds).length;
  const learnedToday = Object.values(progress.cards).filter(
    (c) =>
      c.lastReviewed &&
      new Date(c.lastReviewed).toISOString().slice(0, 10) ===
        new Date().toISOString().slice(0, 10),
  ).length;

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-zinc-500">¡Hola! Bereit für Spanisch?</p>
        <h1 className="text-3xl font-bold">Tu día de español</h1>
      </header>

      <div className="card">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-sm text-zinc-500">Heutiges Ziel</span>
          <span className="text-sm font-medium">
            {Math.min(learnedToday, progress.dailyGoal)} / {progress.dailyGoal}
          </span>
        </div>
        <ProgressBar value={learnedToday} max={progress.dailyGoal} />
        <div className="mt-4 flex items-center gap-4">
          <div className="flex flex-col items-center">
            <span className="text-2xl">🔥</span>
            <span className="text-xs text-zinc-500">{progress.streak.count} Tage</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl">📦</span>
            <span className="text-xs text-zinc-500">{due} fällig</span>
          </div>
          <div className="ml-auto">
            <Link to="/uebung" className="btn-primary">
              Weiterlernen
            </Link>
          </div>
        </div>
      </div>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Themen</h2>
        <div className="grid grid-cols-2 gap-3">
          {TOPICS.map((t) => (
            <Link
              key={t.id}
              to={`/themen/${t.id}`}
              className="card flex flex-col gap-1 hover:ring-terra-500"
            >
              <span className="text-3xl">{t.emoji}</span>
              <span className="font-medium leading-tight">{t.label}</span>
              <span className="text-xs text-zinc-500">{t.description}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
