"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Drug } from "@/lib/data/drugs";
import { C, FONTS } from "@/lib/tokens";

export default function ReceptorMap({ drug }: { drug: Drug }) {
  const [selected, setSelected] = useState<string | null>(null);
  const sel = selected ? drug.receptors.find(r => r.name === selected) ?? null : null;

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        {drug.receptors.map(r => (
          <button key={r.name}
            onClick={() => setSelected(r.name === selected ? null : r.name)}
            style={{
              padding: "8px 16px", borderRadius: 14, fontSize: 12,
              fontFamily: FONTS.mono, fontWeight: r.primary ? 700 : 400,
              border: `1px solid ${selected === r.name ? drug.accent : r.primary ? drug.accent + "55" : C.border}`,
              background: selected === r.name ? drug.accent + "22" : r.primary ? drug.accent + "11" : "transparent",
              color: selected === r.name ? drug.accent : r.primary ? drug.accent + "cc" : C.muted,
              cursor: "pointer", transition: "all 0.15s",
              boxShadow: r.primary ? `0 0 12px ${drug.accent}22` : "none",
            }}>
            {r.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {sel ? (
          <motion.div key={sel.name}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{ background: C.bg, border: `1px solid ${drug.accent}33`, borderRadius: 20, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 10, height: 10, borderRadius: "50%",
                background: sel.primary ? drug.accent : C.muted,
                boxShadow: sel.primary ? `0 0 8px ${drug.accent}` : "none",
              }} />
              <h3 style={{ color: C.text, fontFamily: FONTS.serif, fontSize: 18, margin: 0 }}>{sel.name}</h3>
              {sel.primary && (
                <span style={{
                  fontSize: 9, padding: "3px 8px", borderRadius: 99,
                  background: drug.accent + "22", color: drug.accent,
                  fontFamily: FONTS.mono, letterSpacing: "0.12em",
                }}>PRIMÁRIO</span>
              )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {([["Ação", sel.action], ["Afinidade", sel.affinity]] as const).map(([k, v]) => (
                <div key={k} style={{ padding: "10px 14px", background: C.surface, borderRadius: 12, border: `1px solid ${C.border}` }}>
                  <div style={{ color: C.muted, fontSize: 10, fontFamily: FONTS.mono, marginBottom: 4 }}>{k.toUpperCase()}</div>
                  <div style={{ color: C.text, fontSize: 13, fontFamily: FONTS.mono }}>{v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ color: C.faint, fontSize: 12, fontFamily: FONTS.mono, textAlign: "center", padding: "24px 0" }}>
            Selecione um receptor para ver detalhes
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{
        marginTop: 20, padding: "14px 18px", borderRadius: 16,
        background: C.panel, border: `1px solid ${C.border}`,
      }}>
        <div style={{ color: C.muted, fontSize: 10, fontFamily: FONTS.mono, letterSpacing: "0.12em", marginBottom: 6 }}>MECANISMO</div>
        <p style={{ color: C.text, fontSize: 13, fontFamily: FONTS.body, lineHeight: 1.7, margin: 0 }}>{drug.mechanism}</p>
      </div>
    </div>
  );
}
