"use client";

import { C, FONTS } from "@/lib/tokens";

const FEATURES = [
  "Visualização 3D de moléculas",
  "Mapa de afinidade por receptores",
  "Farmacocinética e posologia",
  "Interações e efeitos adversos",
];

const STACK = ["Next.js", "Firebase", "TypeScript", "Firestore"];

export default function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        html, body { margin: 0; padding: 0; }

        /* ── MOBILE: passthrough direto ───────── */
        .ps-bg     { display: none; }
        .ps-layout { display: block; }
        .ps-brand  { display: none; }
        .ps-phone-outer { display: block; }
        .ps-btn    { display: none; }
        .ps-body   {
          width: 100%; min-height: 100vh;
          background: none; border-radius: 0;
          box-shadow: none; padding: 0;
        }
        .ps-screen {
          width: 100%; height: auto;
          border-radius: 0; overflow: visible;
          background: none; position: relative;
        }
        .ps-island  { display: none; }
        .ps-content { display: block; }
        .ps-usbc    { display: none; }

        /* ── DESKTOP: phone shell ─────────────── */
        @media (min-width: 800px) {
          html, body { height: 100%; overflow: hidden; background: #040608; }

          .ps-bg {
            display: block;
            position: fixed; inset: 0; z-index: -1;
            background: radial-gradient(ellipse 130% 130% at 68% 46%,
              #0c1928 0%, #060a10 55%, #040608 100%);
          }
          .ps-glow-a {
            position: absolute;
            width: 800px; height: 800px;
            right: 160px; top: -360px;
            background: radial-gradient(circle,
              rgba(217,119,87,0.08) 0%, transparent 65%);
            border-radius: 50%;
          }
          .ps-glow-b {
            position: absolute;
            width: 600px; height: 600px;
            right: 60px; bottom: -250px;
            background: radial-gradient(circle,
              rgba(106,155,204,0.06) 0%, transparent 65%);
            border-radius: 50%;
          }
          .ps-glow-c {
            position: absolute;
            width: 400px; height: 400px;
            left: 80px; bottom: -100px;
            background: radial-gradient(circle,
              rgba(155,122,204,0.04) 0%, transparent 65%);
            border-radius: 50%;
          }

          .ps-layout {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px 40px;
            box-sizing: border-box;
            overflow: hidden;
          }

          .ps-brand { display: none; }

          /* ── Outer wrapper para buttons ── */
          .ps-phone-outer {
            position: relative; flex-shrink: 0;
          }

          /* Buttons físicos */
          .ps-btn {
            display: block; position: absolute;
            background: linear-gradient(180deg, #404042, #2e2e30);
          }
          .ps-action {
            left: -4px; top: 116px;
            width: 4px; height: 34px;
            background: linear-gradient(180deg, #d97757 0%, #b85e3a 100%);
            border-radius: 2px 0 0 2px;
          }
          .ps-vol-up {
            left: -4px; top: 172px;
            width: 4px; height: 68px;
            border-radius: 2px 0 0 2px;
          }
          .ps-vol-dn {
            left: -4px; top: 258px;
            width: 4px; height: 68px;
            border-radius: 2px 0 0 2px;
          }
          .ps-power {
            right: -4px; top: 196px;
            width: 4px; height: 96px;
            border-radius: 0 2px 2px 0;
          }

          /* ── Corpo do iPhone ── */
          .ps-body {
            width: 393px; height: 852px;
            background: linear-gradient(158deg,
              #3c3c3e 0%, #272729 20%, #1e1e20 55%, #131315 100%);
            border-radius: 55px;
            padding: 13px;
            box-shadow:
              0 0 0 1px rgba(255,255,255,0.13),
              0 0 0 3px rgba(0,0,0,0.55),
              0 70px 150px rgba(0,0,0,0.97),
              inset 0 1px 0 rgba(255,255,255,0.2),
              0 0 110px rgba(217,119,87,0.08);
            position: relative;
          }

          /* ── Tela ── */
          .ps-screen {
            width: 100%; height: 100%;
            border-radius: 44px;
            overflow: hidden;
            background: #080c10;
            position: relative;
          }
          .ps-screen::after {
            content: '';
            position: absolute; inset: 0; z-index: 30;
            background: linear-gradient(130deg,
              rgba(255,255,255,0.05) 0%,
              transparent 45%);
            border-radius: 44px;
            pointer-events: none;
          }

          /* Dynamic Island */
          .ps-island {
            display: block;
            position: absolute;
            top: 14px; left: 50%;
            transform: translateX(-50%);
            width: 126px; height: 37px;
            background: #000;
            border-radius: 50px; z-index: 20;
            box-shadow:
              0 0 0 1px rgba(255,255,255,0.04),
              inset 0 1px 3px rgba(0,0,0,0.9);
          }

          /* Área de scroll do app — flex para forçar filho a preencher a tela do phone */
          .ps-content {
            width: 100%; height: 100%;
            display: flex; flex-direction: column;
            overflow-y: auto; overflow-x: hidden;
            overscroll-behavior: contain;
            scrollbar-width: none;
          }
          .ps-content::-webkit-scrollbar { display: none; }
          /* Sobrescreve minHeight: 100vh inline para usar altura real da tela do phone */
          .ps-content > * {
            flex: 1;
            min-height: 0 !important;
          }

          /* USB-C */
          .ps-usbc {
            display: block;
            position: absolute; bottom: 6px;
            left: 50%; transform: translateX(-50%);
            width: 56px; height: 5px;
            background: rgba(255,255,255,0.07);
            border-radius: 3px;
          }

          /* zoom afeta o layout (diferente de transform: scale) — phone sempre cabe na tela */
          @media (max-height: 930px) {
            .ps-phone-outer { zoom: 0.88; }
          }
          @media (max-height: 830px) {
            .ps-phone-outer { zoom: 0.78; }
          }
          @media (max-height: 730px) {
            .ps-phone-outer { zoom: 0.68; }
          }
        }

      `}</style>

      {/* Background glow (desktop) */}
      <div className="ps-bg" aria-hidden="true">
        <div className="ps-glow-a" />
        <div className="ps-glow-b" />
        <div className="ps-glow-c" />
      </div>

      <div className="ps-layout">
        {/* iPhone 17 */}
        <div className="ps-phone-outer">
          <div className="ps-btn ps-action"  aria-hidden="true" />
          <div className="ps-btn ps-vol-up"  aria-hidden="true" />
          <div className="ps-btn ps-vol-dn"  aria-hidden="true" />
          <div className="ps-btn ps-power"   aria-hidden="true" />

          <div className="ps-body">
            <div className="ps-screen">
              <div className="ps-island" aria-hidden="true" />
              <div className="ps-content">
                {children}
              </div>
            </div>
            <div className="ps-usbc" aria-hidden="true" />
          </div>
        </div>
      </div>
    </>
  );
}
