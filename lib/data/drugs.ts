export interface Receptor {
  name: string;
  action: string;
  affinity: string;
  primary: boolean;
}

export interface DoseProfile {
  min: number;
  max: number;
  start: number;
  unit: string;
  notes: string;
}

export interface AdverseEffect {
  system: string;
  effects: string[];
  severity: "mild" | "moderate" | "severe";
}

export interface Interaction {
  drug: string;
  risk: string;
  mechanism: string;
  severity: "critical" | "high" | "moderate" | "low";
}

export interface AtomCoord {
  x: number;
  y: number;
  z: number;
  type?: string;
  label?: string;
}

export interface Drug {
  id: string;
  name: string;
  iupac: string;
  class: string;
  subclass: string;
  accent: string;
  formula: string;
  mw: string;
  halfLife: string;
  bioavailability: string;
  proteinBinding: string;
  metabolism: string;
  elimination: string;
  tMax: string;
  onset: string;
  indications: string[];
  mechanism: string;
  receptors: Receptor[];
  doses: Record<string, DoseProfile>;
  adverseEffects: AdverseEffect[];
  interactions: Interaction[];
  monitoring: string[];
  withdrawal: string;
  atomCoords: AtomCoord[];
  bonds: [number, number][];
}

export const DRUGS: Drug[] = [
  {
    id: "sertraline",
    name: "Sertralina",
    iupac: "(1S,4S)-4-(3,4-Dichlorophenyl)-1,2,3,4-tetrahydronaphthalen-1-amine",
    class: "ISRS",
    subclass: "Antidepressivo",
    accent: "#6a9bcc",
    formula: "C₁₇H₁₇Cl₂N",
    mw: "306.24 g/mol",
    halfLife: "26h",
    bioavailability: "44%",
    proteinBinding: "98%",
    metabolism: "CYP2C19, CYP2D6, CYP3A4",
    elimination: "Fecal (44%), Renal (40–45%)",
    tMax: "4–6h",
    onset: "2–4 semanas",
    indications: ["Depressão maior", "TOC", "Pânico", "TEPT", "Ansiedade social", "TDPM"],
    mechanism: "Inibição seletiva do SERT (transportador de serotonina)",
    receptors: [
      { name: "SERT",   action: "Inibição",       affinity: "Ki ≈ 0.29 nM", primary: true },
      { name: "5-HT1A", action: "Indireto",        affinity: "—",            primary: false },
      { name: "5-HT2A", action: "Indireto",        affinity: "—",            primary: false },
      { name: "5-HT2C", action: "Indireto",        affinity: "—",            primary: false },
      { name: "5-HT3",  action: "Indireto (GI)",   affinity: "—",            primary: false },
      { name: "DAT",    action: "Fraca inibição",  affinity: "Ki ≈ 25 nM",   primary: false },
    ],
    doses: {
      adult:     { min: 50,  max: 200, start: 50,  unit: "mg/dia", notes: "Início com 50 mg; pânico: 25 mg" },
      elderly:   { min: 25,  max: 100, start: 25,  unit: "mg/dia", notes: "Titulação mais lenta; monitorar hiponatremia" },
      ocd:       { min: 50,  max: 200, start: 50,  unit: "mg/dia", notes: "Pode exigir dose mais alta e tempo > 12 semanas" },
      pediatric: { min: 25,  max: 200, start: 25,  unit: "mg/dia", notes: "Indicação específica (TOC ≥ 6 anos); monitorar" },
    },
    adverseEffects: [
      { system: "GI",         effects: ["Náusea", "Diarreia", "Dispepsia", "Boca seca"],                          severity: "mild" },
      { system: "CNS",        effects: ["Cefaleia", "Insônia", "Sonolência", "Tremor"],                           severity: "mild" },
      { system: "Sexual",     effects: ["Anorgasmia", "Diminuição da libido", "Retardo ejaculatório"],            severity: "moderate" },
      { system: "Autonômico", effects: ["Sudorese", "Palpitações"],                                               severity: "mild" },
      { system: "Grave",      effects: ["Síndrome serotoninérgica", "Hiponatremia", "Sangramento", "Virada maníaca"], severity: "severe" },
    ],
    interactions: [
      { drug: "IMAOs",              risk: "CONTRAINDICADO", mechanism: "Síndrome serotoninérgica grave",              severity: "critical" },
      { drug: "Linezolida",         risk: "EVITAR",         mechanism: "Síndrome serotoninérgica",                    severity: "critical" },
      { drug: "Tramadol",           risk: "ALTO RISCO",     mechanism: "Serotoninérgico + convulsão",                 severity: "high" },
      { drug: "AINEs / AAS",        risk: "MODERADO",       mechanism: "Risco aumentado de sangramento GI",           severity: "moderate" },
      { drug: "Anticoagulantes",    risk: "MODERADO",       mechanism: "Potencialização do efeito anticoagulante",    severity: "moderate" },
      { drug: "Lítio",              risk: "MONITORAR",      mechanism: "Adição serotoninérgica",                      severity: "low" },
    ],
    monitoring: ["Humor e ideação suicida (primeiras semanas)", "Função sexual", "Sódio sérico (idosos)", "Sinais de mania", "Peso e apetite"],
    withdrawal: "Gradual — risco de síndrome de descontinuação (tontura, irritabilidade, náusea, parestesias)",
    atomCoords: [
      { x: 0,   y: 0,    z: 0,   type: "N",  label: "NH" },
      { x: 1.5, y: 0.2,  z: 0.1, type: "C" },
      { x: 2.2, y: 1.4,  z: -0.2, type: "C" },
      { x: 3.6, y: 1.5,  z: -0.1, type: "C" },
      { x: 4.3, y: 0.3,  z: 0.3,  type: "C" },
      { x: 3.6, y: -0.9, z: 0.5,  type: "C" },
      { x: 2.2, y: -0.8, z: 0.4,  type: "C" },
      { x: 4.4, y: -2.1, z: 0.9,  type: "C" },
      { x: 5.8, y: -2.2, z: 1.0,  type: "C" },
      { x: 6.5, y: -1.0, z: 0.7,  type: "C" },
      { x: 5.8, y: 0.2,  z: 0.3,  type: "C" },
      { x: 6.5, y: 1.4,  z: 0.0,  type: "Cl", label: "Cl" },
      { x: 3.8, y: -3.3, z: 1.3,  type: "Cl", label: "Cl" },
    ],
    bonds: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[1,6],[5,7],[7,8],[8,9],[9,10],[4,10],[10,11],[7,12]],
  },
  {
    id: "fluoxetine",
    name: "Fluoxetina",
    iupac: "N-methyl-3-phenyl-3-[4-(trifluoromethyl)phenoxy]propan-1-amine",
    class: "ISRS",
    subclass: "Antidepressivo",
    accent: "#9b7acc",
    formula: "C₁₇H₁₈F₃NO",
    mw: "309.33 g/mol",
    halfLife: "1–4 dias (metabólito ativo: 4–16 dias)",
    bioavailability: "72%",
    proteinBinding: "94%",
    metabolism: "CYP2D6 (principal)",
    elimination: "Renal (principal)",
    tMax: "6–8h",
    onset: "2–4 semanas",
    indications: ["Depressão maior", "TOC", "Bulimia nervosa", "Pânico", "TDPM"],
    mechanism: "Inibição seletiva do SERT com meia-vida longa",
    receptors: [
      { name: "SERT",    action: "Inibição",           affinity: "Ki ≈ 0.81 nM", primary: true },
      { name: "5-HT2C",  action: "Antagonismo fraco",  affinity: "Ki ≈ 200 nM",  primary: false },
      { name: "CYP2D6",  action: "Inibição forte",     affinity: "—",            primary: false },
    ],
    doses: {
      adult:     { min: 20, max: 80, start: 20, unit: "mg/dia", notes: "Dose única matinal; meia-vida longa facilita adesão" },
      elderly:   { min: 10, max: 40, start: 10, unit: "mg/dia", notes: "Monitorar interações CYP2D6" },
      ocd:       { min: 20, max: 80, start: 20, unit: "mg/dia", notes: "Doses maiores frequentemente necessárias" },
      pediatric: { min: 10, max: 20, start: 10, unit: "mg/dia", notes: "≥ 8 anos para depressão; ≥ 7 anos para TOC" },
    },
    adverseEffects: [
      { system: "GI",     effects: ["Náusea", "Anorexia", "Diarreia"],                               severity: "mild" },
      { system: "CNS",    effects: ["Insônia", "Agitação", "Ansiedade inicial", "Cefaleia"],          severity: "mild" },
      { system: "Sexual", effects: ["Disfunção sexual", "Anorgasmia"],                                severity: "moderate" },
      { system: "Grave",  effects: ["Síndrome serotoninérgica", "Mania", "Hiponatremia"],             severity: "severe" },
    ],
    interactions: [
      { drug: "IMAOs",               risk: "CONTRAINDICADO", mechanism: "Síndrome serotoninérgica; washout 5 semanas antes do IMAO", severity: "critical" },
      { drug: "Substratos CYP2D6",   risk: "ALTO RISCO",     mechanism: "Forte inibidor — eleva níveis de TCAs, antipsicóticos, tamoxifeno", severity: "high" },
      { drug: "Tramadol",            risk: "ALTO RISCO",     mechanism: "Serotoninérgico + inibição ativação de tramadol",            severity: "high" },
      { drug: "Anticoagulantes",     risk: "MODERADO",       mechanism: "Potencialização",                                           severity: "moderate" },
    ],
    monitoring: ["Humor e ativação", "Interações CYP2D6", "Peso (pode reduzir)", "Ideação suicida em jovens"],
    withdrawal: "Menor risco — meia-vida longa protege naturalmente contra síndrome de descontinuação",
    atomCoords: [
      { x: 0,   y: 0,    z: 0,   type: "N",  label: "N-CH₃" },
      { x: 1.5, y: 0.3,  z: 0 },
      { x: 2.5, y: -0.8, z: 0.2, type: "C" },
      { x: 3.9, y: -0.6, z: 0.1, type: "C" },
      { x: 4.5, y: 0.7,  z: -0.2, type: "C" },
      { x: 3.5, y: 1.8,  z: -0.4, type: "C" },
      { x: 2.1, y: 1.6,  z: -0.3, type: "C" },
      { x: 5.9, y: 0.9,  z: -0.3, type: "O" },
      { x: 6.8, y: -0.2, z: 0,    type: "C" },
      { x: 8.2, y: -0.0, z: -0.1, type: "C" },
      { x: 9.0, y: -1.1, z: 0.2,  type: "C" },
      { x: 8.4, y: -2.4, z: 0.5,  type: "C" },
      { x: 7.0, y: -2.6, z: 0.6,  type: "C" },
      { x: 6.2, y: -1.5, z: 0.3,  type: "C" },
      { x: 9.2, y: 1.1,  z: -0.4, type: "F", label: "CF₃" },
    ],
    bonds: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[1,6],[4,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[8,13],[9,14]],
  },
  {
    id: "quetiapine",
    name: "Quetiapina",
    iupac: "2-(2-(4-(Dibenzo[b,f][1,4]thiazepin-11-yl)piperazin-1-yl)ethoxy)ethanol",
    class: "Antipsicótico atípico",
    subclass: "Dibenzothiazepina",
    accent: "#d97757",
    formula: "C₂₁H₂₅N₃O₂S",
    mw: "383.51 g/mol",
    halfLife: "7h (XR: 12h)",
    bioavailability: "9% (XR similar)",
    proteinBinding: "83%",
    metabolism: "CYP3A4 (principal)",
    elimination: "Renal (73%), Fecal (20%)",
    tMax: "1.5h (IR) / 6h (XR)",
    onset: "Sedação: imediata; antipsicótico: 1–2 semanas",
    indications: ["Esquizofrenia", "Mania bipolar", "Depressão bipolar", "Adjuvante em depressão unipolar", "Insônia (off-label)"],
    mechanism: "Antagonismo D2, 5-HT2A, H1, α1 — dissociação rápida do D2 reduz SEP",
    receptors: [
      { name: "D2",     action: "Antagonismo (rápida dissociação)", affinity: "Ki ≈ 245 nM", primary: true },
      { name: "5-HT2A", action: "Antagonismo forte",                affinity: "Ki ≈ 38 nM",  primary: true },
      { name: "H1",     action: "Antagonismo forte",                affinity: "Ki ≈ 11 nM",  primary: false },
      { name: "α1",     action: "Antagonismo",                      affinity: "Ki ≈ 22 nM",  primary: false },
      { name: "M1",     action: "Antagonismo fraco",                affinity: "—",            primary: false },
    ],
    doses: {
      adult:              { min: 25,   max: 800, start: 25,   unit: "mg/dia", notes: "Titulação obrigatória; insônia off-label: 12,5–50 mg" },
      elderly:            { min: 12.5, max: 200, start: 12.5, unit: "mg/dia", notes: "Risco de hipotensão ortostática e sedação excessiva" },
      bipolar_depression: { min: 50,   max: 300, start: 50,   unit: "mg/dia", notes: "XR 50 mg → 300 mg em 4 dias" },
      schizophrenia:      { min: 150,  max: 750, start: 25,   unit: "mg/dia", notes: "Dividido em 2x (IR) ou 1x noite (XR)" },
    },
    adverseEffects: [
      { system: "Metabólico",     effects: ["Ganho de peso", "Hiperglicemia", "Dislipidemia", "Resistência à insulina"], severity: "moderate" },
      { system: "CNS",            effects: ["Sedação", "Tontura", "Cefaleia"],                                           severity: "mild" },
      { system: "Cardiovascular", effects: ["Hipotensão ortostática", "Taquicardia", "Prolongamento QT"],               severity: "moderate" },
      { system: "Grave",          effects: ["Síndrome metabólica", "Discinesia tardia (raro)", "Síndrome neuroléptica maligna"], severity: "severe" },
    ],
    interactions: [
      { drug: "Inibidores CYP3A4 (cetoconazol, etc.)",          risk: "ALTO RISCO", mechanism: "Aumento de 5–7x nos níveis plasmáticos",                  severity: "high" },
      { drug: "Indutores CYP3A4 (carbamazepina, rifampicina)",  risk: "ALTO RISCO", mechanism: "Redução drástica dos níveis — falha terapêutica",           severity: "high" },
      { drug: "Depressores do SNC",                             risk: "MODERADO",   mechanism: "Potencialização da sedação",                                severity: "moderate" },
      { drug: "Antiarrítmicos QT",                              risk: "MODERADO",   mechanism: "Risco aumentado de prolongamento QT",                       severity: "moderate" },
    ],
    monitoring: ["Glicemia e HbA1c", "Perfil lipídico", "Peso e IMC", "Pressão arterial (ortostática)", "ECG basal", "AIMS (discinesia)"],
    withdrawal: "Gradual — pode ocorrer insônia de rebote, náusea e irritabilidade com retirada abrupta",
    atomCoords: [
      { x: 0,    y: 0,    z: 0,   type: "S" },
      { x: 1.4,  y: 0.9,  z: 0.1, type: "C" },
      { x: 2.8,  y: 0.5,  z: 0.2, type: "C" },
      { x: 3.5,  y: -0.8, z: 0.1, type: "C" },
      { x: 2.9,  y: -2.0, z: -0.1, type: "N", label: "N" },
      { x: 1.5,  y: -1.8, z: -0.2, type: "C" },
      { x: 0.8,  y: -0.6, z: -0.1, type: "C" },
      { x: 4.9,  y: -1.0, z: 0.2,  type: "C" },
      { x: 5.7,  y: 0.2,  z: 0.4,  type: "C" },
      { x: 5.0,  y: 1.4,  z: 0.3,  type: "C" },
      { x: 5.8,  y: -2.3, z: 0.2,  type: "C" },
      { x: 7.2,  y: -2.1, z: 0.3,  type: "N", label: "N" },
      { x: 8.0,  y: -1.0, z: 0.1,  type: "C" },
      { x: 9.4,  y: -1.0, z: 0.2,  type: "O" },
      { x: 10.2, y: 0.2,  z: 0.0,  type: "C" },
      { x: 11.6, y: 0.2,  z: 0.1,  type: "O" },
      { x: 12.2, y: 1.4,  z: -0.1, type: "C", label: "OH" },
    ],
    bonds: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[0,6],[2,7],[7,8],[8,9],[1,9],[3,10],[10,11],[11,12],[12,13],[13,14],[14,15],[15,16]],
  },
];
