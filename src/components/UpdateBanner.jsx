const bannerStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 200,
  background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
  borderTop: '2px solid rgba(255,255,255,0.15)',
  padding: '12px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
  boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
}

const reloadBtnStyle = {
  background: '#4a9a6e',
  color: '#fff',
  border: 'none',
  borderRadius: 20,
  padding: '7px 18px',
  fontSize: 13,
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'inherit',
  flexShrink: 0,
}

export default function UpdateBanner() {
  return (
    <div style={bannerStyle}>
      <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>
        🎮 Eine neue Version ist verfügbar.
      </span>
      <button style={reloadBtnStyle} onClick={() => window.location.reload()}>
        Jetzt neu laden
      </button>
    </div>
  )
}
