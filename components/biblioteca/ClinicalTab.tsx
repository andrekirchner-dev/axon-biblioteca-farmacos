"use client";

import type { Drug } from "@/lib/data/drugs";
import { C, FONTS, SEVERITY_COLORS } from "@/lib/tokens";

export default function ClinicalTab({ drug }: { drug: Drug }) {
  const INFO_ROWS: [string, string][] = [
    ["Fórmula",           drug.formula],
    ["Peso molecular",    drug.mw],
    ["Meia-vida",         drug.halfLife],
    ["Biodisponibilidade",drug.bioavailability],
    ["Ligação proteica",  drug.proteinBinding],
    ["Metabolismo",       drug.metabolism],
    ["Tmax",              drug.tMax],
    ["Eliminação",        drug.elimination],
    ["Início de ação",    drug.onset],
  ];

  return (
    <div>
      {/* Indicações */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ color: C.muted, fontSize: 10, fontFamily: FONTS.mono, letterSpacing: "0.12em", marginBottom: 10 }}>
          INDICAÇÕES
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {drug.indications.map(ind => (
            <span key={ind} style={{
              padding: "5px 12px", borderRadius: 99, fontSize: 11,
              border: `1px solid ${drug.accent}44`, background: drug.accent + "11",
              color: drug.accent, fontFamily: FONTS.mono,
            }}>{ind}</span>
          ))}
        </div>
      </div>

      {/* PK */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ color: C.muted, fontSize: 10, fontFamily: FONTS.mono, letterSpacing: "0.12em", marginBottom: 10 }}>
          FARMACOCINÉTICA
        </div>
        <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}` }}>
          {INFO_ROWS.map(([k, v], i) => (
            <div key={k} style={{
              display: "flex", padding: "10px 16px",
              background: i % 2 === 0 ? C.bg : C.panel,
              borderBottom: i < INFO_ROWS.length - 1 ? `1px solid ${C.border}` : "none",
            }}>
              <span style={{ color: C.muted, fontSize: 11, fontFamily: FONTS.mono, width: "45%", letterSpacing: "0.05em" }}>{k}</span>
              <span style={{ color: C.text, fontSize: 12, fontFamily: FONTS.mono, flex: 1 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Efeitos adversos */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ color: C.muted, fontSize: 10, fontFamily: FONTS.mono, letterSpacing: "0.12em", marginBottom: 10 }}>
          EFEITOS ADVERSOS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {drug.adverseEffects.map(ae => (
            <div key={ae.system} style={{
              padding: "12px 14px", borderRadius: 14,
              background: C.bg,
              border: `1px solid ${SEVERITY_COLORS[ae.severity] ?? C.border}22`,
              borderLeft: `3px solid ${SEVERITY_COLORS[ae.severity] ?? C.border}`,
            }}>
              <div style={{ color: SEVERITY_COLORS[ae.severity] ?? C.muted, fontSize: 10, fontFamily: FONTS.mono, letterSpacing: "0.1em", marginBottom: 5 }}>
                {ae.system.toUpperCase()}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {ae.effects.map(e => (
                  <span key={e} style={{ color: C.text, fontSize: 12, fontFamily: FONTS.body }}>{e}{" "}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monitoramento & Descontinuação */}
      {[
        { label: "MONITORAMENTO",  items: drug.monitoring,       color: C.blue },
        { label: "DESCONTINUAÇÃO", items: [drug.withdrawal],     color: C.gold },
      ].map(({ label, items, color }) => (
        <div key={label} style={{ marginBottom: 16 }}>
          <div style={{ color: C.muted, fontSize: 10, fontFamily: FONTS.mono, letterSpacing: "0.12em", marginBottom: 10 }}>
            {label}
          </div>
          <div style={{ padding: "12px 16px", borderRadius: 14, background: C.bg, border: `1px solid ${color}22` }}>
            {items.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: i < items.length - 1 ? 6 : 0 }}>
                <span style={{ color, marginTop: 2 }}>▸</span>
                <span style={{ color: C.text, fontSize: 12, fontFamily: FONTS.body, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
