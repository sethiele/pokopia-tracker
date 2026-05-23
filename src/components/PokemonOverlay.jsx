import { useEffect } from 'react'

const SPRITE_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"

const backdropStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const cardStyle = {
  background: "#fff",
  borderRadius: 20,
  padding: "28px 36px 24px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  position: "relative",
  maxWidth: 280,
  width: "90%",
  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
}

const closeBtnStyle = {
  position: "absolute",
  top: 10,
  right: 14,
  background: "none",
  border: "none",
  fontSize: 22,
  cursor: "pointer",
  color: "#aaa",
  lineHeight: 1,
  padding: 4,
}

export default function PokemonOverlay({ pokemon, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <div style={backdropStyle} onClick={onClose}>
      <div style={cardStyle} onClick={e => e.stopPropagation()}>
        <button style={closeBtnStyle} onClick={onClose}>×</button>
        <img
          src={`${SPRITE_BASE}/${pokemon.nationalId}.png`}
          alt={pokemon.name}
          style={{ width: 160, height: 160, imageRendering: "pixelated" }}
        />
        <div style={{ fontSize: 18, fontWeight: 800, color: "#2c2c2c" }}>{pokemon.name}</div>
        <div style={{ fontSize: 12, color: "#bbb" }}>#{pokemon.nationalId}</div>
      </div>
    </div>
  )
}
