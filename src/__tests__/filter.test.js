import { describe, test, expect } from 'vitest'
import { matchesPokemon } from '../utils/filter'

const pokemon = { id: 1, name: 'Bisasam', worldId: 'welkwuestia', nationalId: 1 }

const none  = { met: false, hasHouse: false, moodToday: false }
const met   = { met: true,  hasHouse: false, moodToday: false }
const house = { met: true,  hasHouse: true,  moodToday: false }
const asked = { met: true,  hasHouse: false, moodToday: true  }
const full  = { met: true,  hasHouse: true,  moodToday: true  }

describe('filter: all', () => {
  test('returns true regardless of state', () => {
    expect(matchesPokemon(pokemon, none, '', 'all')).toBe(true)
    expect(matchesPokemon(pokemon, full, '', 'all')).toBe(true)
  })
})

describe('filter: search', () => {
  test('matches substring case-insensitively', () => {
    expect(matchesPokemon(pokemon, none, 'bisa',    'all')).toBe(true)
    expect(matchesPokemon(pokemon, none, 'BISA',    'all')).toBe(true)
    expect(matchesPokemon(pokemon, none, 'Bisasam', 'all')).toBe(true)
  })

  test('rejects non-matching search', () => {
    expect(matchesPokemon(pokemon, none, 'pikachu', 'all')).toBe(false)
  })

  test('empty search matches everything', () => {
    expect(matchesPokemon(pokemon, none, '', 'all')).toBe(true)
  })
})

describe('filter: missing-met', () => {
  test('true when not met', () => {
    expect(matchesPokemon(pokemon, none, '', 'missing-met')).toBe(true)
  })

  test('false when already met', () => {
    expect(matchesPokemon(pokemon, met,  '', 'missing-met')).toBe(false)
    expect(matchesPokemon(pokemon, full, '', 'missing-met')).toBe(false)
  })
})

describe('filter: missing-house', () => {
  test('true when met but no house', () => {
    expect(matchesPokemon(pokemon, met, '', 'missing-house')).toBe(true)
  })

  test('false when not yet met', () => {
    expect(matchesPokemon(pokemon, none, '', 'missing-house')).toBe(false)
  })

  test('false when already has house', () => {
    expect(matchesPokemon(pokemon, house, '', 'missing-house')).toBe(false)
    expect(matchesPokemon(pokemon, full,  '', 'missing-house')).toBe(false)
  })
})

describe('filter: needs-check', () => {
  test('true when met but not asked today', () => {
    expect(matchesPokemon(pokemon, met, '', 'needs-check')).toBe(true)
  })

  test('false when not yet met', () => {
    expect(matchesPokemon(pokemon, none, '', 'needs-check')).toBe(false)
  })

  test('false when already asked today', () => {
    expect(matchesPokemon(pokemon, asked, '', 'needs-check')).toBe(false)
    expect(matchesPokemon(pokemon, full,  '', 'needs-check')).toBe(false)
  })
})

describe('search + filter combined', () => {
  test('both conditions must match', () => {
    expect(matchesPokemon(pokemon, none, 'bisa',    'missing-met')).toBe(true)
    expect(matchesPokemon(pokemon, none, 'pikachu', 'missing-met')).toBe(false)
    expect(matchesPokemon(pokemon, met,  'bisa',    'missing-met')).toBe(false)
  })
})
