let cachedVoice: SpeechSynthesisVoice | null = null;

const pickSpanishVoice = (): SpeechSynthesisVoice | null => {
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  const es =
    voices.find((v) => v.lang.toLowerCase().startsWith("es-es")) ||
    voices.find((v) => v.lang.toLowerCase().startsWith("es")) ||
    null;
  cachedVoice = es;
  return es;
};

// Voices load asynchronously in some browsers.
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null;
    pickSpanishVoice();
  };
}

export const speak = (text: string, rate = 0.9) => {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-ES";
  utter.rate = rate;
  const voice = pickSpanishVoice();
  if (voice) utter.voice = voice;
  window.speechSynthesis.speak(utter);
};
