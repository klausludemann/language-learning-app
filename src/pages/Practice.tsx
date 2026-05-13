import { useMemo, useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { VOCABULARY } from "../data/vocabulary";
import SpeakerButton from "../components/SpeakerButton";
import ProgressBar from "../components/ProgressBar";
import { dueCards } from "../lib/srs";
import type { Rating } from "../lib/srs";
import type { Topic, UserProgress, VocabItem } from "../types";

type Mode = "flash" | "choice" | "type" | "speak";

interface SpeechAlternative {
  transcript: string;
}
interface SpeechResult {
  length: number;
  [index: number]: SpeechAlternative;
}
interface SpeechResultList {
  length: number;
  [index: number]: SpeechResult;
}
interface SpeechRecognitionEvent {
  results: SpeechResultList;
}
interface SpeechRecognitionErrorEvent {
  error: string;
}
interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

const getSpeechRecognition = (): SpeechRecognitionCtor | null => {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
};

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[¿?¡!.,]/g, "")
    .trim();

export default function Practice({
  progress,
  onReview,
}: {
  progress: UserProgress;
  onReview: (id: string, rating: Rating) => void;
}) {
  const [params] = useSearchParams();
  const topic = params.get("topic") as Topic | null;
  const [mode, setMode] = useState<Mode>("choice");

  const pool = useMemo(
    () => (topic ? VOCABULARY.filter((v) => v.topic === topic) : VOCABULARY),
    [topic],
  );

  const queue = useMemo(() => {
    const ids = pool.map((p) => p.id);
    const due = dueCards(progress.cards, ids);
    const base = due.length > 0 ? due : shuffle(ids).slice(0, 10);
    return shuffle(base).slice(0, 15);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, pool]);

  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [typed, setTyped] = useState("");
  const [typedResult, setTypedResult] = useState<null | "ok" | "no">(null);

  const currentId = queue[idx];
  const current = pool.find((v) => v.id === currentId) ?? null;

  const options = useMemo(() => {
    if (!current) return [];
    const others = pool.filter((v) => v.id !== current.id);
    const picks = shuffle(others).slice(0, 3).map((o) => o.es);
    return shuffle([current.es, ...picks]);
  }, [current, pool]);

  useEffect(() => {
    setRevealed(false);
    setTyped("");
    setTypedResult(null);
  }, [idx]);

  if (pool.length === 0) {
    return (
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold">Keine Vokabeln in dieser Auswahl</h1>
      </div>
    );
  }

  if (idx >= queue.length || !current) {
    return (
      <div className="space-y-4 text-center">
        <h1 className="text-4xl">🎉</h1>
        <h2 className="text-xl font-bold">Geschafft!</h2>
        <p className="text-zinc-500">Du hast {queue.length} Karten geübt.</p>
        <button className="btn-primary" onClick={() => setIdx(0)}>
          Nochmal
        </button>
      </div>
    );
  }

  const handleRating = (r: Rating) => {
    onReview(current.id, r);
    setIdx((i) => i + 1);
  };

  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <ProgressBar value={idx} max={queue.length} />
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>{idx + 1} / {queue.length}</span>
          <div className="flex gap-1">
            <ModeButton current={mode} value="choice" setter={setMode} label="Wahl" />
            <ModeButton current={mode} value="type" setter={setMode} label="Tippen" />
            <ModeButton current={mode} value="speak" setter={setMode} label="Sprechen" />
            <ModeButton current={mode} value="flash" setter={setMode} label="Karte" />
          </div>
        </div>
      </header>

      <div className="card text-center">
        <div className="text-sm text-zinc-500 mb-2">Übersetze auf Spanisch</div>
        <div className="text-2xl font-semibold">{current.de}</div>
        {current.hint && <div className="text-xs text-zinc-400 mt-1">({current.hint})</div>}
      </div>

      {mode === "flash" && (
        <FlashView
          current={current}
          revealed={revealed}
          onReveal={() => setRevealed(true)}
          onRate={handleRating}
        />
      )}

      {mode === "choice" && (
        <ChoiceView
          current={current}
          options={options}
          revealed={revealed}
          onAnswer={(correct) => {
            setRevealed(true);
            setTimeout(() => handleRating(correct ? 2 : 0), 700);
          }}
        />
      )}

      {mode === "type" && (
        <TypeView
          current={current}
          typed={typed}
          setTyped={setTyped}
          result={typedResult}
          onSubmit={() => {
            const ok = normalize(typed) === normalize(current.es);
            setTypedResult(ok ? "ok" : "no");
            setTimeout(() => handleRating(ok ? 2 : 0), 900);
          }}
        />
      )}

      {mode === "speak" && (
        <SpeakView
          current={current}
          onAnswer={(correct) => handleRating(correct ? 2 : 0)}
        />
      )}
    </div>
  );
}

