"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  signInWithPopup,
  GoogleAuthProvider,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp, increment } from "firebase/firestore";
import { getFirebaseAuth, isFirebaseConfigured, getDb } from "@/lib/firebase";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signOutUser: () => Promise<void>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signOutUser = async () => {
    const auth = getFirebaseAuth();
    if (auth) await firebaseSignOut(auth);
  };

  const signInWithGoogle = async () => {
    const auth = getFirebaseAuth();
    if (!auth || !isFirebaseConfigured()) {
      return { success: false, error: "Google sign-in isn't configured yet." };
    }
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const u = result.user;
      const db = getDb();
      if (db) {
        const userRef = doc(db, "users", u.uid);
        const existing = await getDoc(userRef).catch(() => null);
        const isNew = !existing?.exists();
        await setDoc(
          userRef,
          {
            name: u.displayName ?? "",
            email: u.email ?? "",
            phone: u.phoneNumber ?? "",
            photoURL: u.photoURL ?? "",
            lastLoginAt: serverTimestamp(),
            loginCount: increment(1),
            ...(isNew ? { createdAt: serverTimestamp() } : {}),
          },
          { merge: true }
        ).catch(() => {});
      }
      return { success: true };
    } catch {
      return { success: false, error: "Google sign-in failed. Please try again." };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOutUser, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
