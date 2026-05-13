import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { auth, googleProvider, firebaseConfigured } from "../firebase";

export interface AuthState {
  user: User | null;
  ready: boolean;
  configured: boolean;
}

export const useAuth = (): AuthState & {
  signIn: () => Promise<void>;
  logOut: () => Promise<void>;
} => {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(!firebaseConfigured);

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
    });
  }, []);

  const signIn = async () => {
    if (!auth) return;
    await signInWithPopup(auth, googleProvider);
  };
  const logOut = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  return { user, ready, configured: firebaseConfigured, signIn, logOut };
};
