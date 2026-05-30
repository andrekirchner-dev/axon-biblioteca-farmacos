"use client";

import { C } from "@/lib/tokens";

export default function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        html, body { margin: 0; padding: 0; }

        /* ── MOBILE: passthrough direto ─────────────── */
        .ps-bg, .ps-spk-l, .ps-spk-r { display: none; }
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
        .ps-island, .ps-home-bar, .ps-usbc { display: none; }
        .ps-content { display: block; }

        /* ── DESKTOP: iPhone 17 mockup ──────────────── */
        @media (min-width: 800px) {
          html, body { height: 100%; overflow: hidden; }

          /* Fundo com gradiente nas cores do app + ruído fractal */
          .ps-bg {
            display: block;
            position: fixed; inset: 0; z-index: -1;
            background:
              radial-gradient(ellipse 70% 55% at 50% -5%,  rgba(217,119,87,0.18) 0%, transparent 60%),
              radial-gradient(ellipse 55% 45% at 88% 88%,  rgba(106,155,204,0.13) 0%, transparent 60%),
              radial-gradient(ellipse 45% 40% at 12% 72%,  rgba(155,122,204,0.09) 0%, transparent 60%),
              linear-gradient(170deg, #0d1520 0%, #080c10 45%, #060810 100%);
          }
          .ps-bg::after {
            content: '';
            position: absolute; inset: 0; opacity: 0.04;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
            background-size: 200px 200px;
          }

          .ps-layout {
            display: flex; align-items: center; justify-content: center;
            min-height: 100vh; padding: 20px 40px;
            box-sizing: border-box; overflow: hidden;
          }

          /* ── Wrapper externo — sombra projetada no chão ── */
          .ps-phone-outer {
            position: relative; flex-shrink: 0;
          }
          /* Sombra difusa sob o celular */
          .ps-phone-outer::before {
            content: '';
            position: absolute;
            bottom: -60px; left: 4%;
            width: 92%; height: 100px;
            background: radial-gradient(ellipse at 50% 20%, rgba(0,0,0,0.80) 0%, transparent 70%);
            filter: blur(28px);
            z-index: -1; pointer-events: none;
          }
          /* Sombra direcional lateral (profundidade 3D) */
          .ps-phone-outer::after {
            content: '';
            position: absolute;
            bottom: -30px; left: 10%;
            width: 80%; height: 60px;
            background: radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 70%);
            filter: blur(12px);
            z-index: -1; pointer-events: none;
          }

          /* ── Botões físicos ── */
          .ps-btn {
            display: block; position: absolute;
          }

          /* Action Button — topo esquerda, cor de marca */
          .ps-action {
            left: -3px; top: 106px;
            width: 3px; height: 34px;
            background: linear-gradient(180deg, ${C.orange} 0%, #b05530 100%);
            border-radius: 1.5px 0 0 1.5px;
            box-shadow:
              -1.5px 0 4px rgba(0,0,0,0.7),
              inset 0 1px 0 rgba(255,255,255,0.25),
              inset 0 -1px 0 rgba(0,0,0,0.3);
          }
          /* Volume Up */
          .ps-vol-up {
            left: -3px; top: 158px;
            width: 3px; height: 62px;
            background: linear-gradient(90deg, #555558 0%, #434345 100%);
            border-radius: 1.5px 0 0 1.5px;
            box-shadow:
              -1.5px 0 4px rgba(0,0,0,0.7),
              inset 0 1px 0 rgba(255,255,255,0.14),
              inset 0 -1px 0 rgba(0,0,0,0.25);
          }
          /* Volume Down */
          .ps-vol-dn {
            left: -3px; top: 236px;
            width: 3px; height: 62px;
            background: linear-gradient(90deg, #555558 0%, #434345 100%);
            border-radius: 1.5px 0 0 1.5px;
            box-shadow:
              -1.5px 0 4px rgba(0,0,0,0.7),
              inset 0 1px 0 rgba(255,255,255,0.14),
              inset 0 -1px 0 rgba(0,0,0,0.25);
          }
          /* Side / Power */
          .ps-power {
            right: -3px; top: 182px;
            width: 3px; height: 90px;
            background: linear-gradient(270deg, #555558 0%, #434345 100%);
            border-radius: 0 1.5px 1.5px 0;
            box-shadow:
              1.5px 0 4px rgba(0,0,0,0.7),
              inset 0 1px 0 rgba(255,255,255,0.14),
              inset 0 -1px 0 rgba(0,0,0,0.25);
          }

          /* ── Corpo — moldura alumínio escovado ── */
          .ps-body {
            width: 393px; height: 852px;
            border-radius: 54px;
            padding: 11px;
            position: relative;
            /* Gradiente alumínio: luz vindo do topo-esquerda */
            background: linear-gradient(162deg,
              #606064 0%,
              #454548 4%,
              #323234 14%,
              #282829 38%,
              #222223 65%,
              #1c1c1d 84%,
              #181819 100%);
            box-shadow:
              /* Chanfro superior — highlight metálico */
              inset 0  1.5px 0 rgba(255,255,255,0.30),
              /* Chanfro esquerdo */
              inset  1.5px 0 0 rgba(255,255,255,0.16),
              /* Chanfro direito — sombra */
              inset -1.5px 0 0 rgba(0,0,0,0.40),
              /* Chanfro inferior */
              inset 0 -1.5px 0 rgba(0,0,0,0.50),
              /* Anel externo muito sutil */
              0 0 0 0.5px rgba(255,255,255,0.07),
              /* Separador interno entre moldura e tela */
              0 0 0 1.5px rgba(0,0,0,0.50),
              /* Sombra principal */
              0 20px 40px rgba(0,0,0,0.55),
              0 50px 100px rgba(0,0,0,0.45),
              /* Glow da marca */
              0 0 80px rgba(217,119,87,0.06);
          }

          /* ── Tela — vidro OLED ── */
          .ps-screen {
            width: 100%; height: 100%;
            border-radius: 45px;
            overflow: hidden;
            background: #080c10;
            position: relative;
            /* Borda interna da tela */
            box-shadow:
              inset 0 0 0 0.5px rgba(255,255,255,0.04),
              inset 0 2px 8px rgba(0,0,0,0.60);
          }
          /* Reflexo diagonal principal do vidro */
          .ps-screen::before {
            content: '';
            position: absolute; inset: 0; z-index: 31;
            border-radius: 45px;
            background: linear-gradient(135deg,
              rgba(255,255,255,0.08) 0%,
              rgba(255,255,255,0.03) 25%,
              transparent 45%);
            pointer-events: none;
          }
          /* Brilho suave na borda superior da tela */
          .ps-screen::after {
            content: '';
            position: absolute; inset: 0; z-index: 30;
            border-radius: 45px;
            background: radial-gradient(ellipse 70% 20% at 50% 0%,
              rgba(255,255,255,0.05) 0%, transparent 100%);
            pointer-events: none;
          }

          /* ── Dynamic Island ── */
          .ps-island {
            display: block;
            position: absolute;
            top: 13px; left: 50%;
            transform: translateX(-50%);
            /* Proporções reais iPhone 17 */
            width: 126px; height: 37px;
            background: #000;
            border-radius: 50px;
            z-index: 22;
            box-shadow:
              0 0 0 0.5px rgba(255,255,255,0.04),
              inset 0 1px 3px rgba(0,0,0,1),
              0 2px 8px rgba(0,0,0,0.9);
          }

          /* ── Home Indicator ── */
          .ps-home-bar {
            display: block;
            position: absolute;
            bottom: 8px; left: 50%;
            transform: translateX(-50%);
            width: 134px; height: 5px;
            background: rgba(255,255,255,0.22);
            border-radius: 3px;
            z-index: 22; pointer-events: none;
          }

          /* ── Área de conteúdo com safe areas ── */
          .ps-content {
            position: absolute;
            top: 56px;    /* Dynamic Island: 13 + 37 + 6 */
            bottom: 22px; /* Home bar: 8 + 5 + 9 */
            left: 0; right: 0;
            display: flex; flex-direction: column;
            overflow-y: auto; overflow-x: hidden;
            overscroll-behavior: contain;
            scrollbar-width: none;
          }
          .ps-content::-webkit-scrollbar { display: none; }
          .ps-content > * { flex: 1; min-height: 0 !important; }

          /* ── Frame inferior: USB-C + speaker grilles ── */
          /* USB-C — porta central, recuada */
          .ps-usbc {
            display: block;
            position: absolute;
            bottom: 4px; left: 50%;
            transform: translateX(-50%);
            width: 52px; height: 5px;
            background: rgba(0,0,0,0.75);
            border-radius: 3px;
            box-shadow:
              inset 0 1.5px 2px rgba(0,0,0,1),
              0 0 0 0.5px rgba(255,255,255,0.06);
          }

          /* Speaker grilles — grade de dots */
          .ps-spk-l, .ps-spk-r {
            display: block;
            position: absolute;
            bottom: 4.5px;
            width: 40px; height: 4px;
            background-image: radial-gradient(
              circle, rgba(255,255,255,0.18) 1px, transparent 1px
            );
            background-size: 5px 4px;
            background-repeat: repeat-x;
          }
          .ps-spk-l { right: calc(50% + 32px); }
          .ps-spk-r { left:  calc(50% + 32px); }

          /* ── Escala responsiva (zoom ajusta layout, não só visual) ── */
          @media (max-height: 930px) { .ps-phone-outer { zoom: 0.88; } }
          @media (max-height: 830px) { .ps-phone-outer { zoom: 0.78; } }
          @media (max-height: 730px) { .ps-phone-outer { zoom: 0.68; } }
        }
      `}</style>

      {/* Fundo */}
      <div className="ps-bg" aria-hidden="true" />

      <div className="ps-layout">
        <div className="ps-phone-outer">

          {/* Botões laterais */}
          <div className="ps-btn ps-action"  aria-hidden="true" />
          <div className="ps-btn ps-vol-up"  aria-hidden="true" />
          <div className="ps-btn ps-vol-dn"  aria-hidden="true" />
          <div className="ps-btn ps-power"   aria-hidden="true" />

          {/* Corpo */}
          <div className="ps-body">

            {/* Tela */}
            <div className="ps-screen">
              <div className="ps-island"   aria-hidden="true" />
              <div className="ps-content">{children}</div>
              <div className="ps-home-bar" aria-hidden="true" />
            </div>

            {/* Frame inferior */}
            <div className="ps-usbc"  aria-hidden="true" />
            <div className="ps-spk-l" aria-hidden="true" />
            <div className="ps-spk-r" aria-hidden="true" />

          </div>
        </div>
      </div>
    </>
  );
}
