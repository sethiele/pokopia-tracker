export const STORAGE_KEY = "pokopia-tracker-v1"

export function getTodayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}
