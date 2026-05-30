"use client";

import { useAuth } from "@/hooks/useAuth";
import AuthGuard from "@/components/AuthGuard";
import Hub from "@/components/biblioteca/Hub";
import { C } from "@/lib/tokens";

function BibliotecaContent() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <div style={{
        margin: "0 auto", maxWidth: 560, minHeight: "100vh",
        background: C.surface,
        borderLeft: `1px solid rgba(255,255,255,0.05)`,
        borderRight: `1px solid rgba(255,255,255,0.05)`,
        boxShadow: `0 0 60px ${C.orange}08`,
      }}>
        <Hub user={user} />
      </div>
    </div>
  );
}

export default function BibliotecaPage() {
  return (
    <AuthGuard>
      <BibliotecaContent />
    </AuthGuard>
  );
}
