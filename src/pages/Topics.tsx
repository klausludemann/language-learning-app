import { Link } from "react-router-dom";
import { TOPICS, vocabByTopic } from "../data/vocabulary";
import type { UserProgress } from "../types";

export default function Topics({ progress }: { progress: UserProgress }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Themen</h1>
      <ul className="space-y-3">
        {TOPICS.map((t) => {
          const items = vocabByTopic(t.id);
          const learned = items.filter((i) => (progress.cards[i.id]?.repetitions ?? 0) > 0).length;
          return (
            <li key={t.id}>
              <Link to={`/themen/${t.id}`} className="card flex items-center gap-4">
                <span className="text-3xl">{t.emoji}</span>
                <div className="flex-1">
                  <div className="font-semibold">{t.label}</div>
                  <div className="text-xs text-zinc-500">{t.description}</div>
                  <div className="mt-1 text-xs text-terra-600">
                    {learned} / {items.length} Vokabeln
                  </div>
                </div>
                <span className="text-zinc-400">›</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
