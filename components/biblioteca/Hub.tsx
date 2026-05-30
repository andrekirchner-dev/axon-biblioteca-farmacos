"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Pill, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { DRUGS, type Drug } from "@/lib/data/drugs";
import { C, FONTS } from "@/lib/tokens";
import DrugCard from "./DrugCard";
import DrugPage from "./DrugPage";

export default function Hub({ user }: { user: User }) {
  const [search, setSearch]           = useState("");
  const [filterClass, setFilterClass] = useState("Todos");
  const [selected, setSelected]       = useState<Drug | null>(null);

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

  if (selected) {
    return <DrugPage drug={selected} goBack={() => setSelected(null)} />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key="hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: C.orange + "18", border: `1px solid ${C.orange}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Pill size={22} color={C.orange} />
              </div>
              <button
                onClick={() => signOut(getFirebaseAuth())}
                title="Sair"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: C.faint, padding: 4, borderRadius: 8,
                  display: "flex", alignItems: "center", gap: 4,
                  fontSize: 10, fontFamily: FONTS.mono,
                }}
              >
                <LogOut size={12} />
              </button>
            </div>
          </div>

          {/* Avatar */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginBottom: 16,
            padding: "8px 12px", background: C.panel, borderRadius: 12, border: `1px solid ${C.border}`,
          }}>
            {user.photoURL && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.photoURL} alt="" width={24} height={24}
                style={{ borderRadius: "50%", flexShrink: 0 }} />
            )}
            <span style={{ color: C.muted, fontSize: 11, fontFamily: FONTS.mono }}>
              {user.displayName ?? user.email}
            </span>
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
          <div style={{ display: "flex", gap: 6, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
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
        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12, paddingBottom: 60 }}>
          {filtered.map((drug, i) => (
            <motion.div key={drug.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}>
              <DrugCard drug={drug} onClick={() => setSelected(drug)} />
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
    </AnimatePresence>
  );
}
