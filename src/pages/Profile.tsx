import { VOCABULARY } from "../data/vocabulary";
import type { UserProgress } from "../types";

export default function Profile({
  progress,
  user,
  configured,
  onSignIn,
  onSignOut,
  onGoalChange,
  onReset,
}: {
  progress: UserProgress;
  user: { displayName?: string | null; email?: string | null } | null;
  configured: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
  onGoalChange: (n: number) => void;
  onReset: () => void;
}) {
  const learned = Object.values(progress.cards).filter((c) => c.repetitions > 0).length;
  const total = VOCABULARY.length;

  const toggleDark = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Profil</h1>

      <div className="card">
        {!configured ? (
          <p className="text-sm text-zinc-500">
            Firebase ist nicht konfiguriert – dein Fortschritt wird nur lokal im Browser gespeichert.
          </p>
        ) : user ? (
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{user.displayName ?? user.email}</div>
              <div className="text-xs text-zinc-500">{user.email}</div>
            </div>
            <button className="btn-secondary text-sm" onClick={onSignOut}>Abmelden</button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm">Mit Google anmelden, um deinen Fortschritt geräteübergreifend zu synchronisieren.</p>
            <button className="btn-primary w-full" onClick={onSignIn}>Mit Google anmelden</button>
          </div>
        )}
      </div>

      <div className="card space-y-2">
        <h2 className="font-semibold">Statistik</h2>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-2xl font-bold">{learned}</div>
            <div className="text-xs text-zinc-500">von {total} Vokabeln</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{progress.totalReviews}</div>
            <div className="text-xs text-zinc-500">Wiederholungen</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{progress.streak.count}</div>
            <div className="text-xs text-zinc-500">Tage-Streak</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="mb-2 font-semibold">Tägliches Ziel</h2>
        <div className="flex flex-wrap gap-2">
          {[10, 20, 30, 50].map((n) => (
            <button
              key={n}
              onClick={() => onGoalChange(n)}
              className={`rounded-full px-4 py-2 text-sm ${
                progress.dailyGoal === n
                  ? "bg-terra-600 text-white"
                  : "bg-sand-100 dark:bg-zinc-700"
              }`}
            >
              {n} Karten
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="mb-2 font-semibold">Darstellung</h2>
        <button className="btn-secondary" onClick={toggleDark}>
          Hell/Dunkel umschalten
        </button>
      </div>

      <div className="card border border-rose-200 dark:border-rose-900">
        <h2 className="mb-2 font-semibold text-rose-700 dark:text-rose-400">Gefahrenzone</h2>
        <button
          className="btn bg-rose-600 text-white hover:bg-rose-700"
          onClick={() => {
            if (confirm("Wirklich allen Fortschritt zurücksetzen?")) onReset();
          }}
        >
          Fortschritt zurücksetzen
        </button>
      </div>
    </div>
  );
}
