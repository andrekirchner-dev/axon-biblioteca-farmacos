"use client";

import { motion } from "framer-motion";
import type { Drug } from "@/lib/data/drugs";
import { C, FONTS, SEVERITY_COLORS } from "@/lib/tokens";

const SEVERITY_ORDER: Record<string, number> = { critical: 0, high: 1, moderate: 2, low: 3 };
const SEVERITY_LABELS: Record<string, string> = {
  critical: "CONTRAINDICADO",
  high:     "ALTO RISCO",
  moderate: "MODERADO",
  low:      "MONITORAR",
};

export default function InteractionsTab({ drug }: { drug: Drug }) {
  const sorted = [...drug.interactions].sort(
    (a, b) => (SEVERITY_ORDER[a.severity] ?? 4) - (SEVERITY_ORDER[b.severity] ?? 4)
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {sorted.map((ix, i) => (
        <motion.div key={ix.drug}
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04 }}
          style={{
            padding: "14px 16px", borderRadius: 16,
            background: C.bg,
            border: `1px solid ${SEVERITY_COLORS[ix.severity]}33`,
            borderLeft: `3px solid ${SEVERITY_COLORS[ix.severity]}`,
          }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <span style={{ color: C.text, fontWeight: 600, fontSize: 13 }}>{ix.drug}</span>
            <span style={{
              fontSize: 9, padding: "3px 8px", borderRadius: 99, fontWeight: 700,
              background: SEVERITY_COLORS[ix.severity] + "22",
              color: SEVERITY_COLORS[ix.severity],
              fontFamily: FONTS.mono, letterSpacing: "0.08em",
              whiteSpace: "nowrap", marginLeft: 8,
            }}>
              {SEVERITY_LABELS[ix.severity] ?? ix.risk}
            </span>
          </div>
          <p style={{ color: C.muted, fontSize: 12, margin: 0, fontFamily: FONTS.body, lineHeight: 1.6 }}>
            {ix.mechanism}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
