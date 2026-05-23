# Contributing to Pokopia Tracker

Thanks for your interest in this project! Here's how you can best get involved.

---

## Reporting Bugs

If you've found a bug, please open a [GitHub Issue](https://github.com/sethiele/pokopia-tracker/issues) and include:

- What you did
- What you expected to happen
- What actually happened instead
- Your browser and operating system

## Suggesting Improvements

Ideas and feature requests are welcome. Please check the [planned features](README.md#funktionen-in-planung) first to see if your idea is already tracked, and open an issue with a short description if it isn't.

---

## Local Development

```bash
git clone https://github.com/sethiele/pokopia-tracker.git
cd pokopia-tracker
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # verify the production build
```

---

## Testing

The project uses [Vitest](https://vitest.dev/) with a jsdom environment. All 54 tests must pass before a pull request can be merged — this is enforced automatically by the GitHub Actions test workflow.

```bash
npm test             # run all tests once
npm run test:watch   # re-run on file changes (useful during development)
```

### Test files

| File | What it covers |
| ---- | -------------- |
| `src/__tests__/data.test.js` | Data integrity: unique IDs, valid `worldId` values, `nationalId` format, join completeness |
| `src/__tests__/storage.test.js` | `loadData` / `saveData` round-trip and error handling |
| `src/__tests__/filter.test.js` | `matchesPokemon` for all filter IDs, search, and combined cases |
| `src/__tests__/stats.test.js` | `computeStats` — met, house, mood counts and edge cases |
| `src/__tests__/backup.test.js` | `importData` (valid JSON, error cases) and `exportData` (filename, Blob type, content, URL revocation) |

### What to test when adding new code

- **New utility function** → add a test file in `src/__tests__/` named after the module.
- **New data entry** (Pokémon or world) → `data.test.js` catches integrity issues automatically; no extra tests needed unless you add a new field with its own rules.
- **New filter option** → add cases to `filter.test.js`.
- **Changed backup format** → update `backup.test.js` to cover the new shape.

### How tests work

Tests run in jsdom. A custom in-memory localStorage mock is registered in `src/test/setup.js` so storage tests work reliably without a real browser.

For `importData`, tests use real `File` objects — jsdom supports `FileReader` natively:

```js
new File([JSON.stringify(data)], 'backup.json', { type: 'application/json' })
```

For `exportData`, `document.createElement`, `URL.createObjectURL`, and `URL.revokeObjectURL` are mocked via `vi.spyOn` / `vi.stubGlobal` since no real file system is available in the test environment.

---

## Submitting Changes

1. Fork the repository
2. Create a branch: `git checkout -b my-feature`
3. Make your changes and commit them (see commit style below)
4. Run `npm test` — all tests must pass
5. Verify the build: `npm run build` must complete without errors
6. Open a pull request against `main` with a short description of what and why

### Commit Style

Short, imperative messages in English:

```text
Add export feature
Fix: reset filter state after search
Update nationalId mappings for Kargbergia Pokémon
```

---

## Contributing Pokémon Data

The most common and most welcome contribution is filling in missing `nationalId` values in [`src/data/pokemon.js`](src/data/pokemon.js).

**Rules:**

- Only add a value if you are **100% certain** — leaving `null` is better than a wrong mapping
- No leading zeros (i.e. `7`, not `007`)
- Use the [national Pokédex for Brilliant Diamond / Shining Pearl](https://www.bisafans.de/spiele/editionen/strahlender-diamant-leuchtende-perle/nationaler-pokedex.php) as reference
- Always verify that the sprite at `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{nationalId}.png` actually shows the correct Pokémon

### Adding a New Pokémon

New Pokémon go into `src/data/pokemon.js` at the end of the relevant world section:

```js
{ id: 305, name: "NewPokémon", worldId: "events", nationalId: null }
```

The `id` must be unique and stable — it is used as a localStorage key and must not change after the first release.

---

## Versioning and Releases

This project uses [Git tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging) for releases. The GitHub Actions workflow reads the latest tag and writes it to `public/version.json` so the app can notify users when a new version is available.

Releases are set exclusively by the maintainer:

```bash
git tag v1.2.0
git push origin v1.2.0
```

---

## Please Don't

- Change Pokémon names — they are in-game names and intentionally differ from standard Pokémon names
- Change Pokopia-internal `id` values — they are stable localStorage keys
- Add new runtime dependencies without prior discussion in an issue
