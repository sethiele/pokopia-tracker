import StatBadge from './StatBadge'

const FILTERS = [
  { id: "all", label: "Alle" },
  { id: "missing-met", label: "Noch unbekannt" },
  { id: "missing-house", label: "Ohne Haus" },
  { id: "needs-check", label: "Heute noch fragen" },
]

const HEADER_OUTER = {
  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  padding: "0 0 18px",
  position: "sticky",
  top: 0,
  zIndex: 10,
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
}

const HEADER_INNER = { maxWidth: 860, margin: "0 auto", padding: "18px 16px 0" }

const SEARCH_STYLE = {
  width: "100%",
  padding: "9px 14px",
  borderRadius: 10,
  border: "none",
  fontSize: 14,
  background: "rgba(255,255,255,0.12)",
  color: "#fff",
  outline: "none",
  marginBottom: 8,
  fontFamily: "inherit",
}

function filterButtonStyle(isActive) {
  return {
    padding: "5px 11px",
    borderRadius: 20,
    fontSize: 12,
    cursor: "pointer",
    fontFamily: "inherit",
    border: `1px solid ${isActive ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)"}`,
    background: isActive ? "rgba(255,255,255,0.2)" : "transparent",
    color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
    fontWeight: isActive ? 700 : 400,
    transition: "all 0.15s",
  }
}

export default function Header({ metCount, houseCount, moodCount, totalPokemon, search, onSearchChange, filter, onFilterChange }) {
  return (
    <div style={HEADER_OUTER}>
      <div style={HEADER_INNER}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <span style={{ fontSize: 38 }}>🎮</span>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>Pokopia Tracker</h1>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>Deine Pokémon-Übersicht für alle Welten</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <StatBadge label="Kennengelernt" value={metCount} total={totalPokemon} color="#4a9a6e" emoji="👋" />
          <StatBadge label="Mit Haus" value={houseCount} total={totalPokemon} color="#e8a045" emoji="🏠" />
          <StatBadge label="Heute gefragt" value={moodCount} total={metCount} color="#d4607a" emoji="💬" />
        </div>

        <input
          type="text"
          placeholder="🔍 Pokémon suchen…"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          style={SEARCH_STYLE}
        />

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {FILTERS.map(f => (
            <button key={f.id} onClick={() => onFilterChange(f.id)} style={filterButtonStyle(filter === f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
