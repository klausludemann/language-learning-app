import { speak } from "../lib/audio";

export default function SpeakerButton({ text, rate = 0.9, label }: { text: string; rate?: number; label?: string }) {
  return (
    <button
      type="button"
      aria-label={label ?? `Aussprache: ${text}`}
      onClick={() => speak(text, rate)}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sand-100 text-terra-700 hover:bg-sand-200 dark:bg-zinc-700 dark:text-terra-400"
    >
      🔊
    </button>
  );
}
