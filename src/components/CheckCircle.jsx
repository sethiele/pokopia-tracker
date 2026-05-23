const baseStyle = {
  width: 32,
  height: 32,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.15s ease",
  flexShrink: 0,
}

export default function CheckCircle({ checked, onToggle, color, emoji, disabled, title }) {
  const style = {
    ...baseStyle,
    background: checked ? color : "transparent",
    border: `2px solid ${checked ? color : "#ddd"}`,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.3 : 1,
    transform: checked ? "scale(1.1)" : "scale(1)",
  }

  return (
    <button onClick={disabled ? undefined : onToggle} title={title} style={style}>
      {checked && <span style={{ fontSize: 14 }}>{emoji}</span>}
    </button>
  )
}
