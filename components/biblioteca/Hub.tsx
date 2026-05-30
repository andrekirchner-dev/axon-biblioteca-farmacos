"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, Pill, LogOut, BookOpen, Heart, Calculator, User,
} from "lucide-react";
import { signOut } from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { DRUGS, type Drug } from "@/lib/data/drugs";
import { C, FONTS } from "@/lib/tokens";
import DrugCard from "./DrugCard";
import DrugPage from "./DrugPage";
import DoseCalculator from "./DoseCalculator";

// ── App-level tab bar ──────────────────────────────────────────
type AppTab = "biblioteca" | "calculadora" | "favoritos" | "perfil";

const APP_TABS: { id: AppTab; label: string; Icon: React.ElementType }[] = [
  { id: "biblioteca",  label: "Biblioteca",  Icon: BookOpen    },
  { id: "calculadora", label: "Calculadora", Icon: Calculator  },
  { id: "favoritos",   label: "Favoritos",   Icon: Heart       },
  { id: "perfil",      label: "Perfil",      Icon: User        },
];

// ── Views ──────────────────────────────────────────────────────
function BibliotecaView({ onSelect }: { onSelect: (d: Drug) => void }) {
  const [search, setSearch]           = useState("");
  const [filterClass, setFilterClass] = useState("Todos");

  const classes = useMemo(() => ["Todos", ...new Set(DRUGS.map(d => d.class))], []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return DRUGS.filter(d => {
      const matchSearch = !q
        || d.name.toLowerCase().includes(q)
        || d.class.toLowerCase().includes(q)
        || d.indications.some(i => i.toLowerCase().includes(q));
      const matchClass = filterClass === "Todos" || d.class === filterClass;
      return matchSearch && matchClass;
    });
  }, [search, filterClass]);

  return (
    <motion.div key="biblioteca" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{ color: C.orange, fontSize: 9, fontFamily: FONTS.mono, letterSpacing: "0.2em", marginBottom: 6 }}>
              AXON · PHARMLIB
            </div>
            <h1 style={{ margin: 0, fontFamily: FONTS.serif, fontSize: 28, color: C.text, letterSpacing: "0.04em" }}>
              Biblioteca de<br />Fármacos
            </h1>
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: C.orange + "18", border: `1px solid ${C.orange}44`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Pill size={22} color={C.orange} />
          </div>
        </div>

        {/* Busca */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: C.panel, border: `1px solid ${C.border}`,
          borderRadius: 14, padding: "10px 14px", marginBottom: 12,
        }}>
          <Search size={16} color={C.muted} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar fármaco, classe ou indicação..."
            style={{
              background: "none", border: "none", outline: "none",
              color: C.text, fontSize: 13, fontFamily: FONTS.body, flex: 1,
            }}
          />
          {search && (
            <button onClick={() => setSearch("")}
              style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filtros */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
          {classes.map(cls => (
            <button key={cls} onClick={() => setFilterClass(cls)}
              style={{
                padding: "5px 14px", borderRadius: 99, fontSize: 10, whiteSpace: "nowrap",
                fontFamily: FONTS.mono, letterSpacing: "0.08em",
                border: `1px solid ${filterClass === cls ? C.orange : C.border}`,
                background: filterClass === cls ? C.orange + "18" : "transparent",
                color: filterClass === cls ? C.orange : C.muted,
                cursor: "pointer",
              }}>
              {cls}
            </button>
          ))}
        </div>

        <div style={{ color: C.faint, fontSize: 10, fontFamily: FONTS.mono, letterSpacing: "0.1em", marginBottom: 12 }}>
          {filtered.length} fármaco{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Lista */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12, paddingBottom: 16 }}>
        {filtered.map((drug, i) => (
          <motion.div key={drug.id}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}>
            <DrugCard drug={drug} onClick={() => onSelect(drug)} />
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div style={{
            textAlign: "center", padding: "40px 0",
            color: C.faint, fontFamily: FONTS.mono, fontSize: 12,
          }}>
            Nenhum fármaco encontrado
          </div>
        )}
      </div>
    </motion.div>
  );
}

