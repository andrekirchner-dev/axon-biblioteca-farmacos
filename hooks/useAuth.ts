"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

export function useAuth() {
  const [user, setUser]       = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    let auth;
    try {
      auth = getFirebaseAuth();
    } catch (e) {
      console.error("Firebase auth init failed:", e);
      setError(String(e));
      setLoading(false);
      return;
    }

    // Timeout fallback — se Firebase não responder em 8s, desbloqueia
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 8000);

    const unsub = onAuthStateChanged(
      auth,
      (u) => {
        clearTimeout(timeout);
        setUser(u);
        setLoading(false);
      },
      (err) => {
        clearTimeout(timeout);
        console.error("Auth state error:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => {
      clearTimeout(timeout);
      unsub();
    };
  }, []);

  return { user, loading, error };
}
