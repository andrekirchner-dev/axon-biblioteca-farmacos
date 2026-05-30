"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { Drug } from "@/lib/data/drugs";
import { C, FONTS } from "@/lib/tokens";
import Molecule3D from "./Molecule3D";

interface Props {
  drug: Drug;
  onClick: () => void;
}

export default function DrugCard({ drug, onClick }: Props) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: C.panel, border: `1px solid ${C.border}`,
        borderRadius: 20, padding: "16px", cursor: "pointer",
        textAlign: "left", width: "100%", display: "flex",
        gap: 14, alignItems: "center", transition: "border-color 0.2s",
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = drug.accent + "55")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
    >
      {/* Mini molécula */}
      <div style={{
        width: 64, height: 64, borderRadius: 16,
        background: drug.accent + "11", border: `1px solid ${drug.accent}33`,
        flexShrink: 0, display: "flex", alignItems: "center",
        justifyContent: "center", overflow: "hidden",
      }}>
        <Molecule3D drug={drug} size={64} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: C.muted, fontSize: 9, fontFamily: FONTS.mono, letterSpacing: "0.14em", marginBottom: 3 }}>
          {drug.class.toUpperCase()}
        </div>
        <div style={{ color: C.text, fontSize: 15, fontFamily: FONTS.serif, fontWeight: 600, letterSpacing: "0.04em" }}>
          {drug.name}
        </div>
        <div style={{ color: drug.accent, fontSize: 10, fontFamily: FONTS.mono, marginTop: 3 }}>
          {drug.formula} · {drug.halfLife}
        </div>
        <div style={{ display: "flex", gap: 5, marginTop: 7, flexWrap: "wrap" }}>
          {drug.indications.slice(0, 3).map(ind => (
            <span key={ind} style={{
              fontSize: 9, padding: "2px 8px", borderRadius: 99,
              background: C.bg, border: `1px solid ${C.border}`,
              color: C.muted, fontFamily: FONTS.mono,
            }}>{ind}</span>
          ))}
          {drug.indications.length > 3 && (
            <span style={{
              fontSize: 9, padding: "2px 8px", borderRadius: 99,
              background: C.bg, border: `1px solid ${C.border}`,
              color: C.faint, fontFamily: FONTS.mono,
            }}>+{drug.indications.length - 3}</span>
          )}
        </div>
      </div>

      <ChevronRight size={16} color={C.faint} style={{ flexShrink: 0 }} />
    </motion.button>
  );
}
