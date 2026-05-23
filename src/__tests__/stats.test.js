import { describe, test, expect } from 'vitest'
import { computeStats } from '../utils/stats'
import { getTodayKey } from '../utils/storage'

const TODAY = getTodayKey()
const PAST  = '2000-01-01'

const worlds = [
  { id: 'w1', pokemon: [{ id: 1 }, { id: 2 }, { id: 3 }] },
  { id: 'w2', pokemon: [{ id: 4 }, { id: 5 }] },
]

describe('computeStats – total', () => {
  test('sums pokemon across all worlds', () => {
    expect(computeStats(worlds, {}).total).toBe(5)
  })
})

describe('computeStats – met', () => {
  test('zero when no data', () => {
    expect(computeStats(worlds, {}).met).toBe(0)
  })

  test('counts only pokemon with met: true', () => {
    const data = { '1': { met: true }, '2': { met: true }, '3': { met: false } }
    expect(computeStats(worlds, data).met).toBe(2)
  })

  test('ignores missing entries', () => {
    const data = { '1': { met: true } }
    expect(computeStats(worlds, data).met).toBe(1)
  })
})

describe('computeStats – house', () => {
  test('zero when no data', () => {
    expect(computeStats(worlds, {}).house).toBe(0)
  })

  test('counts only pokemon with hasHouse: true', () => {
    const data = { '1': { hasHouse: true }, '2': { hasHouse: false }, '4': { hasHouse: true } }
    expect(computeStats(worlds, data).house).toBe(2)
  })
})

describe('computeStats – mood', () => {
  test('zero when no data', () => {
    expect(computeStats(worlds, {}).mood).toBe(0)
  })

  test('counts only today\'s mood entries', () => {
    const data = {
      '1': { moodDates: { [TODAY]: true } },
      '2': { moodDates: { [PAST]: true } },
      '3': { moodDates: { [TODAY]: true, [PAST]: true } },
    }
    expect(computeStats(worlds, data).mood).toBe(2)
  })

  test('ignores past mood dates', () => {
    const data = { '1': { moodDates: { [PAST]: true } } }
    expect(computeStats(worlds, data).mood).toBe(0)
  })
})
