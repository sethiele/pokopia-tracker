const trackStyle = {
  width: 80,
  height: 6,
  background: "rgba(0,0,0,0.1)",
  borderRadius: 3,
  overflow: "hidden",
  flexShrink: 0,
}

export default function ProgressBar({ value, max, color }) {
  const pct = max > 0 ? (value / max) * 100 : 0
  const fillStyle = {
    height: "100%",
    borderRadius: 3,
    width: `${pct}%`,
    background: color,
    transition: "width 0.3s ease",
  }

  return (
    <div style={trackStyle}>
      <div style={fillStyle} />
    </div>
  )
}
