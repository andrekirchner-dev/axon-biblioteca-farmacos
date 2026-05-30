"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { C } from "@/lib/tokens";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/auth");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div style={{
        minHeight: "100vh", background: C.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          width: 32, height: 32, border: `2px solid ${C.orange}`,
          borderTopColor: "transparent", borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return <>{children}</>;
}
