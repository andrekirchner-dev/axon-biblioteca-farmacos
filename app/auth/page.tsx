"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { getFirebaseAuth, googleProvider } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { C, FONTS } from "@/lib/tokens";

export default function AuthPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Se já estiver logado, vai para biblioteca
  useEffect(() => {
    if (!loading && user) router.replace("/biblioteca");
  }, [user, loading, router]);

  async function handleGoogleLogin() {
    try {
      await signInWithPopup(getFirebaseAuth(), googleProvider);
    } catch (err) {
      console.error(err);
    }
  }

  // Renderiza o formulário imediatamente — não espera Firebase
  return (
    <div style={{
      minHeight: "100vh", background: C.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "0 20px",
    }}>
      <div style={{
        width: "100%", maxWidth: 400,
        background: C.surface, border: `1px solid ${C.border}`,
        borderRadius: 28, padding: "48px 32px",
        boxShadow: `0 0 80px ${C.orange}08`,
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        {/* Logo */}
        <div style={{
          width: 64, height: 64, borderRadius: 18,
          background: C.orange + "18", border: `1px solid ${C.orange}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 24,
        }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="6" fill={C.orange} opacity="0.9" />
            <circle cx="16" cy="16" r="12" stroke={C.orange} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
            <circle cx="16" cy="4"  r="2.5" fill={C.blue} />
            <circle cx="28" cy="22" r="2.5" fill={C.violet} />
            <circle cx="4"  cy="22" r="2.5" fill={C.green} />
          </svg>
        </div>

        <div style={{ color: C.orange, fontSize: 9, fontFamily: FONTS.mono, letterSpacing: "0.22em", marginBottom: 8 }}>
          AXON · PHARMLIB
        </div>
        <h1 style={{
          fontFamily: FONTS.serif, fontSize: 26, color: C.text,
          textAlign: "center", marginBottom: 6, letterSpacing: "0.04em",
        }}>
          Axonpédia
        </h1>
        <p style={{
          fontFamily: FONTS.body, fontSize: 13, color: C.muted,
          textAlign: "center", lineHeight: 1.6, marginBottom: 36,
        }}>
          Biblioteca interativa de psicofarmacologia para psiquiatras e residentes
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            width: "100%", padding: "14px 20px", borderRadius: 14,
            border: `1px solid ${C.borderM}`, background: C.panel,
            cursor: loading ? "wait" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
            color: loading ? C.muted : C.text,
            fontFamily: FONTS.mono, fontSize: 12, letterSpacing: "0.06em",
            transition: "all 0.15s", opacity: loading ? 0.6 : 1,
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.borderColor = C.orange + "55"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.borderM; }}
        >
          {loading ? (
            <>
              <div style={{
                width: 18, height: 18, border: `2px solid ${C.muted}`,
                borderTopColor: "transparent", borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }} />
              verificando sessão…
            </>
          ) : (
            <>
              <GoogleIcon />
              Entrar com Google
            </>
          )}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

        <p style={{
          marginTop: 24, fontFamily: FONTS.mono, fontSize: 10,
          color: C.faint, textAlign: "center", lineHeight: 1.6,
        }}>
          Acesso restrito a profissionais de saúde
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}
