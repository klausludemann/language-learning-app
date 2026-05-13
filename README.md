# 🇪🇸 Spanisch lernen – PWA

Mobile-First-Web-App zum Spanisch-Lernen für Reisende (deutsche Muttersprache).
Vokabeln, Mini-Dialoge und Grammatik-Erklärungen mit Audio-Aussprache.
Fortschritt wird über Spaced Repetition gespeichert und (mit Google-Login)
zwischen Geräten synchronisiert.

## Funktionen (MVP)

- **Themen**: Begrüßung & Smalltalk, Restaurant, Hotel, Verkehr, Camping, Wandern, Radfahren
- **Vokabel-Training** in drei Modi: Multiple-Choice, Tippen, Karteikarten
- **Mini-Dialoge** für realistische Situationen
- **Grammatik-Lektionen** (auf Deutsch): Aussprache, Artikel, ser/estar, Präsens, Fragen
- **Audio-Aussprache** via Browser-TTS (Web Speech API)
- **Spaced Repetition** (SM-2): die App wiederholt das, was du noch nicht sicher kannst
- **Fortschritt synchronisiert** über Firestore (Google-Login) oder lokal als Fallback
- **PWA**: installierbar, offline-fähig

## Lokal entwickeln

```bash
npm install
npm run dev
```

Im Browser unter http://localhost:5173 öffnen.

> Ohne Firebase-Konfiguration läuft die App im **Lokal-Modus**: Fortschritt
> wird nur im Browser-Speicher abgelegt, der Login-Button ist deaktiviert.

## Firebase einrichten (einmalig)

1. **Projekt anlegen**: https://console.firebase.google.com → „Projekt hinzufügen". Name z. B. `spanisch-lernen`.
2. **Web-App registrieren**: Im Projekt auf das Web-Icon `</>` klicken, App-Nickname vergeben, **Hosting aktivieren** auswählen.
3. **Google-Login aktivieren**: Build → Authentication → „Sign-in method" → Google → aktivieren.
4. **Firestore anlegen**: Build → Firestore Database → „Datenbank erstellen" → Modus „Produktion" → Region z. B. `europe-west3`.
5. **Konfiguration kopieren**: Projekteinstellungen → „Allgemein" → Apps → Konfiguration. Die sechs Werte in eine Datei `.env.local` eintragen (siehe `.env.example`).
6. **Projekt-ID eintragen**: In `.firebaserc` die Zeile `REPLACE_WITH_YOUR_FIREBASE_PROJECT_ID` durch deine echte Project-ID ersetzen.

## Deployment

### Variante A – Über Claude Code (empfohlen für dich)

Sag Claude Code einfach:

> "Deploy die App zu Firebase Hosting."

Claude führt aus:

```bash
npm install -g firebase-tools
firebase login           # einmalig, öffnet Browserfenster
firebase deploy --only hosting,firestore:rules
```

Beim ersten Mal musst du dich im Browserfenster mit deinem Google-Account anmelden.
Danach geht Deploy mit `npm run deploy`.

### Variante B – Automatisch über GitHub Actions

In `.github/workflows/deploy.yml` ist eine Pipeline angelegt, die bei jedem Push
auf `main` automatisch baut und deployed. Dafür musst du in den Repository-Settings
unter **Secrets and variables → Actions** folgende Secrets anlegen:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `FIREBASE_SERVICE_ACCOUNT` – JSON eines Service-Accounts mit Hosting-Admin-Rechten
  (Google Cloud Console → IAM → Service Accounts → JSON-Key erzeugen)

## Inhalte erweitern

Alle Inhalte liegen als Daten unter `src/data/`:

- `vocabulary.ts` – Wörter und Sätze pro Thema
- `dialogues.ts` – Mini-Dialoge
- `grammar.ts` – Grammatik-Lektionen

Neue Vokabeln einfach in die Liste eintragen (eindeutige `id` vergeben).

## 📱 Unterwegs vom iPad anpassen

Die App ist so eingerichtet, dass du sie auch im Urlaub vom iPad aus erweitern
kannst – ohne lokale Entwicklungsumgebung.

### Workflow

1. Auf dem iPad in Safari **claude.ai/code** öffnen
2. Dieses Repository auswählen
3. Claude einen Wunsch nennen (siehe Prompts unten)
4. Claude editiert, committet und pusht – die GitHub Action baut & deployed
   automatisch (sowohl auf `main` als auch auf
   `claude/spanish-learning-app-TUsmC`)
5. Nach ca. 1–2 Minuten ist die Änderung in der installierten PWA sichtbar
   (ggf. Tab-Reload)

### Beispiel-Prompts für unterwegs

**Vokabeln ergänzen**

> „Füge 10 neue Vokabeln zum Thema `restaurant` hinzu, die in Tapas-Bars
> nützlich sind. Mit Aussprache-Hinweisen wenn sinnvoll."

> „Im Thema `wandern` fehlen mir Wörter zu Wetter und Tieren. Ergänze 8
> Vokabeln passend dazu."

**Neues Thema anlegen**

> „Lege ein neues Thema `strand` an (Emoji 🏖️) mit 15 typischen
> Strand-Vokabeln und einem Mini-Dialog (Sonnenliege mieten)."

**Aussprache-Probleme klären**

> „Erkläre mir in der Grammatik-Lektion `aussprache`, warum man in Andalusien
> manche Endungen verschluckt. Maximal 3 Sätze, mit 2 Beispielen."

**Fehler korrigieren**

> „In `vocabulary.ts` ist `b08` falsch übersetzt. Es sollte `Estoy bien,
> gracias` heißen, nicht `Soy bien, gracias`."

**Dialog für eine konkrete Situation**

> „Bau einen Mini-Dialog für das Thema `radfahren`: ich frage am Berg nach
> einer Wasserquelle, ein Einheimischer erklärt den Weg."

**Lernziel & Schwerpunkt setzen**

> „Markiere alle Vokabeln aus `restaurant` und `verkehr` als Priorität für die
> nächsten 3 Tage, damit sie zuerst geübt werden."

### Tipps

- **Sei spezifisch**: Thema (`restaurant`, `camping` …), Anzahl, Kontext
- **Lass dir Vorschläge geben**, bevor Claude schreibt: „Schlag mir 20
  Vokabeln vor, ich wähle aus"
- **Fehler-Hinweis**: Wenn die App nach einer Änderung weiß bleibt, sag
  Claude: „Der Build ist fehlgeschlagen, schau in die GitHub Actions und
  korrigiere den Fehler"
- **PWA neu laden**: Auf dem iPad die App komplett schließen (App-Switcher,
  hochwischen) und neu öffnen, damit der neue Service Worker greift

## Architektur

- **React + Vite + TypeScript** – Build-Tools
- **Tailwind CSS** – Styling
- **React Router** – Navigation
- **Firebase Auth + Firestore** – Login + Fortschritt
- **vite-plugin-pwa** – Service Worker / Offline / Install-Prompt
- **Web Speech API** – TTS für Aussprache (keine Audio-Dateien nötig)
