"use client";

import { useState } from "react";
import type { Drug } from "@/lib/data/drugs";
import { C, FONTS } from "@/lib/tokens";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  unit: string;
  accent: string;
}

function Slider({ label, value, min, max, step = 1, onChange, unit, accent }: SliderProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ color: C.muted, fontSize: 11, fontFamily: FONTS.mono, letterSpacing: "0.1em" }}>{label}</span>
        <span style={{ color: C.text, fontSize: 13, fontFamily: FONTS.mono, fontWeight: 600 }}>
          {value} {unit}
        </span>
      </div>
      <div style={{ position: "relative", height: 6, background: C.faint, borderRadius: 99 }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%", borderRadius: 99,
          background: `linear-gradient(90deg, ${accent}88, ${accent})`,
          width: `${((value - min) / (max - min)) * 100}%`,
          transition: "width 0.15s",
          pointerEvents: "none",
        }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            position: "absolute", inset: 0, opacity: 0,
            width: "100%", height: "100%", cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
}

export default function DoseCalculator({ drug }: { drug: Drug }) {
  const profiles  = Object.keys(drug.doses);
  const [profile, setProfile] = useState(profiles[0]);
  const [weight, setWeight]   = useState(70);

  const doseInfo = drug.doses[profile] ?? drug.doses[profiles[0]];

  return (
    <div>
      {/* Profile tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {profiles.map(p => (
          <button key={p} onClick={() => setProfile(p)}
            style={{
              padding: "6px 14px", borderRadius: 99, fontSize: 11,
              fontFamily: FONTS.mono, letterSpacing: "0.08em",
              border: `1px solid ${profile === p ? drug.accent : C.border}`,
              background: profile === p ? drug.accent + "22" : "transparent",
              color: profile === p ? drug.accent : C.muted,
              cursor: "pointer", transition: "all 0.15s",
              textTransform: "capitalize",
            }}>
            {p.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Result */}
      <div style={{
        background: C.bg, border: `1px solid ${drug.accent}33`,
        borderRadius: 20, padding: 20, marginBottom: 20,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, textAlign: "center" }}>
          {[
            { label: "Dose inicial", value: `${doseInfo.start} mg`, color: C.blue },
            { label: "Faixa mín.",   value: `${doseInfo.min} mg`,   color: C.green },
            { label: "Faixa máx.",   value: `${doseInfo.max} mg`,   color: C.orange },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <div style={{ color, fontSize: 20, fontWeight: 700, fontFamily: FONTS.serif }}>{value}</div>
              <div style={{ color: C.muted, fontSize: 10, marginTop: 3, fontFamily: FONTS.mono, letterSpacing: "0.06em" }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 16, padding: "10px 14px", borderRadius: 12,
          background: C.surface, border: `1px solid ${C.border}`,
          color: C.muted, fontSize: 11, lineHeight: 1.6, fontFamily: FONTS.body,
        }}>
          {doseInfo.notes}
        </div>
      </div>

      <Slider label="PESO DO PACIENTE" value={weight} min={40} max={150}
        onChange={setWeight} unit="kg" accent={drug.accent} />

      <div style={{
        padding: "12px 16px", borderRadius: 14,
        background: C.rose + "11", border: `1px solid ${C.rose}22`,
        color: C.muted, fontSize: 11, lineHeight: 1.7, fontFamily: FONTS.body,
      }}>
        ⚠️ Esta calculadora é uma ferramenta de apoio clínico. Sempre confirmar doses pela bula local, guideline vigente e avaliação individualizada.
      </div>
    </div>
  );
}