const ModeButton = ({
  current,
  value,
  setter,
  label,
}: {
  current: Mode;
  value: Mode;
  setter: (m: Mode) => void;
  label: string;
}) => (
  <button
    onClick={() => setter(value)}
    className={`rounded-full px-3 py-1 text-xs ${
      current === value
        ? "bg-terra-600 text-white"
        : "bg-sand-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200"
    }`}
  >
    {label}
  </button>
);

const FlashView = ({
  current,
  revealed,
  onReveal,
  onRate,
}: {
  current: VocabItem;
  revealed: boolean;
  onReveal: () => void;
  onRate: (r: Rating) => void;
}) => (
  <div className="space-y-3">
    {!revealed ? (
      <button className="btn-secondary w-full" onClick={onReveal}>
        Auflösen
      </button>
    ) : (
      <>
        <div className="card flex items-center justify-between">
          <div>
            <div className="text-xs text-zinc-500">Antwort</div>
            <div className="text-xl font-semibold">{current.es}</div>
          </div>
          <SpeakerButton text={current.es} />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button className="btn-secondary text-sm" onClick={() => onRate(0)}>Nochmal</button>
          <button className="btn-secondary text-sm" onClick={() => onRate(1)}>Schwer</button>
          <button className="btn-secondary text-sm" onClick={() => onRate(2)}>Gut</button>
          <button className="btn-secondary text-sm" onClick={() => onRate(3)}>Leicht</button>
        </div>
      </>
    )}
  </div>
);

const ChoiceView = ({
  current,
  options,
  revealed,
  onAnswer,
}: {
  current: VocabItem;
  options: string[];
  revealed: boolean;
  onAnswer: (correct: boolean) => void;
}) => (
  <div className="grid grid-cols-1 gap-2">
    {options.map((opt) => {
      const isCorrect = opt === current.es;
      const showState = revealed
        ? isCorrect
          ? "ring-2 ring-emerald-500"
          : "opacity-60"
        : "";
      return (
        <button
          key={opt}
          disabled={revealed}
          onClick={() => onAnswer(isCorrect)}
          className={`card flex items-center justify-between text-left ${showState}`}
        >
          <span>{opt}</span>
          {revealed && isCorrect && <SpeakerButton text={opt} />}
        </button>
      );
    })}
  </div>
);

