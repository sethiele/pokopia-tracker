import { getTodayKey } from './storage'

export function computeStats(worlds, data) {
  const today = getTodayKey()
  const total = worlds.reduce((sum, w) => sum + w.pokemon.length, 0)
  const met = worlds.reduce((sum, w) =>
    sum + w.pokemon.filter(p => data[String(p.id)]?.met).length, 0)
  const house = worlds.reduce((sum, w) =>
    sum + w.pokemon.filter(p => data[String(p.id)]?.hasHouse).length, 0)
  const mood = worlds.reduce((sum, w) =>
    sum + w.pokemon.filter(p => (data[String(p.id)]?.moodDates || {})[today]).length, 0)
  return { total, met, house, mood }
}
