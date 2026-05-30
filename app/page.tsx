"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { C } from "@/lib/tokens";

export default function Root() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (user) {
      router.replace("/biblioteca");
    } else {
      router.replace("/auth");
    }
  }, [user, loading, router]);

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
