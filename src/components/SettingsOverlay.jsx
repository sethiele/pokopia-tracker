import { useEffect } from 'react'
import { exportData } from '../utils/backup'

const backdropStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.6)',
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const cardStyle = {
  background: '#fff',
  borderRadius: 20,
  padding: '28px 32px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  position: 'relative',
  width: '90%',
  maxWidth: 360,
  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
}

const closeBtnStyle = {
  position: 'absolute',
  top: 10,
  right: 14,
  background: 'none',
  border: 'none',
  fontSize: 22,
  cursor: 'pointer',
  color: '#aaa',
  lineHeight: 1,
  padding: 4,
}

const sectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}

const downloadBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 12,
  padding: '10px 20px',
  fontSize: 14,
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'inherit',
  width: '100%',
}

export default function SettingsOverlay({ data, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div style={backdropStyle} onClick={onClose}>
      <div style={cardStyle} onClick={e => e.stopPropagation()}>
        <button style={closeBtnStyle} onClick={onClose}>×</button>

        <h2 style={{ fontSize: 18, fontWeight: 800, color: '#2c2c2c', margin: 0 }}>
          ⚙️ Einstellungen
        </h2>

        <div style={sectionStyle}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>
            Datensicherung
          </h3>
          <p style={{ fontSize: 13, color: '#666', margin: 0, lineHeight: 1.5 }}>
            Speichert alle deine aktuellen Pokémon-Daten als JSON-Datei auf deinem Gerät.
          </p>
          <button style={downloadBtnStyle} onClick={() => exportData(data)}>
            ⬇ Daten herunterladen
          </button>
        </div>
      </div>
    </div>
  )
}
