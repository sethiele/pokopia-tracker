import { useEffect, useRef, useState } from 'react'
import { exportData, importData } from '../utils/backup'

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

const sectionTitleStyle = {
  fontSize: 13,
  fontWeight: 700,
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  margin: 0,
}

const descStyle = {
  fontSize: 13,
  color: '#666',
  margin: 0,
  lineHeight: 1.5,
}

const primaryBtnStyle = {
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

const secondaryBtnStyle = {
  ...primaryBtnStyle,
  background: 'transparent',
  color: '#0f3460',
  border: '2px solid #0f3460',
}

const warningStyle = {
  fontSize: 12,
  color: '#999',
  margin: 0,
  lineHeight: 1.5,
}

const dividerStyle = {
  border: 'none',
  borderTop: '1px solid #eee',
  margin: 0,
}

function StatusMessage({ status }) {
  if (!status) return null
  const isSuccess = status === 'success'
  return (
    <p style={{ fontSize: 13, fontWeight: 600, margin: 0, color: isSuccess ? '#4a9a6e' : '#d4607a' }}>
      {isSuccess ? '✓ Daten erfolgreich importiert.' : '✗ Import fehlgeschlagen. Bitte prüfe die Datei.'}
    </p>
  )
}

export default function SettingsOverlay({ data, onImport, onClose }) {
  const fileInputRef = useRef(null)
  const [importStatus, setImportStatus] = useState(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  async function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    try {
      const imported = await importData(file)
      onImport(imported)
      setImportStatus('success')
    } catch {
      setImportStatus('error')
    }
    e.target.value = ''
  }

  return (
    <div style={backdropStyle} onClick={onClose}>
      <div style={cardStyle} onClick={e => e.stopPropagation()}>
        <button style={closeBtnStyle} onClick={onClose}>×</button>

        <h2 style={{ fontSize: 18, fontWeight: 800, color: '#2c2c2c', margin: 0 }}>
          ⚙️ Einstellungen
        </h2>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Datensicherung</h3>
          <p style={descStyle}>
            Speichert alle deine aktuellen Pokémon-Daten als JSON-Datei auf deinem Gerät.
          </p>
          <button style={primaryBtnStyle} onClick={() => exportData(data)}>
            ⬇ Daten herunterladen
          </button>
        </div>

        <hr style={dividerStyle} />

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Daten wiederherstellen</h3>
          <p style={descStyle}>
            Lädt eine zuvor gesicherte JSON-Datei und stellt deine Daten wieder her.
          </p>
          <p style={warningStyle}>
            ⚠ Deine aktuellen Daten werden dabei vollständig überschrieben.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button style={secondaryBtnStyle} onClick={() => fileInputRef.current.click()}>
            ⬆ Datei auswählen
          </button>
          <StatusMessage status={importStatus} />
        </div>
      </div>
    </div>
  )
}
