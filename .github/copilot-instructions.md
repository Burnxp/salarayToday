# Copilot Instructions for salaryDay

## Projektüberblick
- React + Vite Projekt für einen Lohnrechner mit mehreren Komponenten (z.B. Einstellungen, Feiertage, Nachtschicht, Standardlohn, Navigation, Ergebnis).
- Haupt-UI-Komponenten liegen in `src/` als `.jsx`-Dateien, zentrale Logik in `logik.jsx` und Hilfsfunktionen in `rechner.js`.
- Navigation erfolgt über `react-router-dom`.
- Assets (z.B. Icons) liegen unter `src/assets/img/`.

## Build- und Deployment-Workflows
- **Lokale Entwicklung:**
  - `npm run dev` startet den lokalen Entwicklungsserver (Vite, HMR).
- **Build für Produktion:**
  - `npm run build` erzeugt das Produktions-Build im `dist/`-Ordner.
- **Versionierung:**
  - `npm run version:build` erhöht die Patch-Version in `package.json`, erstellt ein Build, macht automatisch einen Git-Commit und ein Git-Tag.
  - Alternativ: `npm version patch|minor|major` für manuelle Versionssprünge (macht auch Commit & Tag).
- **Deployment auf XAMPP:**
  - `npm run deploy:xampp` kopiert das gebaute Projekt nach `C:/xampp/htdocs/Salary_Day`.

## Projektkonventionen & Besonderheiten
- **Vite-Konfiguration:**
  - Die `base`-URL ist abhängig von der Umgebung (`/salary_day/` im Dev, `/` im Build für Netlify).
- **Versionsanzeige:**
  - Die App-Version wird dynamisch aus `package.json` in der Navigationsleiste angezeigt (`src/navigation.jsx`).
- **ESLint:**
  - Linting mit ESLint, Konfiguration in `eslint.config.js`. Lint-Check via `npm run lint`.
- **Keine TypeScript-Nutzung** (nur JS/JSX).

## Wichtige Dateien & Strukturen
- `src/App.jsx`: Einstiegspunkt der App, bindet Router und Hauptkomponenten ein.
- `src/navigation.jsx`: Navigation inkl. Anzeige der App-Version.
- `src/einstellungen.jsx`, `src/feierTage.jsx`, `src/nachtSchicht.jsx`, `src/stdLohn.jsx`, `src/result.jsx`: Hauptseiten/Komponenten.
- `src/logik.jsx`, `src/rechner.js`: Zentrale Berechnungs- und Logikfunktionen.
- `vite.config.js`: Build- und Base-URL-Konfiguration.
- `dev.md`: Entwickler-Notizen und Workflows (z.B. Versionierung, Git-Befehle).

## Typische Arbeitsabläufe
1. Änderungen im Code durchführen.
2. Linting prüfen: `npm run lint`.
3. Build erzeugen: `npm run build`.
4. Version erhöhen & Build + Tag: `npm run version:build`.
5. Deployment (z.B. XAMPP): `npm run deploy:xampp`.

## Hinweise für AI-Agents
- Halte dich an die bestehenden Komponenten- und Dateistrukturen.
- Nutze bestehende Utility-Funktionen und zentrale Logikdateien.
- Beachte die dynamische Base-URL in der Vite-Konfiguration.
- Versionierung und Deployment sind automatisiert, keine manuellen Änderungen an `package.json`-Version nötig.
- Lies `dev.md` für projektspezifische Workflows und Konventionen.
