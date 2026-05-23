import { useState, useEffect, useCallback } from 'react'
import { WORLDS } from './data'
import { loadData, saveData, getTodayKey } from './utils/storage'
import { computeStats } from './utils/stats'
import Header from './components/Header'
import WorldCard from './components/WorldCard'
import PokemonOverlay from './components/PokemonOverlay'
import SettingsOverlay from './components/SettingsOverlay'
import UpdateBanner from './components/UpdateBanner'
import { useVersionCheck } from './hooks/useVersionCheck'

const initialOpenWorlds = WORLDS.reduce((acc, w) => ({ ...acc, [w.id]: false }), {})

export default function App() {
  const [data, setData] = useState(() => loadData())
  const [openWorlds, setOpenWorlds] = useState(initialOpenWorlds)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [spritePokemon, setSpritePokemon] = useState(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const updateAvailable = useVersionCheck()

  useEffect(() => { saveData(data) }, [data])

  const toggle = useCallback((pokemonId, field) => {
    setData(prev => {
      const key = String(pokemonId)
      if (field === "mood") {
        const today = getTodayKey()
        const current = prev[key]?.moodDates || {}
        const newDates = current[today]
          ? Object.fromEntries(Object.entries(current).filter(([d]) => d !== today))
          : { ...current, [today]: true }
        return { ...prev, [key]: { ...prev[key], moodDates: newDates } }
      }
      return { ...prev, [key]: { ...prev[key], [field]: !prev[key]?.[field] } }
    })
  }, [])

  const getState = useCallback((id) => {
    const p = data[String(id)] || {}
    const today = getTodayKey()
    return {
      met: !!p.met,
      hasHouse: !!p.hasHouse,
      moodToday: !!(p.moodDates || {})[today],
    }
  }, [data])

  const toggleWorld = useCallback((id) => {
    setOpenWorlds(prev => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const stats = computeStats(WORLDS, data)

  return (
    <div style={{ fontFamily: "'Nunito', 'Segoe UI', sans-serif", background: "#faf9f7", minHeight: "100vh" }}>
      <Header
        metCount={stats.met}
        houseCount={stats.house}
        moodCount={stats.mood}
        totalPokemon={stats.total}
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
        onSettingsOpen={() => setSettingsOpen(true)}
      />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "18px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
        {WORLDS.map(world => (
          <WorldCard
            key={world.id}
            world={world}
            isOpen={openWorlds[world.id]}
            onToggle={toggle}
            onToggleWorld={toggleWorld}
            onShowSprite={setSpritePokemon}
            search={search}
            filter={filter}
            getState={getState}
          />
        ))}
      </div>

      <div style={{ textAlign: "center", padding: "20px", fontSize: 12, color: "#bbb" }}>
        Daten werden lokal im Browser gespeichert · {stats.total} Pokémon in {WORLDS.length} Welten · <a href="https://github.com/sethiele/pokopia-tracker" target="_blank">Zur Anleitung/Code</a>
      </div>

      {spritePokemon && (
        <PokemonOverlay pokemon={spritePokemon} onClose={() => setSpritePokemon(null)} />
      )}
      {settingsOpen && (
        <SettingsOverlay data={data} onClose={() => setSettingsOpen(false)} />
      )}
      {updateAvailable && <UpdateBanner />}
    </div>
  )
}
