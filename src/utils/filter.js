export function matchesPokemon(pokemon, pokemonState, search, filter) {
  if (search && !pokemon.name.toLowerCase().includes(search.toLowerCase())) return false
  if (filter === "missing-met") return !pokemonState.met
  if (filter === "missing-house") return pokemonState.met && !pokemonState.hasHouse
  if (filter === "needs-check") return pokemonState.met && !pokemonState.moodToday
  return true
}
