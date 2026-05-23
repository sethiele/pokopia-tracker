# Pokopia Tracker

Persönlicher Tracker für das Spiel **Pokopia** (Nintendo Switch). Die App hilft dabei, den Überblick über alle Pokémon in den verschiedenen Spielwelten zu behalten.

---

## Für Anwender

### Was kann die App?

Der Pokopia Tracker verwaltet 289 Pokémon aus 7 Spielwelten. Für jedes Pokémon lassen sich drei tägliche Status-Informationen erfassen:

| Symbol | Bedeutung | Verhalten |
|--------|-----------|-----------|
| 👋 | **Kennengelernt** – das Pokémon wurde im Spiel getroffen | Einmalig setzbar, bleibt gespeichert |
| 🏠 | **Hat ein Haus** – das Pokémon hat ein eigenes Haus | Nur aktiv wenn das Pokémon kennengelernt wurde |
| 💬 | **Heute gefragt** – das Pokémon wurde heute nach seiner Stimmung gefragt | Setzt sich täglich automatisch zurück |

Die Daten werden dauerhaft im Browser gespeichert (localStorage) und bleiben auch nach dem Schließen der App erhalten. **Es werden keine Daten außerhalb deines eigenen Webbrowsers gespeichert.**

### Die 7 Welten

> [!WARNING]
> Spoiler warnung. Wer sich überraschen lassen will welche Pokemon es gibt, sollte lieber nicht weiter lesen.

| Welt | Pokémon |
|------|---------|
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

### Funktionen in Planung

- [x] **Pokémon-Sprites** einbinden (Bilder der Pokemon)
- [ ] **Export/Import** Daten Backup und Import
- [ ] **Notizfeld** pro Pokémon (Freitext)
- [ ] **Mood-History** anzeigen – wie oft wurde ein Pokémon in den letzten 7 Tagen gefragt
- [ ] **Mobile PWA** (manifest.json + Service Worker für Offline-Nutzung)
- [ ] **Welten-Reihenfolge** anpassen / eigene Sortierung

## Für Entwickler

### Technischer Stack

| Technologie | Verwendung |
|-------------|-----------|
| **React 18** | UI-Framework |
| **Vite 5** | Build-Tool und Dev-Server |
| **localStorage** | Persistente Datenspeicherung im Browser |
| **PokéAPI GitHub Sprites** | Pokémon-Sprites per nationalId (kein API-Call, direkte URL-Konstruktion) |

Es gibt kein CSS-Framework. Styles sind als JavaScript-Objekte direkt in den Komponenten definiert (Inline-Styles). Es gibt keine externe Abhängigkeit zur Laufzeit außer React.

### Projekt starten

```bash
npm install   # einmalig
npm run dev   # Dev-Server auf http://localhost:5173
npm run build # Produktions-Build nach dist/
```

### Projektstruktur

```
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
│   │   └── stats.js         # Berechnung der Header-Statistiken
│   └── components/
│       ├── Header.jsx       # Sticky Header mit Stats, Suche, Filter
│       ├── StatBadge.jsx    # Einzelne Statistik-Kachel
│       ├── WorldCard.jsx    # Aufklappbare Weltkarte mit Pokémon-Liste
│       ├── PokemonRow.jsx   # Einzelne Pokémon-Zeile mit drei Checkboxen
│       ├── CheckCircle.jsx  # Runder Toggle-Button
│       ├── ProgressBar.jsx  # Fortschrittsbalken pro Welt
│       └── PokemonOverlay.jsx # Sprite-Overlay
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
|-------|-----|-------------|
| `data` | `Object` | Nutzerdaten (gespiegelt aus/nach localStorage) |
| `openWorlds` | `Object` | Welche Welten aufgeklappt sind (`worldId → boolean`) |
| `search` | `string` | Aktueller Suchbegriff |
| `filter` | `string` | Aktiver Filter-ID |
| `spritePokemon` | `Object\|null` | Pokémon für das Sprite-Overlay (null = geschlossen) |

`toggle` und `getState` sind mit `useCallback` stabilisiert, damit sie sich nur ändern wenn `data` sich ändert. `saveData` wird per `useEffect` nach jedem `data`-Update aufgerufen.

### Filter- und Such-Logik

`src/utils/filter.js` – `matchesPokemon(pokemon, pokemonState, search, filter)`:

```
search gesetzt → Name muss den Suchbegriff enthalten (case-insensitive)
filter "missing-met"   → !state.met
filter "missing-house" → state.met && !state.hasHouse
filter "needs-check"   → state.met && !state.moodToday
```

Die Filterung findet in `WorldCard` statt. Welten die nach dem Filtern null Treffer haben, rendern `null`.

### Sprite-Overlay

Pokémon mit `nationalId !== null` sind im `PokemonRow` klickbar. Der Sprite wird ohne API-Call direkt von GitHub geladen:

```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{nationalId}.png
```

Die URL ist CORS-kompatibel und benötigt keine Authentifizierung.

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