function CalculadoraView() {
  const [drug, setDrug] = useState<Drug | null>(null);
  const [search, setSearch] = useState("");

  const options = useMemo(() => {
    const q = search.toLowerCase();
    return q ? DRUGS.filter(d => d.name.toLowerCase().includes(q)) : DRUGS;
  }, [search]);

  if (drug) {
    return (
      <motion.div key={`calc-${drug.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div style={{
          padding: "20px 20px 0",
          display: "flex", alignItems: "center", gap: 12, marginBottom: 4,
        }}>
          <button onClick={() => setDrug(null)} style={{
            background: "none", border: `1px solid ${C.border}`,
            borderRadius: 10, padding: "6px 12px", cursor: "pointer",
            color: C.muted, fontFamily: FONTS.mono, fontSize: 11,
          }}>← trocar</button>
          <div>
            <div style={{ color: C.muted, fontSize: 10, fontFamily: FONTS.mono }}>{drug.class}</div>
            <div style={{ color: C.text, fontSize: 16, fontFamily: FONTS.serif }}>{drug.name}</div>
          </div>
        </div>
        <div style={{ padding: "0 20px 16px" }}>
          <DoseCalculator drug={drug} />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div key="calc-picker" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ color: C.orange, fontSize: 9, fontFamily: FONTS.mono, letterSpacing: "0.2em", marginBottom: 6 }}>
          AXON · PHARMLIB
        </div>
        <h1 style={{ margin: 0, fontFamily: FONTS.serif, fontSize: 28, color: C.text, letterSpacing: "0.04em", marginBottom: 16 }}>
          Calculadora<br />de Dose
        </h1>

        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: C.panel, border: `1px solid ${C.border}`,
          borderRadius: 14, padding: "10px 14px", marginBottom: 4,
        }}>
          <Search size={16} color={C.muted} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Selecione um fármaco..."
            style={{
              background: "none", border: "none", outline: "none",
              color: C.text, fontSize: 13, fontFamily: FONTS.body, flex: 1,
            }}
          />
          {search && (
            <button onClick={() => setSearch("")}
              style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}>
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div style={{ padding: "8px 20px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map(d => (
          <button key={d.id} onClick={() => setDrug(d)} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 16px", borderRadius: 14, cursor: "pointer",
            background: C.panel, border: `1px solid ${C.border}`,
            textAlign: "left",
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
              background: d.accent,
            }} />
            <div>
              <div style={{ color: C.text, fontSize: 14, fontFamily: FONTS.serif }}>{d.name}</div>
              <div style={{ color: C.muted, fontSize: 10, fontFamily: FONTS.mono, marginTop: 2 }}>{d.class}</div>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function FavoritosView() {
  return (
    <motion.div key="favoritos" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ color: C.orange, fontSize: 9, fontFamily: FONTS.mono, letterSpacing: "0.2em", marginBottom: 6 }}>
          AXON · PHARMLIB
        </div>
        <h1 style={{ margin: 0, fontFamily: FONTS.serif, fontSize: 28, color: C.text, letterSpacing: "0.04em", marginBottom: 40 }}>
          Favoritos
        </h1>
      </div>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "40px 20px", gap: 12,
      }}>
        <Heart size={40} color={C.faint} strokeWidth={1} />
        <div style={{ color: C.muted, fontFamily: FONTS.serif, fontSize: 18, textAlign: "center" }}>
          Em breve
        </div>
        <div style={{ color: C.faint, fontFamily: FONTS.mono, fontSize: 11, textAlign: "center", lineHeight: 1.6, maxWidth: 240 }}>
          Salve seus fármacos favoritos para acesso rápido
        </div>
      </div>
    </motion.div>
  );
}

function PerfilView({ user }: { user: FirebaseUser }) {
  return (
    <motion.div key="perfil" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ color: C.orange, fontSize: 9, fontFamily: FONTS.mono, letterSpacing: "0.2em", marginBottom: 6 }}>
          AXON · PHARMLIB
        </div>
        <h1 style={{ margin: 0, fontFamily: FONTS.serif, fontSize: 28, color: C.text, letterSpacing: "0.04em", marginBottom: 24 }}>
          Perfil
        </h1>

        {/* Avatar card */}
        <div style={{
          padding: "20px", borderRadius: 20,
          background: C.surface, border: `1px solid ${C.border}`,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
          marginBottom: 20,
        }}>
          {user.photoURL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.photoURL} alt=""
              style={{ width: 72, height: 72, borderRadius: "50%", border: `2px solid ${C.orange}44` }} />
          ) : (
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: C.orange + "22", border: `2px solid ${C.orange}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <User size={32} color={C.orange} />
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <div style={{ color: C.text, fontFamily: FONTS.serif, fontSize: 20 }}>
              {user.displayName ?? "Usuário"}
            </div>
            <div style={{ color: C.muted, fontFamily: FONTS.mono, fontSize: 11, marginTop: 4 }}>
              {user.email}
            </div>
          </div>
        </div>

        {/* Info rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {[
            { label: "Tipo de conta", value: "Google" },
            { label: "Acesso",        value: "Profissional de saúde" },
            { label: "Fármacos",      value: `${DRUGS.length} disponíveis` },
          ].map(({ label, value }) => (
            <div key={label} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "12px 16px", borderRadius: 14,
              background: C.panel, border: `1px solid ${C.border}`,
            }}>
              <span style={{ color: C.muted, fontFamily: FONTS.mono, fontSize: 11 }}>{label}</span>
              <span style={{ color: C.text, fontFamily: FONTS.mono, fontSize: 11 }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Sign out */}
        <button
          onClick={() => signOut(getFirebaseAuth())}
          style={{
            width: "100%", padding: "14px 20px", borderRadius: 14,
            border: `1px solid ${"#ef4444"}33`, background: "#ef444411",
            cursor: "pointer", color: "#ef4444",
            fontFamily: FONTS.mono, fontSize: 12, letterSpacing: "0.06em",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          <LogOut size={14} />
          Sair da conta
        </button>
      </div>
    </motion.div>
  );
}

// ── Hub (root) ─────────────────────────────────────────────────
export default function Hub({ user }: { user: FirebaseUser }) {
  const [appTab, setAppTab]   = useState<AppTab>("biblioteca");
  const [selected, setSelected] = useState<Drug | null>(null);

  if (selected) {
    return <DrugPage drug={selected} goBack={() => setSelected(null)} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Scrollable content area */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        <AnimatePresence mode="wait">
          {appTab === "biblioteca"  && <BibliotecaView key="biblioteca"  onSelect={setSelected} />}
          {appTab === "calculadora" && <CalculadoraView key="calculadora" />}
          {appTab === "favoritos"   && <FavoritosView   key="favoritos"   />}
          {appTab === "perfil"      && <PerfilView       key="perfil"      user={user} />}
        </AnimatePresence>
      </div>

      {/* Bottom app tab bar */}
      <div style={{
        flexShrink: 0,
        background: C.surface + "f4", backdropFilter: "blur(24px)",
        borderTop: `1px solid ${C.border}`,
        padding: "10px 8px 10px",
        display: "flex", justifyContent: "space-around",
      }}>
        {APP_TABS.map(({ id, label, Icon }) => {
          const active = appTab === id;
          return (
            <button key={id} onClick={() => setAppTab(id)} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: 3, border: "none", cursor: "pointer", padding: "6px 12px",
              borderRadius: 14, flex: 1,
              background: active ? C.orange + "15" : "transparent",
              color: active ? C.orange : C.faint,
              transition: "all 0.15s",
            }}>
              <Icon size={20} />
              <span style={{ fontSize: 9, fontFamily: FONTS.mono, letterSpacing: "0.06em" }}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
