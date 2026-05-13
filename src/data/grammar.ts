import type { GrammarLesson } from "../types";

export const GRAMMAR: GrammarLesson[] = [
  {
    id: "aussprache",
    title: "Aussprache – die wichtigsten Regeln",
    summary: "Spanisch wird größtenteils gesprochen wie geschrieben. Diese Buchstaben sind anders als im Deutschen.",
    sections: [
      {
        heading: "ll und y",
        body: "Beide klingen meist wie ein deutsches „j“ in „ja“. In manchen Regionen wie „sch“.",
        examples: [
          { es: "llave", de: "Schlüssel – klingt wie „jawe“" },
          { es: "playa", de: "Strand – „plaja“" },
        ],
      },
      {
        heading: "ñ",
        body: "Wie deutsches „nj“ in Cognac.",
        examples: [{ es: "España", de: "Spanien – „Espanja“" }],
      },
      {
        heading: "j und g (vor e/i)",
        body: "Klingen wie ein deutsches „ch“ in „Bach“ – kratzig im Rachen.",
        examples: [
          { es: "jamón", de: "Schinken – „chamón“" },
          { es: "gente", de: "Leute – „chente“" },
        ],
      },
      {
        heading: "c und z",
        body: "In Spanien: vor e/i wie englisches „th“ in „think“. In Lateinamerika: wie „s“.",
        examples: [
          { es: "gracias", de: "Danke – „grathias“ (Spanien)" },
          { es: "cerveza", de: "Bier – „therwetha“" },
        ],
      },
      {
        heading: "r und rr",
        body: "Einfaches r ist ein kurzer Zungenschlag. Doppeltes rr wird gerollt.",
        examples: [
          { es: "pero", de: "aber – kurz" },
          { es: "perro", de: "Hund – gerollt" },
        ],
      },
      {
        heading: "Betonung",
        body: "Wörter mit Akzent (´) werden auf der markierten Silbe betont. Ohne Akzent: endet auf Vokal/n/s → vorletzte Silbe; endet auf Konsonant → letzte Silbe.",
        examples: [
          { es: "café", de: "Kaffee – Betonung hinten" },
          { es: "hablo", de: "ich spreche – Betonung auf „ha“" },
        ],
      },
    ],
  },
  {
    id: "artikel",
    title: "Artikel & Geschlecht",
    summary: "Spanische Nomen sind männlich oder weiblich. Die Endung gibt oft einen Hinweis.",
    sections: [
      {
        heading: "Bestimmte Artikel",
        body: "el (m, Singular), la (f, Singular), los (m, Plural), las (f, Plural).",
        examples: [
          { es: "el hotel", de: "das Hotel" },
          { es: "la playa", de: "der Strand" },
          { es: "los niños", de: "die Kinder" },
          { es: "las casas", de: "die Häuser" },
        ],
      },
      {
        heading: "Unbestimmte Artikel",
        body: "un (m), una (f), unos / unas (Plural = einige).",
        examples: [
          { es: "un café", de: "ein Kaffee" },
          { es: "una habitación", de: "ein Zimmer" },
        ],
      },
      {
        heading: "Faustregel zum Geschlecht",
        body: "Wörter auf -o sind meist männlich, auf -a meist weiblich. Ausnahmen: el día, la mano, el problema.",
      },
    ],
  },
  {
    id: "ser-estar",
    title: "ser vs. estar – „sein“ zweimal",
    summary: "Spanisch unterscheidet zwischen dauerhaftem Zustand (ser) und vorübergehendem (estar).",
    sections: [
      {
        heading: "ser – Identität & feste Eigenschaften",
        body: "Beruf, Herkunft, Charakter, Zeit, Material.",
        examples: [
          { es: "Soy de Alemania.", de: "Ich komme aus Deutschland." },
          { es: "Es médico.", de: "Er ist Arzt." },
          { es: "Son las tres.", de: "Es ist drei Uhr." },
        ],
      },
      {
        heading: "estar – Zustand & Ort",
        body: "Wo etwas ist, wie es einem geht, vorübergehende Zustände.",
        examples: [
          { es: "Estoy cansado.", de: "Ich bin müde." },
          { es: "El hotel está en la playa.", de: "Das Hotel liegt am Strand." },
          { es: "Está lloviendo.", de: "Es regnet (gerade)." },
        ],
      },
      {
        heading: "Eselsbrücke",
        body: "ser = wer du BIST  •  estar = wie/wo du gerade BIST.",
      },
    ],
  },
  {
    id: "praesens",
    title: "Präsens regulärer Verben",
    summary: "Spanische Verben enden auf -ar, -er oder -ir. Die Endung verändert sich je nach Person.",
    sections: [
      {
        heading: "-ar: hablar (sprechen)",
        body: "hablo, hablas, habla, hablamos, habláis, hablan.",
        examples: [
          { es: "Hablo español un poco.", de: "Ich spreche etwas Spanisch." },
          { es: "¿Hablas inglés?", de: "Sprichst du Englisch?" },
        ],
      },
      {
        heading: "-er: comer (essen)",
        body: "como, comes, come, comemos, coméis, comen.",
        examples: [{ es: "Comemos paella.", de: "Wir essen Paella." }],
      },
      {
        heading: "-ir: vivir (leben)",
        body: "vivo, vives, vive, vivimos, vivís, viven.",
        examples: [{ es: "Vivo en Berlín.", de: "Ich lebe in Berlin." }],
      },
      {
        heading: "Wichtig: Pronomen werden meist weggelassen",
        body: "Die Endung zeigt schon, wer gemeint ist. „Yo hablo“ → einfach „Hablo“.",
      },
    ],
  },
  {
    id: "fragen",
    title: "Fragen bilden",
    summary: "Im Spanischen werden Fragen oft einfach durch die Satzmelodie markiert. Schriftlich beginnt jede Frage mit ¿.",
    sections: [
      {
        heading: "Entscheidungsfragen",
        body: "Gleiche Wortstellung wie der Aussagesatz, nur Stimme hochziehen.",
        examples: [
          { es: "¿Hablas inglés?", de: "Sprichst du Englisch?" },
          { es: "¿Tienen wifi?", de: "Haben Sie WLAN?" },
        ],
      },
      {
        heading: "W-Fragen",
        body: "qué (was), quién (wer), dónde (wo), cuándo (wann), por qué (warum), cuánto (wie viel), cómo (wie).",
        examples: [
          { es: "¿Dónde está el baño?", de: "Wo ist die Toilette?" },
          { es: "¿Cuánto cuesta?", de: "Wie viel kostet das?" },
          { es: "¿Cómo te llamas?", de: "Wie heißt du?" },
        ],
      },
      {
        heading: "Höflich mit „usted“",
        body: "Im Urlaub oft sicherer: „¿Puede …?“ statt „¿Puedes …?“ – das ist die Sie-Form.",
        examples: [{ es: "¿Puede ayudarme?", de: "Können Sie mir helfen?" }],
      },
    ],
  },
];
