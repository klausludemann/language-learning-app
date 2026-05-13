import { Link, useParams } from "react-router-dom";
import { TOPICS, vocabByTopic } from "../data/vocabulary";
import { DIALOGUES } from "../data/dialogues";
import SpeakerButton from "../components/SpeakerButton";
import type { Topic } from "../types";

export default function TopicDetail() {
  const { topicId } = useParams<{ topicId: Topic }>();
  const topic = TOPICS.find((t) => t.id === topicId);
  if (!topic) return <p>Thema nicht gefunden.</p>;
  const items = vocabByTopic(topic.id);
  const dialogues = DIALOGUES.filter((d) => d.topic === topic.id);

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-3">
        <span className="text-4xl">{topic.emoji}</span>
        <div>
          <h1 className="text-2xl font-bold">{topic.label}</h1>
          <p className="text-sm text-zinc-500">{topic.description}</p>
        </div>
      </header>

      <Link to={`/uebung?topic=${topic.id}`} className="btn-primary w-full">
        Üben ({items.length} Vokabeln)
      </Link>

      <section>
        <h2 className="mb-2 text-lg font-semibold">Vokabeln</h2>
        <ul className="space-y-2">
          {items.map((v) => (
            <li key={v.id} className="card flex items-center gap-3 py-3">
              <div className="flex-1">
                <div className="text-zinc-500 text-sm">{v.de}</div>
                <div className="font-medium">
                  {v.es}
                  {v.hint && <span className="ml-1 text-xs text-zinc-400">({v.hint})</span>}
                </div>
              </div>
              <SpeakerButton text={v.es} />
            </li>
          ))}
        </ul>
      </section>

      {dialogues.length > 0 && (
        <section>
          <h2 className="mb-2 text-lg font-semibold">Dialoge</h2>
          {dialogues.map((d) => (
            <div key={d.id} className="card mb-3">
              <h3 className="mb-2 font-semibold">{d.title}</h3>
              <ul className="space-y-2">
                {d.lines.map((line, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sand-200 text-xs font-semibold dark:bg-zinc-700">
                      {line.speaker}
                    </span>
                    <div className="flex-1">
                      <div>{line.es}</div>
                      <div className="text-xs text-zinc-500">{line.de}</div>
                    </div>
                    <SpeakerButton text={line.es} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
