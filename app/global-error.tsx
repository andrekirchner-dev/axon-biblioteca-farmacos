"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="pt-BR">
      <body style={{ background: "#080c10", color: "#f0ede6", fontFamily: "monospace", padding: 32 }}>
        <h2 style={{ color: "#c96a6a", marginBottom: 12 }}>Erro na aplicação</h2>
        <pre style={{
          background: "#0d1319", padding: 16, borderRadius: 8,
          color: "#8a9aaa", fontSize: 12, overflowX: "auto", marginBottom: 16,
        }}>
          {error?.message ?? String(error)}
        </pre>
        <button
          onClick={reset}
          style={{
            padding: "10px 20px", borderRadius: 8, cursor: "pointer",
            background: "#d97757", border: "none", color: "#080c10",
            fontFamily: "monospace", fontSize: 12,
          }}
        >
          Tentar novamente
        </button>
      </body>
    </html>
  );
}
