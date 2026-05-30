"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { C, FONTS } from "@/lib/tokens";

export default function Root() {
  const { user, loading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    router.replace(user ? "/biblioteca" : "/auth");
  }, [user, loading, router]);

  if (error) {
    return (
      <div style={{
        minHeight: "100vh", background: C.bg,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 16, padding: 24,
      }}>
        <div style={{ color: C.rose, fontSize: 13, fontFamily: FONTS.mono, textAlign: "center" }}>
          Erro ao conectar com Firebase
        </div>
        <code style={{
          color: C.muted, fontSize: 11, fontFamily: FONTS.mono,
          background: C.panel, padding: "8px 14px", borderRadius: 10,
          maxWidth: 400, wordBreak: "break-all", textAlign: "center",
        }}>
          {error}
        </code>
        <button
          onClick={() => router.replace("/auth")}
          style={{
            marginTop: 8, padding: "10px 20px", borderRadius: 10,
            background: C.orange + "22", border: `1px solid ${C.orange}44`,
            color: C.orange, fontFamily: FONTS.mono, fontSize: 12, cursor: "pointer",
          }}
        >
          Tentar mesmo assim
        </button>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh", background: C.bg,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 12,
    }}>
      <div style={{
        width: 32, height: 32, border: `2px solid ${C.orange}`,
        borderTopColor: "transparent", borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <span style={{ color: C.faint, fontSize: 11, fontFamily: FONTS.mono }}>
        conectando…
      </span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