const TypeView = ({
  current,
  typed,
  setTyped,
  result,
  onSubmit,
}: {
  current: VocabItem;
  typed: string;
  setTyped: (s: string) => void;
  result: null | "ok" | "no";
  onSubmit: () => void;
}) => (
  <div className="space-y-3">
    <input
      autoFocus
      value={typed}
      onChange={(e) => setTyped(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      placeholder="Auf Spanisch tippen…"
      className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-lg outline-none focus:border-terra-500 dark:border-zinc-700 dark:bg-zinc-800"
    />
    <div className="flex flex-wrap gap-2 text-sm">
      {"áéíóúñ¿¡".split("").map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => setTyped(typed + c)}
          className="rounded-lg bg-sand-100 px-3 py-1 dark:bg-zinc-700"
        >
          {c}
        </button>
      ))}
    </div>
    {result === null ? (
      <button className="btn-primary w-full" onClick={onSubmit}>
        Prüfen
      </button>
    ) : (
      <div
        className={`card ${
          result === "ok" ? "ring-2 ring-emerald-500" : "ring-2 ring-rose-500"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-zinc-500">Richtig wäre</div>
            <div className="text-lg font-semibold">{current.es}</div>
          </div>
          <SpeakerButton text={current.es} />
        </div>
      </div>
    )}
  </div>
);

type SpeakState = "unsupported" | "idle" | "listening" | "result" | "no-speech" | "denied";

const SpeakView = ({
  current,
  onAnswer,
}: {
  current: VocabItem;
  onAnswer: (correct: boolean) => void;
}) => {
  const [state, setState] = useState<SpeakState>("idle");
  const [transcript, setTranscript] = useState("");
  const [matched, setMatched] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    if (!getSpeechRecognition()) setState("unsupported");
  }, []);

  useEffect(() => {
    setTranscript("");
    setMatched(false);
    setState((s) => (s === "unsupported" ? s : "idle"));
    return () => {
      recognitionRef.current?.abort();
    };
  }, [current.id]);

  const start = () => {
    const Ctor = getSpeechRecognition();
    if (!Ctor) {
      setState("unsupported");
      return;
    }
    const r = new Ctor();
    r.lang = "es-ES";
    r.continuous = false;
    r.interimResults = false;
    r.maxAlternatives = 3;

    r.onresult = (event) => {
      const result = event.results[0];
      const alts: string[] = [];
      for (let i = 0; i < result.length; i++) {
        alts.push(result[i].transcript);
      }
      const expected = normalize(current.es);
      const ok = alts.some((a) => normalize(a) === expected);
      setTranscript(alts[0] ?? "");
      setMatched(ok);
      setState("result");
      setTimeout(() => onAnswer(ok), 1600);
    };
    r.onerror = (event) => {
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setState("denied");
      } else {
        setState("no-speech");
      }
    };
    r.onend = () => {
      setState((s) => (s === "listening" ? "no-speech" : s));
    };

    recognitionRef.current = r;
    setState("listening");
    try {
      r.start();
    } catch {
      setState("no-speech");
    }
  };

  if (state === "unsupported") {
    return (
      <div className="card text-sm">
        <div className="font-semibold mb-1">Spracherkennung nicht verfügbar</div>
        <div className="text-zinc-500">
          Dein Browser unterstützt die Web Speech API nicht. Auf iPhone/iPad
          bitte Safari benutzen, am Mac/PC Chrome.
        </div>
      </div>
    );
  }

  if (state === "denied") {
    return (
      <div className="card text-sm">
        <div className="font-semibold mb-1">Mikrofon blockiert</div>
        <div className="text-zinc-500">
          Bitte erlaube den Mikrofon-Zugriff in den Browser-Einstellungen und
          lade die Seite neu.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {state === "idle" && (
        <button className="btn-primary w-full" onClick={start}>
          🎤 Auf Spanisch sprechen
        </button>
      )}

      {state === "listening" && (
        <div className="card text-center">
          <div className="text-3xl animate-pulse">🎤</div>
          <div className="text-sm text-zinc-500 mt-2">Hört zu… sprich jetzt</div>
          <button
            type="button"
            onClick={() => recognitionRef.current?.stop()}
            className="mt-3 text-xs text-zinc-500 underline"
          >
            Abbrechen
          </button>
        </div>
      )}

      {state === "no-speech" && (
        <>
          <div className="card text-sm text-zinc-500">
            Nichts verstanden. Bitte erneut versuchen.
          </div>
          <button className="btn-primary w-full" onClick={start}>
            🎤 Nochmal
          </button>
        </>
      )}

      {state === "result" && (
        <div
          className={`card ${
            matched ? "ring-2 ring-emerald-500" : "ring-2 ring-rose-500"
          }`}
        >
          <div className="text-xs text-zinc-500">Du hast gesagt</div>
          <div className="text-lg">„{transcript}"</div>
          <div className="text-xs text-zinc-500 mt-3">Richtig wäre</div>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">{current.es}</div>
            <SpeakerButton text={current.es} />
          </div>
        </div>
      )}
    </div>
  );
};
