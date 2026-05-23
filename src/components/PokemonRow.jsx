import CheckCircle from './CheckCircle'

const ROW_GRID = { display: "grid", gridTemplateColumns: "1fr 36px 36px 36px", alignItems: "center", padding: "4px 14px", gap: 6, borderRadius: 8, margin: "1px 6px", transition: "background 0.1s" }

function getMetTitle(met) { return met ? "Kennengelernt" : "Noch nicht kennengelernt" }
function getHouseTitle(met, hasHouse) {
  if (!met) return "Erst kennenlernen"
  return hasHouse ? "Haus vorhanden" : "Noch kein Haus"
}
function getMoodTitle(met, moodToday) {
  if (!met) return "Erst kennenlernen"
  return moodToday ? "Heute gefragt" : "Noch nicht gefragt"
}

export default function PokemonRow({ pokemon, state, onToggle, color }) {
  const rowStyle = { ...ROW_GRID, background: state.met ? color + "0d" : "transparent" }
  const nameStyle = { fontSize: 14, fontWeight: state.met ? 700 : 400, color: "#2c2c2c", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }

  return (
    <div style={rowStyle}>
      <span style={nameStyle}>{pokemon.name}</span>
      <CheckCircle
        checked={state.met}
        onToggle={() => onToggle(pokemon.id, "met")}
        color="#4a9a6e"
        emoji="👋"
        title={getMetTitle(state.met)}
      />
      <CheckCircle
        checked={state.hasHouse}
        onToggle={() => onToggle(pokemon.id, "hasHouse")}
        color="#e8a045"
        emoji="🏠"
        disabled={!state.met}
        title={getHouseTitle(state.met, state.hasHouse)}
      />
      <CheckCircle
        checked={state.moodToday}
        onToggle={() => onToggle(pokemon.id, "mood")}
        color="#d4607a"
        emoji="💬"
        disabled={!state.met}
        title={getMoodTitle(state.met, state.moodToday)}
      />
    </div>
  )
}
