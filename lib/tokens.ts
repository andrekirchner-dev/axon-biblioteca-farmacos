export const C = {
  bg:      "#080c10",
  surface: "#0d1319",
  panel:   "#111922",
  border:  "rgba(255,255,255,0.07)",
  borderM: "rgba(255,255,255,0.12)",
  text:    "#f0ede6",
  muted:   "#8a9aaa",
  faint:   "#3a4a58",
  orange:  "#d97757",
  blue:    "#6a9bcc",
  green:   "#788c5d",
  gold:    "#c9a84c",
  rose:    "#c96a6a",
  violet:  "#9b7acc",
} as const;

export const SEVERITY_COLORS: Record<string, string> = {
  critical: C.rose,
  high:     "#e07a3a",
  moderate: C.gold,
  low:      C.green,
  mild:     C.muted,
  severe:   C.rose,
};

export const FONTS = {
  serif:  "var(--font-serif), 'DM Serif Display', serif",
  mono:   "var(--font-mono), 'IBM Plex Mono', monospace",
  body:   "var(--font-body), 'Lora', Georgia, serif",
} as const;
