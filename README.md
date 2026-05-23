# Pokopia Tracker

Persönlicher Tracker für das Spiel **Pokopia** (Nintendo Switch). Die App hilft dabei, den Überblick über alle Pokémon in den verschiedenen Spielwelten zu behalten.

Direkt zur Anwendung: [https://sethiele.github.io/pokopia-tracker](https://sethiele.github.io/pokopia-tracker/)

---

> [!IMPORTANT]
> **Rechtlicher Hinweis:** Dieses Projekt ist ein inoffizielles, nicht kommerzielles Hilfsmittel für den privaten Gebrauch. Es besteht keine Verbindung zu und keine Unterstützung durch die Inhaber der genannten Marken. Pokopia, Pokémon, Nintendo sowie alle weiteren genannten Produkt- und Markennamen sind Eigentum ihrer jeweiligen Rechteinhaber.

---

## Für Anwender

### Was kann die App?

Der Pokopia Tracker verwaltet 289 Pokémon aus 7 Spielwelten. Für jedes Pokémon lassen sich drei tägliche Status-Informationen erfassen:

| Symbol | Bedeutung | Verhalten |
| ------ | --------- | --------- |
| 👋 | **Kennengelernt** – das Pokémon wurde im Spiel getroffen | Einmalig setzbar, bleibt gespeichert |
| 🏠 | **Hat ein Haus** – das Pokémon hat ein eigenes Haus | Nur aktiv wenn das Pokémon kennengelernt wurde |
| 💬 | **Heute gefragt** – das Pokémon wurde heute nach seiner Stimmung gefragt | Setzt sich täglich automatisch zurück |

> [!NOTE]
> Die Daten werden dauerhaft im Browser gespeichert (localStorage) und bleiben auch nach dem Schließen der App erhalten. **Es werden keine Daten außerhalb deines eigenen Webbrowsers gespeichert.**

.

> [!CAUTION]
> Das bedeutet auch, dass du in unterschiedlichen Browsern nicht den gleichen Speicherstand haben wirst. [Siehe](#datensicherung--wiederherstellung)

### Die 7 Welten

> [!WARNING]
> Spoiler warnung. Wer sich überraschen lassen will welche Pokemon es gibt, sollte lieber nicht weiter lesen.

| Welt | Pokémon |
| ---- | ------- |
| 🌵 Welkwüstia | 44 |
| 🌊 Trübküstia | 40 |
| ⛰️ Kargbergia | 46 |
| 🌿 Mooswald | 46 |
| 🏝️ Neulandia | 91 |
| ✨ Legendäre & Besondere | 18 |
| 🎉 Event-Pokémon | 4 |

### Suche und Filter

Über das **Suchfeld** im Header lässt sich nach Pokémon-Namen suchen. Die Suche ist sofort aktiv und kombiniert sich mit dem aktiven Filter.

Die **Filter-Buttons** ermöglichen gezielte Ansichten:

- **Alle** – zeigt alle Pokémon
- **Noch unbekannt** – Pokémon, die noch nicht kennengelernt wurden
- **Ohne Haus** – kennengelernte Pokémon, die noch kein Haus haben
- **Heute noch fragen** – kennengelernte Pokémon, die heute noch nicht nach ihrer Stimmung gefragt wurden

Suche und Filter wirken gleichzeitig. Welten ohne Treffer werden ausgeblendet.

### Pokémon-Sprite anzeigen

Pokémon-Namen mit einer gepunkteten Unterstreichung sind mit dem [nationalen Pokédex](https://www.bisafans.de/spiele/editionen/strahlender-diamant-leuchtende-perle/nationaler-pokedex.php) verknüpft. Ein Klick (oder Tippen auf dem Handy) öffnet ein Overlay mit dem offiziellen Sprite des Pokémon. Das Overlay schließt sich mit dem ×-Button, einem Klick außerhalb oder der Escape-Taste.

### Statistiken

Im Header zeigen drei Kacheln den aktuellen Fortschritt:

- **👋 Kennengelernt** – wie viele von allen Pokémon bereits getroffen wurden
- **🏠 Mit Haus** – wie viele Pokémon bereits ein Haus haben
- **💬 Heute gefragt** – wie viele der bereits bekannten Pokémon heute schon gefragt wurden

---

### Datensicherung & Wiederherstellung

Das **⚙️-Symbol** oben rechts neben dem App-Namen öffnet das Einstellungs-Overlay. Dort gibt es zwei Funktionen:

#### Daten herunterladen

Speichert alle aktuellen Pokémon-Daten als JSON-Datei auf dem Gerät. Der Dateiname enthält das aktuelle Datum, z. B. `pokopia-tracker-2026-05-23.json`. Die Datei kann als Backup aufbewahrt werden, um den Fortschritt bei einem Gerätewechsel oder Browserwechsel zu erhalten.

#### Daten wiederherstellen

Lädt eine zuvor gesicherte JSON-Datei und stellt den darin enthaltenen Fortschritt wieder her.

> [!CAUTION]
> **Beim Wiederherstellen werden die aktuellen Daten vollständig überschrieben.** Es gibt keine Möglichkeit, diesen Vorgang rückgängig zu machen. Vorher sichern!

Nach einem erfolgreichen Import erscheint eine grüne Bestätigung. Wenn die Datei kein gültiges Format hat, wird eine rote Fehlermeldung angezeigt und die vorhandenen Daten bleiben unverändert.

---

### Funktionen in Planung

- [x] **Pokémon-Sprites** einbinden (Bilder der Pokemon)
- [x] **Export/Import** Daten Backup und Import #1
- [ ] **Notizfeld** pro Pokémon (Freitext)
- [ ] **Mood-History** anzeigen – wie oft wurde ein Pokémon in den letzten 7 Tagen gefragt
- [ ] **Mobile PWA** (manifest.json + Service Worker für Offline-Nutzung)
- [ ] **Welten-Reihenfolge** anpassen / eigene Sortierung

## Für Entwickler

### Technischer Stack

| Technologie | Verwendung |
| ----------- | ---------- |
| **React 18** | UI-Framework |
| **Vite 5** | Build-Tool und Dev-Server |
| **localStorage** | Persistente Datenspeicherung im Browser |
| **PokéAPI GitHub Sprites** | Pokémon-Sprites per nationalId (kein API-Call, direkte URL-Konstruktion) |
| **Vitest + jsdom** | Unit-Tests und Datenintegritäts-Tests |

Es gibt kein CSS-Framework. Styles sind als JavaScript-Objekte direkt in den Komponenten definiert (Inline-Styles). Es gibt keine externe Abhängigkeit zur Laufzeit außer React.

### Projekt starten

```bash
npm install          # einmalig
npm run dev          # Dev-Server auf http://localhost:5173
npm run build        # Produktions-Build nach dist/
npm test             # Tests einmalig ausführen
npm run test:watch   # Tests im Watch-Modus (re-runs bei Änderungen)
```

### Projektstruktur

```text
pokopia-dex/
├── index.html               # HTML-Einstiegspunkt
├── vite.config.js
├── src/
│   ├── main.jsx             # React-Wurzel, mountet <App>
│   ├── App.jsx              # Zentrale State-Verwaltung
│   ├── index.css            # Globale Reset-Styles und Scrollbar
│   ├── data/
│   │   ├── worlds.js        # Welt-Metadaten (Name, Farbe, Emoji)
│   │   ├── pokemon.js       # Alle 289 Pokémon als flache Liste
│   │   └── index.js         # Joined WORLDS (worlds + pokemon)
│   ├── utils/
│   │   ├── storage.js       # localStorage lesen/schreiben
│   │   ├── filter.js        # Filterlogik pro Pokémon
│   │   ├── stats.js         # Berechnung der Header-Statistiken
│   │   └── backup.js        # Export und Import der Nutzerdaten
│   ├── test/
│   │   └── setup.js         # Vitest-Setup (localStorage-Mock)
│   ├── __tests__/
│   │   ├── data.test.js     # Datenintegrität (IDs, worldIds, Farben)
│   │   ├── storage.test.js  # loadData / saveData Round-Trip
│   │   ├── filter.test.js   # matchesPokemon – alle Filter und Kombinationen
│   │   ├── stats.test.js    # computeStats – met, house, mood
│   │   └── backup.test.js   # exportData und importData
│   └── components/
│       ├── Header.jsx       # Sticky Header mit Stats, Suche, Filter
│       ├── StatBadge.jsx    # Einzelne Statistik-Kachel
│       ├── WorldCard.jsx    # Aufklappbare Weltkarte mit Pokémon-Liste
│       ├── PokemonRow.jsx   # Einzelne Pokémon-Zeile mit drei Checkboxen
│       ├── CheckCircle.jsx  # Runder Toggle-Button
│       ├── ProgressBar.jsx  # Fortschrittsbalken pro Welt
│       ├── PokemonOverlay.jsx # Sprite-Overlay
│       ├── SettingsOverlay.jsx # Einstellungs-Overlay (Backup & Restore)
│       └── UpdateBanner.jsx # Banner bei verfügbarem App-Update
```

### Datenmodell

#### Stammdaten (statisch, zur Build-Zeit)

**`src/data/worlds.js`** – Welt-Metadaten ohne Pokémon:

```js
{ id: "welkwuestia", name: "Welkwüstia", emoji: "🌵", color: "#e8a045", bg: "#fdf6ec" }
```

**`src/data/pokemon.js`** – Flache Liste aller Pokémon:

```js
{ id: 1, name: "Bisasam", worldId: "welkwuestia", nationalId: 1 }
//        ^Pokopia-ID      ^Zuordnung zur Welt       ^nationaler Pokédex (null wenn unbekannt)
```

> [!NOTE]
> `id` ist die Pokopia-interne Nummer, **nicht** die nationale Pokédex-Nummer. Sie darf sich nicht ändern, da sie als Schlüssel im localStorage verwendet wird.

**`src/data/index.js`** – Kombiniert beide Dateien zu `WORLDS`, das die App verwendet:

```js
export const WORLDS = WORLDS_META.map(world => ({
  ...world,
  pokemon: POKEMON.filter(p => p.worldId === world.id),
}))
```

#### Nutzerdaten (localStorage)

Der Schlüssel `pokopia-tracker-v1` enthält ein flaches Objekt. Der Schlüssel ist immer die Pokopia-ID als String:

```js
{
  "1": {
    met: true,
    hasHouse: false,
    moodDates: {
      "2026-05-23": true   // ISO-Datum → true
    }
  }
}
```

- `met` und `hasHouse` sind boolesche Werte
- `moodDates` speichert alle Tage, an denen das Pokémon gefragt wurde – alte Einträge bleiben erhalten, werden aber ignoriert
- Die App liest nur den Eintrag für `getTodayKey()` (aktuelles ISO-Datum)

Beim Erweitern des Schemas die Versionsnummer im Storage-Key erhöhen (`pokopia-tracker-v2`) und eine Migration implementieren, damit bestehende Daten erhalten bleiben.

### State-Verwaltung

Der gesamte App-State liegt in `App.jsx`:

| State | Typ | Beschreibung |
| ----- | --- | ------------ |
| `data` | `Object` | Nutzerdaten (gespiegelt aus/nach localStorage) |
| `openWorlds` | `Object` | Welche Welten aufgeklappt sind (`worldId → boolean`) |
| `search` | `string` | Aktueller Suchbegriff |
| `filter` | `string` | Aktiver Filter-ID |
| `spritePokemon` | `Object\|null` | Pokémon für das Sprite-Overlay (null = geschlossen) |
| `settingsOpen` | `boolean` | Ob das Einstellungs-Overlay angezeigt wird |

`toggle` und `getState` sind mit `useCallback` stabilisiert, damit sie sich nur ändern wenn `data` sich ändert. `saveData` wird per `useEffect` nach jedem `data`-Update aufgerufen.

### Filter- und Such-Logik

`src/utils/filter.js` – `matchesPokemon(pokemon, pokemonState, search, filter)`:

```text
search gesetzt → Name muss den Suchbegriff enthalten (case-insensitive)
filter "missing-met"   → !state.met
filter "missing-house" → state.met && !state.hasHouse
filter "needs-check"   → state.met && !state.moodToday
```

Die Filterung findet in `WorldCard` statt. Welten die nach dem Filtern null Treffer haben, rendern `null`.

### Sprite-Overlay

Pokémon mit `nationalId !== null` sind im `PokemonRow` klickbar. Der Sprite wird ohne API-Call direkt von GitHub geladen:

```text
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{nationalId}.png
```

Die URL ist CORS-kompatibel und benötigt keine Authentifizierung.

### Tests

#### Ausführen

```bash
npm test             # alle Tests einmalig
npm run test:watch   # Watch-Modus – re-runs bei Dateiänderungen
```

Tests laufen in einer jsdom-Umgebung. Es wird kein Browser benötigt.

#### Testdateien

| Datei | Was wird getestet | Tests |
| ----- | ----------------- | ----- |
| `data.test.js` | Integrität aller Stammdaten: eindeutige IDs, gültige `worldId`, `nationalId`-Format, Join-Vollständigkeit | 11 |
| `storage.test.js` | `loadData` / `saveData` Round-Trip, Fehlerbehandlung bei korrupten localStorage-Daten | 7 |
| `filter.test.js` | `matchesPokemon` für alle Filter-IDs, Suche, Kombinationen | 9 |
| `stats.test.js` | `computeStats` – met, house, mood, Kantenfälle | 9 |
| `backup.test.js` | `importData` (valides JSON, Fehlerfälle) und `exportData` (Dateiname, Blob-Typ, Inhalt, URL-Freigabe) | 14 |

Gesamt: **54 Tests** in 5 Dateien.

#### Test-Setup

`src/test/setup.js` registriert einen in-memory localStorage-Mock, da jsdom's eigene Implementierung nicht vollständig ist:

```js
const createLocalStorageMock = () => {
  let store = {}
  return {
    getItem: (k) => store[k] ?? null,
    setItem: (k, v) => { store[k] = String(v) },
    removeItem: (k) => { delete store[k] },
    clear: () => { store = {} },
  }
}
Object.defineProperty(globalThis, 'localStorage', { value: createLocalStorageMock(), writable: true })
```

Die Konfiguration in `vite.config.js`:

```js
test: {
  environment: 'jsdom',
  globals: true,
  setupFiles: ['./src/test/setup.js'],
}
```

#### Neue Tests schreiben

- Neue Utility-Funktionen in `src/utils/` bekommen eine eigene Testdatei in `src/__tests__/`.
- Tests für `importData` nutzen echte `File`-Objekte: `new File([content], 'backup.json', { type: 'application/json' })` – kein Mock nötig, da jsdom `FileReader` unterstützt.
- Tests für `exportData` mocken `document.createElement`, `URL.createObjectURL` und `URL.revokeObjectURL`, weil kein echtes Browser-Datei-System vorhanden ist.
- Komponenten werden aktuell nicht gerendert (kein React Testing Library). Logik-Tests laufen über die Utility-Funktionen.

#### CI

Der GitHub Actions Workflow `.github/workflows/test.yml` führt `npm test` bei jedem Pull Request gegen `main` aus. Ein Merge ist erst möglich, wenn alle Tests grün sind.

### Neues Pokémon hinzufügen

1. In `src/data/pokemon.js` einen neuen Eintrag ergänzen:

   ```js
   { id: 305, name: "NeuesPokémon", worldId: "events", nationalId: null }
   ```

2. Die Pokopia-`id` muss eindeutig und stabil sein – sie wird als localStorage-Schlüssel verwendet.
3. Wenn die nationale Pokédex-Nummer bekannt ist, `nationalId` direkt setzen.

### Neue Welt hinzufügen

1. In `src/data/worlds.js` einen Eintrag in `WORLDS_META` ergänzen.
2. In `src/data/pokemon.js` die zugehörigen Pokémon mit der neuen `worldId` eintragen.
3. Die Welt erscheint automatisch in der App – keine weiteren Änderungen nötig.

### nationalId-Mapping ergänzen

In `src/data/pokemon.js` den `nationalId`-Wert von `null` auf die korrekte nationale Pokédex-Nummer setzen. Sobald ein Wert gesetzt ist, erscheint die gepunktete Unterstreichung im Namen und das Sprite-Overlay ist aktiv.

### Backup & Restore implementieren

Die Backup-Logik liegt vollständig in `src/utils/backup.js` und `src/components/SettingsOverlay.jsx`.

#### `exportData(data)`

Erzeugt einen JSON-Blob aus dem übergebenen `data`-Objekt (pretty-printed mit 2 Leerzeichen Einrückung) und löst einen Browser-Download aus:

```js
const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
const url = URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = url
a.download = `pokopia-tracker-${new Date().toISOString().slice(0, 10)}.json`
a.click()
URL.revokeObjectURL(url)
```

Die Object-URL wird direkt nach dem Klick wieder freigegeben. Es werden keine Daten an einen Server gesendet.

#### `importData(file)`

Liest eine `File`-Instanz per `FileReader` und gibt ein `Promise` zurück. Das Promise wird rejected wenn:

- die Datei kein gültiges JSON ist
- der JSON-Root kein Objekt ist (Arrays, `null`, primitive Werte werden abgelehnt)
- die Datei nicht gelesen werden kann

```js
importData(file).then(data => { /* validiertes Objekt */ }).catch(err => { /* Fehlermeldung */ })
```

#### `SettingsOverlay`-Komponente

Props:

| Prop | Typ | Beschreibung |
| ---- | --- | ------------ |
| `data` | `Object` | Aktueller App-State – wird direkt an `exportData` übergeben |
| `onImport` | `(data) => void` | Callback nach erfolgreichem Import – in `App.jsx` ist das `setData` |
| `onClose` | `() => void` | Schließt das Overlay |

Das Datei-Input-Element ist per `display: none` versteckt und wird über `useRef` programmatisch per `.click()` geöffnet. Das verhindert, dass das Browserstandardelement sichtbar ist, während das native Datei-Auswahl-Dialogfeld trotzdem ausgelöst wird.

Die Statusmeldung (`success` / `error`) wird nur nach einem Import-Versuch angezeigt und beim nächsten Öffnen nicht mehr gezeigt, da das Overlay beim Schließen ausgehängt wird.

#### Datenfluss beim Import

```text
Datei auswählen → handleFileChange → importData(file) → onImport(parsed) → setData(parsed) → useEffect → saveData(data)
```

`onImport` ist in `App.jsx` direkt `setData`. Dadurch löst das bestehende `useEffect([data])` automatisch `saveData` aus – kein extra Speichern nötig.

#### Teststrategie für Backup

Die Tests liegen in `src/__tests__/backup.test.js` und nutzen echte `File`-Objekte statt Mocks:

```js
function makeFile(content, name = 'backup.json') {
  return new File([content], name, { type: 'application/json' })
}
```

Für `exportData` werden DOM-Methoden gemockt (`document.createElement`, `URL.createObjectURL`, `URL.revokeObjectURL`), da kein echter Browser-Download ausgelöst werden kann. Die Tests prüfen, ob der Anchor geklickt wird, ob der Dateiname das aktuelle Datum enthält, ob der Blob den richtigen MIME-Typ hat und ob die Object-URL nach dem Klick freigegeben wird.
