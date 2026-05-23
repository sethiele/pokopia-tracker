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

## Submitting Changes

1. Fork the repository
2. Create a branch: `git checkout -b my-feature`
3. Make your changes and commit them (see commit style below)
4. Verify the build: `npm run build` must complete without errors
5. Open a pull request against `main` with a short description of what and why

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
