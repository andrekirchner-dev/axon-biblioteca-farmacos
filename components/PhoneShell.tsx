"use client";

import { C, FONTS } from "@/lib/tokens";

export default function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        html, body { margin: 0; padding: 0; }

        /* ── MOBILE: passthrough direto ───────── */
        .ps-bg          { display: none; }
        .ps-layout      { display: block; }
        .ps-phone-outer { display: block; }
        .ps-btn         { display: none; }
        .ps-body {
          width: 100%; min-height: 100vh;
          background: none; border-radius: 0;
          box-shadow: none; padding: 0;
        }
        .ps-screen {
          width: 100%; height: auto;
          border-radius: 0; overflow: visible;
          background: none; position: relative;
        }
        .ps-island   { display: none; }
        .ps-home-bar { display: none; }
        .ps-content  { display: block; }
        .ps-usbc     { display: none; }

        /* ── DESKTOP: phone shell ─────────────── */
        @media (min-width: 800px) {
          html, body { height: 100%; overflow: hidden; }

          /* Fundo: degradê nas cores do app */
          .ps-bg {
            display: block;
            position: fixed; inset: 0; z-index: -1;
            background:
              radial-gradient(ellipse 70% 55% at 50% -5%,  rgba(217,119,87,0.18) 0%, transparent 60%),
              radial-gradient(ellipse 55% 45% at 88% 88%,  rgba(106,155,204,0.13) 0%, transparent 60%),
              radial-gradient(ellipse 45% 40% at 12% 72%,  rgba(155,122,204,0.09) 0%, transparent 60%),
              linear-gradient(170deg, #0d1520 0%, #080c10 45%, #060810 100%);
          }
          /* Camada de ruído */
          .ps-bg::after {
            content: '';
            position: absolute; inset: 0;
            opacity: 0.04;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
            background-size: 200px 200px;
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

          /* ── Outer wrapper — sombra no chão ── */
          .ps-phone-outer {
            position: relative; flex-shrink: 0;
          }
          .ps-phone-outer::after {
            content: '';
            position: absolute;
            bottom: -48px; left: 8%;
            width: 84%; height: 80px;
            background: radial-gradient(ellipse, rgba(0,0,0,0.70) 0%, transparent 70%);
            filter: blur(20px);
            z-index: -1;
            pointer-events: none;
          }

          /* Botões físicos */
          .ps-btn {
            display: block; position: absolute;
            background: linear-gradient(180deg, #404042, #2e2e30);
          }
          .ps-action {
            left: -4px; top: 116px;
            width: 4px; height: 34px;
            background: linear-gradient(180deg, ${C.orange} 0%, #b85e3a 100%);
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

          /* ── Corpo ── */
          .ps-body {
            width: 393px; height: 852px;
            background: linear-gradient(158deg,
              #3c3c3e 0%, #272729 20%, #1e1e20 55%, #131315 100%);
            border-radius: 55px;
            padding: 13px;
            box-shadow:
              0 0 0 1px rgba(255,255,255,0.13),
              0 0 0 3px rgba(0,0,0,0.55),
              0 30px 60px  rgba(0,0,0,0.65),
              0 70px 140px rgba(0,0,0,0.90),
              inset 0 1px 0 rgba(255,255,255,0.20),
              0 0 90px rgba(217,119,87,0.07);
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
          /* Reflexo de tela */
          .ps-screen::after {
            content: '';
            position: absolute; inset: 0; z-index: 30;
            background: linear-gradient(130deg,
              rgba(255,255,255,0.05) 0%, transparent 45%);
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

          /* Home indicator */
          .ps-home-bar {
            display: block;
            position: absolute;
            bottom: 10px; left: 50%;
            transform: translateX(-50%);
            width: 134px; height: 5px;
            background: rgba(255,255,255,0.28);
            border-radius: 3px;
            z-index: 20;
            pointer-events: none;
          }

          /* Conteúdo com safe areas */
          .ps-content {
            position: absolute;
            /* Safe area: topo = Dynamic Island (14px offset + 37px altura + 6px gap) */
            top: 57px;
            /* Safe area: base = home indicator (10px offset + 5px barra + 8px gap) */
            bottom: 23px;
            left: 0; right: 0;
            display: flex; flex-direction: column;
            overflow-y: auto; overflow-x: hidden;
            overscroll-behavior: contain;
            scrollbar-width: none;
          }
          .ps-content::-webkit-scrollbar { display: none; }
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

          /* Zoom escalonado para telas curtas */
          @media (max-height: 930px) { .ps-phone-outer { zoom: 0.88; } }
          @media (max-height: 830px) { .ps-phone-outer { zoom: 0.78; } }
          @media (max-height: 730px) { .ps-phone-outer { zoom: 0.68; } }
        }
      `}</style>

      {/* Fundo degradê + ruído */}
      <div className="ps-bg" aria-hidden="true" />

      <div className="ps-layout">
        <div className="ps-phone-outer">
          {/* Botões físicos */}
          <div className="ps-btn ps-action"  aria-hidden="true" />
          <div className="ps-btn ps-vol-up"  aria-hidden="true" />
          <div className="ps-btn ps-vol-dn"  aria-hidden="true" />
          <div className="ps-btn ps-power"   aria-hidden="true" />

          <div className="ps-body">
            <div className="ps-screen">
              {/* Safe area topo — Dynamic Island */}
              <div className="ps-island"   aria-hidden="true" />

              {/* Conteúdo do app, respeitando safe areas */}
              <div className="ps-content">
                {children}
              </div>

              {/* Safe area base — Home indicator */}
              <div className="ps-home-bar" aria-hidden="true" />
            </div>
            <div className="ps-usbc" aria-hidden="true" />
          </div>
        </div>
      </div>
    </>
  );
}
