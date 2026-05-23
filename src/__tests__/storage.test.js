import { describe, test, expect, beforeEach } from 'vitest'
import { getTodayKey, loadData, saveData, STORAGE_KEY } from '../utils/storage'

describe('getTodayKey', () => {
  test('returns a string in YYYY-MM-DD format', () => {
    expect(getTodayKey()).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  test('matches today\'s date', () => {
    const expected = new Date().toISOString().slice(0, 10)
    expect(getTodayKey()).toBe(expected)
  })
})

describe('loadData', () => {
  beforeEach(() => localStorage.clear())

  test('returns empty object when nothing is stored', () => {
    expect(loadData()).toEqual({})
  })

  test('returns empty object on invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY, 'not-valid-json')
    expect(loadData()).toEqual({})
  })

  test('returns parsed data when valid JSON is stored', () => {
    const data = { '1': { met: true, hasHouse: false } }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    expect(loadData()).toEqual(data)
  })
})

describe('saveData / loadData round-trip', () => {
  beforeEach(() => localStorage.clear())

  test('persists and restores data correctly', () => {
    const data = {
      '1': { met: true, hasHouse: true, moodDates: { '2026-01-01': true } },
      '42': { met: false },
    }
    saveData(data)
    expect(loadData()).toEqual(data)
  })

  test('overwrites previously saved data', () => {
    saveData({ '1': { met: false } })
    saveData({ '1': { met: true } })
    expect(loadData()).toEqual({ '1': { met: true } })
  })
})
