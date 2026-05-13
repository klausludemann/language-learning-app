import { Link, useParams } from "react-router-dom";
import { GRAMMAR } from "../data/grammar";
import SpeakerButton from "../components/SpeakerButton";

export default function GrammarLesson() {
  const { id } = useParams<{ id: string }>();
  const lesson = GRAMMAR.find((g) => g.id === id);
  if (!lesson) {
    return (
      <div>
        <Link to="/grammatik" className="text-terra-600">← Zurück</Link>
        <p>Lektion nicht gefunden.</p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <Link to="/grammatik" className="text-sm text-terra-600">← Grammatik</Link>
      <header>
        <h1 className="text-2xl font-bold">{lesson.title}</h1>
        <p className="mt-1 text-zinc-500">{lesson.summary}</p>
      </header>
      {lesson.sections.map((s, i) => (
        <section key={i} className="card">
          <h2 className="mb-2 font-semibold">{s.heading}</h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{s.body}</p>
          {s.examples && s.examples.length > 0 && (
            <ul className="mt-3 space-y-2">
              {s.examples.map((ex, j) => (
                <li
                  key={j}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-sand-50 px-3 py-2 dark:bg-zinc-900"
                >
                  <div>
                    <div className="font-medium">{ex.es}</div>
                    <div className="text-xs text-zinc-500">{ex.de}</div>
                  </div>
                  <SpeakerButton text={ex.es} />
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
