"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft, Layers, BookOpen, Calculator, Target, GitCompare,
} from "lucide-react";
import type { Drug } from "@/lib/data/drugs";
import { C, FONTS } from "@/lib/tokens";
import Molecule3D from "./Molecule3D";
import ClinicalTab from "./ClinicalTab";
import DoseCalculator from "./DoseCalculator";
import ReceptorMap from "./ReceptorMap";
import InteractionsTab from "./InteractionsTab";

const TABS = [
  { id: "molecule",      label: "3D",          Icon: Layers },
  { id: "clinical",      label: "Ficha",        Icon: BookOpen },
  { id: "dose",          label: "Dose",         Icon: Calculator },
  { id: "receptors",     label: "Receptores",   Icon: Target },
  { id: "interactions",  label: "Interações",   Icon: GitCompare },
] as const;

type TabId = typeof TABS[number]["id"];

interface Props {
  drug: Drug;
  goBack: () => void;
}

export default function DrugPage({ drug, goBack }: Props) {
  const [tab, setTab] = useState<TabId>("molecule");

  return (
    <motion.div
      key={`drug-${drug.id}`}
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 60, opacity: 0 }}
      style={{ minHeight: "100vh", paddingBottom: 100 }}
    >
      {/* Header */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: C.surface + "ee", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.border}`, padding: "14px 20px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={goBack} style={{
            width: 38, height: 38, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: `1px solid ${C.border}`, background: C.panel,
            cursor: "pointer", color: C.text, flexShrink: 0,
          }}>
            <ChevronLeft size={20} />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ color: C.muted, fontSize: 10, fontFamily: FONTS.mono, letterSpacing: "0.16em" }}>
              {drug.class} · {drug.subclass}
            </div>
            <h1 style={{
              color: C.text, margin: 0, marginTop: 2,
              fontFamily: FONTS.serif, fontSize: 22, letterSpacing: "0.06em",
            }}>{drug.name}</h1>
          </div>
          <div style={{
            padding: "4px 12px", borderRadius: 99, fontSize: 10,
            border: `1px solid ${drug.accent}55`, background: drug.accent + "11",
            color: drug.accent, fontFamily: FONTS.mono, flexShrink: 0,
          }}>{drug.formula}</div>
        </div>
      </div>

      {/* Molécula hero */}
      {tab === "molecule" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0 10px" }}>
          <div style={{
            width: 280, height: 280, borderRadius: 999,
            background: `radial-gradient(circle, ${drug.accent}11 0%, transparent 70%)`,
            border: `1px solid ${drug.accent}22`,
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <Molecule3D drug={drug} size={260} />
            <div style={{
              position: "absolute", bottom: -14,
              padding: "4px 14px", borderRadius: 99, fontSize: 10,
              background: C.surface, border: `1px solid ${C.border}`,
              color: C.muted, fontFamily: FONTS.mono,
            }}>arraste para girar</div>
          </div>

          <div style={{ marginTop: 30, padding: "0 20px", width: "100%", maxWidth: 480 }}>
            <div style={{ color: C.muted, fontSize: 10, fontFamily: FONTS.mono, letterSpacing: "0.12em", marginBottom: 8 }}>IUPAC</div>
            <p style={{ color: C.faint, fontSize: 11, fontFamily: FONTS.mono, lineHeight: 1.7, margin: 0 }}>{drug.iupac}</p>
            <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[
                { label: "Meia-vida", value: drug.halfLife },
                { label: "T½ max",   value: drug.tMax },
                { label: "Biodispo.", value: drug.bioavailability },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  padding: "12px 10px", borderRadius: 14, textAlign: "center",
                  background: C.panel, border: `1px solid ${C.border}`,
                }}>
                  <div style={{ color: drug.accent, fontSize: 14, fontWeight: 700, fontFamily: FONTS.serif }}>{value}</div>
                  <div style={{ color: C.muted, fontSize: 9, marginTop: 3, fontFamily: FONTS.mono, letterSpacing: "0.06em" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab content */}
      <div style={{ padding: "20px", maxWidth: 520, margin: "0 auto" }}>
        {tab === "clinical"     && <ClinicalTab drug={drug} />}
        {tab === "dose"         && <DoseCalculator drug={drug} />}
        {tab === "receptors"    && <ReceptorMap drug={drug} />}
        {tab === "interactions" && <InteractionsTab drug={drug} />}
      </div>

      {/* Bottom tab bar */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 560,
        background: C.surface + "f0", backdropFilter: "blur(24px)",
        borderTop: `1px solid ${C.border}`,
        padding: "10px 16px 20px", zIndex: 60,
      }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {TABS.map(({ id, label, Icon }) => {
            const active = tab === id;
            return (
              <button key={id} onClick={() => setTab(id)} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 4, border: "none", cursor: "pointer", padding: "6px 10px",
                borderRadius: 14,
                background: active ? drug.accent + "18" : "transparent",
                color: active ? drug.accent : C.muted,
                transition: "all 0.15s",
              }}>
                <Icon size={20} />
                <span style={{ fontSize: 9, fontFamily: FONTS.mono, letterSpacing: "0.08em" }}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
