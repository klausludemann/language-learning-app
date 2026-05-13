import { useCallback, useEffect, useRef, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { CardState, UserProgress } from "../types";
import { newCard, reviewCard, type Rating } from "../lib/srs";

const LOCAL_KEY = "spanisch-progress-v1";

const today = () => new Date().toISOString().slice(0, 10);

const empty: UserProgress = {
  cards: {},
  streak: { count: 0, lastDay: "" },
  totalReviews: 0,
  dailyGoal: 20,
};

const loadLocal = (): UserProgress => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
};

const saveLocal = (p: UserProgress) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(p));
};

export const useProgress = (userId: string | null) => {
  const [progress, setProgress] = useState<UserProgress>(empty);
  const [loaded, setLoaded] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load on mount / userId change
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const local = loadLocal();
      if (userId && db) {
        try {
          const snap = await getDoc(doc(db, "users", userId));
          if (!cancelled && snap.exists()) {
            const remote = snap.data() as UserProgress;
            // remote wins if it has more reviews than local
            const winner = remote.totalReviews >= local.totalReviews ? remote : local;
            setProgress({ ...empty, ...winner });
            setLoaded(true);
            return;
          }
        } catch (e) {
          console.warn("Firestore load failed, using local", e);
        }
      }
      if (!cancelled) {
        setProgress(local);
        setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Debounced save to local + remote
  useEffect(() => {
    if (!loaded) return;
    saveLocal(progress);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      if (userId && db) {
        try {
          await setDoc(doc(db, "users", userId), progress, { merge: true });
        } catch (e) {
          console.warn("Firestore save failed", e);
        }
      }
    }, 1500);
  }, [progress, userId, loaded]);

  const updateStreak = (p: UserProgress): UserProgress => {
    const d = today();
    if (p.streak.lastDay === d) return p;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const count = p.streak.lastDay === yesterday ? p.streak.count + 1 : 1;
    return { ...p, streak: { count, lastDay: d } };
  };

  const review = useCallback((cardId: string, rating: Rating) => {
    setProgress((p) => {
      const existing: CardState = p.cards[cardId] ?? newCard(cardId);
      const updated = reviewCard(existing, rating);
      const next = updateStreak({
        ...p,
        cards: { ...p.cards, [cardId]: updated },
        totalReviews: p.totalReviews + 1,
      });
      return next;
    });
  }, []);

  const setDailyGoal = useCallback((n: number) => {
    setProgress((p) => ({ ...p, dailyGoal: n }));
  }, []);

  const resetAll = useCallback(() => {
    setProgress(empty);
  }, []);

  return { progress, loaded, review, setDailyGoal, resetAll };
};
