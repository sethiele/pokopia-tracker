import ProgressBar from './ProgressBar'
import PokemonRow from './PokemonRow'
import { matchesPokemon } from '../utils/filter'

const COLUMN_HEADER_STYLE = {
  display: "grid",
  gridTemplateColumns: "1fr 36px 36px 36px",
  padding: "4px 14px 6px",
  gap: 6,
  borderBottom: "1px solid rgba(0,0,0,0.06)",
  marginBottom: 4,
}

const LABEL_STYLE = { fontSize: 11, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.5px" }
const ICON_STYLE = { fontSize: 13, textAlign: "center" }

function sortedPokemon(world) {
  return [...world.pokemon].sort((a, b) => a.name.localeCompare(b.name, "de"))
}

function getDisplayList(sorted, isFiltering, getState, search, filter) {
  if (!isFiltering) return sorted
  return sorted.filter(p => matchesPokemon(p, getState(p.id), search, filter))
}

export default function WorldCard({ world, isOpen, onToggle, onToggleWorld, search, filter, getState }) {
  const isFiltering = Boolean(search || filter !== "all")
  const sorted = sortedPokemon(world)
  const displayList = getDisplayList(sorted, isFiltering, getState, search, filter)

  if (isFiltering && displayList.length === 0) return null

  const worldMet = world.pokemon.filter(p => getState(p.id).met).length

  const cardStyle = {
    borderRadius: 16,
    border: `1px solid ${world.color}40`,
    background: world.bg,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  }

  const headerButtonStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "13px 16px",
    cursor: "pointer",
    border: "none",
    textAlign: "left",
    fontFamily: "inherit",
    gap: 12,
    background: world.color + "18",
    borderBottom: isOpen ? `2px solid ${world.color}30` : "none",
  }

  const chevronStyle = {
    fontSize: 20,
    color: world.color,
    transition: "transform 0.2s",
    display: "inline-block",
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
  }

  return (
    <div style={cardStyle}>
      <button onClick={() => onToggleWorld(world.id)} style={headerButtonStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
          <span style={{ fontSize: 26 }}>{world.emoji}</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: world.color }}>{world.name}</div>
            <div style={{ fontSize: 12, color: "#888", marginTop: 1 }}>{worldMet}/{world.pokemon.length} kennengelernt</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <ProgressBar value={worldMet} max={world.pokemon.length} color={world.color} />
          <span style={chevronStyle}>▾</span>
        </div>
      </button>

      {isOpen && (
        <div style={{ padding: "6px 0 10px" }}>
          <div style={COLUMN_HEADER_STYLE}>
            <span style={LABEL_STYLE}>Pokémon</span>
            <span style={ICON_STYLE} title="Kennengelernt">👋</span>
            <span style={ICON_STYLE} title="Hat ein Haus">🏠</span>
            <span style={ICON_STYLE} title="Heute gefragt">💬</span>
          </div>
          {displayList.map(pokemon => (
            <PokemonRow
              key={pokemon.id}
              pokemon={pokemon}
              state={getState(pokemon.id)}
              onToggle={onToggle}
              color={world.color}
            />
          ))}
        </div>
      )}
    </div>
  )
}
