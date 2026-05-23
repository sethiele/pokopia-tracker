const containerStyle = {
  flex: "1 1 110px",
  background: "rgba(255,255,255,0.08)",
  borderRadius: 12,
  padding: "10px 12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
}

export default function StatBadge({ label, value, total, color, emoji }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0

  return (
    <div style={{ ...containerStyle, border: `1px solid ${color}40` }}>
      <div style={{ fontSize: 18 }}>{emoji}</div>
      <div style={{ fontSize: 20, fontWeight: 800, color, lineHeight: 1 }}>
        {value}
        <span style={{ fontSize: 13, fontWeight: 400, opacity: 0.6 }}>/{total}</span>
      </div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", textAlign: "center" }}>{label}</div>
      <div style={{ fontSize: 11, fontWeight: 700, color }}>{pct}%</div>
    </div>
  )
}
