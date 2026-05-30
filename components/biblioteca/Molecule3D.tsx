"use client";

import { useEffect, useRef } from "react";
import type { Drug } from "@/lib/data/drugs";

const ATOM_COLORS: Record<string, string> = {
  N: "#7ab8f5", C: "#c8c8c8", O: "#ff6b6b",
  S: "#f0c040", Cl: "#00e090", F: "#a0d8f0",
};

interface Props {
  drug: Drug;
  size?: number;
}

export default function Molecule3D({ drug, size = 280 }: Props) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const animRef    = useRef<number>(0);
  const angleRef   = useRef({ x: 0.3, y: 0 });
  const dragging   = useRef(false);
  const lastMouse  = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctxRaw = canvas.getContext("2d");
    if (!ctxRaw) return;
    const ctx: CanvasRenderingContext2D = ctxRaw;

    canvas.width  = size;
    canvas.height = size;
    const W = size, H = size;
    const { atomCoords: atoms, bonds, accent } = drug;

    function project(x: number, y: number, z: number, ax: number, ay: number) {
      const cosX = Math.cos(ax), sinX = Math.sin(ax);
      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      const y2 = y * cosX - z * sinX;
      const z2 = y * sinX + z * cosX;
      const x2 = x * cosY + z2 * sinY;
      const scale = 22;
      return { px: W / 2 + x2 * scale, py: H / 2 + y2 * scale, depth: z2 };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      const grd = ctx.createRadialGradient(W/2, H/2, 20, W/2, H/2, W/2);
      grd.addColorStop(0, accent + "22");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      const ax = angleRef.current.x;
      const ay = angleRef.current.y;
      const projected = atoms.map(a => ({ ...a, ...project(a.x - 6, a.y, a.z, ax, ay) }));

      const sortedBonds = bonds
        .map(([i, j]) => ({ i, j, depth: (projected[i].depth + projected[j].depth) / 2 }))
        .sort((a, b) => a.depth - b.depth);

      sortedBonds.forEach(({ i, j }) => {
        const a = projected[i], b = projected[j];
        const alpha = Math.max(0.3, Math.min(0.9, 0.6 + (a.depth + b.depth) / 30));
        ctx.beginPath();
        ctx.moveTo(a.px, a.py);
        ctx.lineTo(b.px, b.py);
        ctx.strokeStyle = accent + Math.round(alpha * 255).toString(16).padStart(2, "0");
        ctx.lineWidth = 1.8;
        ctx.stroke();
      });

      [...projected].sort((a, b) => a.depth - b.depth).forEach(atom => {
        const t = atom.type ?? "C";
        const r = t === "Cl" ? 8 : ["N", "O", "S"].includes(t) ? 7 : 5;
        const col = ATOM_COLORS[t] ?? "#c8c8c8";

        const g = ctx.createRadialGradient(atom.px, atom.py, 0, atom.px, atom.py, r * 2.5);
        g.addColorStop(0, col + "88");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(atom.px, atom.py, r * 2.5, 0, Math.PI * 2);
        ctx.fill();

        const sg = ctx.createRadialGradient(atom.px - r * 0.3, atom.py - r * 0.3, 0, atom.px, atom.py, r);
        sg.addColorStop(0, col + "ff");
        sg.addColorStop(1, col + "88");
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.arc(atom.px, atom.py, r, 0, Math.PI * 2);
        ctx.fill();

        if (atom.label) {
          ctx.fillStyle = "#fff";
          ctx.font = `bold 9px var(--font-mono, 'IBM Plex Mono', monospace)`;
          ctx.textAlign = "center";
          ctx.fillText(atom.label, atom.px, atom.py + 18);
        }
      });
    }

    function tick() {
      if (!dragging.current) angleRef.current.y += 0.006;
      draw();
      animRef.current = requestAnimationFrame(tick);
    }
    animRef.current = requestAnimationFrame(tick);

    function onDown(e: MouseEvent | TouchEvent) {
      dragging.current = true;
      const src = "touches" in e ? e.touches[0] : e;
      lastMouse.current = { x: src.clientX, y: src.clientY };
    }
    function onMove(e: MouseEvent | TouchEvent) {
      if (!dragging.current) return;
      const src = "touches" in e ? e.touches[0] : e;
      angleRef.current.y += (src.clientX - lastMouse.current.x) * 0.012;
      angleRef.current.x += (src.clientY - lastMouse.current.y) * 0.012;
      lastMouse.current = { x: src.clientX, y: src.clientY };
    }
    function onUp() { dragging.current = false; }

    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("touchstart", onDown as EventListener, { passive: true });
    window.addEventListener("touchmove", onMove as EventListener, { passive: true });
    window.addEventListener("touchend", onUp);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("touchstart", onDown as EventListener);
      window.removeEventListener("touchmove", onMove as EventListener);
      window.removeEventListener("touchend", onUp);
    };
  }, [drug, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ cursor: "grab", touchAction: "none", display: "block" }}
    />
  );
}
