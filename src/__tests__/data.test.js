import { describe, test, expect } from 'vitest'
import { POKEMON } from '../data/pokemon'
import { WORLDS_META } from '../data/worlds'
import { WORLDS } from '../data'

const validWorldIds = new Set(WORLDS_META.map(w => w.id))

describe('POKEMON data integrity', () => {
  test('all Pokémon have unique Pokopia IDs', () => {
    const ids = POKEMON.map(p => p.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  test('all Pokémon have a non-empty name', () => {
    const invalid = POKEMON.filter(p => !p.name || p.name.trim() === '')
    expect(invalid).toHaveLength(0)
  })

  test('all Pokémon have a valid worldId', () => {
    const invalid = POKEMON.filter(p => !validWorldIds.has(p.worldId))
    expect(invalid).toHaveLength(0)
  })

  test('nationalId is null or a positive integer without leading zeros', () => {
    const invalid = POKEMON.filter(p =>
      p.nationalId !== null && (!Number.isInteger(p.nationalId) || p.nationalId <= 0)
    )
    expect(invalid).toHaveLength(0)
  })

  test('nationalId values are unique among non-null entries', () => {
    const ids = POKEMON.filter(p => p.nationalId !== null).map(p => p.nationalId)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })
})

describe('WORLDS_META data integrity', () => {
  test('all worlds have a unique id', () => {
    const ids = WORLDS_META.map(w => w.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  test('all worlds have name, emoji, color and bg defined', () => {
    for (const world of WORLDS_META) {
      expect(world.name,  `${world.id}: missing name`).toBeTruthy()
      expect(world.emoji, `${world.id}: missing emoji`).toBeTruthy()
      expect(world.color, `${world.id}: missing color`).toMatch(/^#[0-9a-f]{6}$/i)
      expect(world.bg,    `${world.id}: missing bg`).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })
})

describe('WORLDS join', () => {
  test('contains one entry per WORLDS_META entry', () => {
    expect(WORLDS).toHaveLength(WORLDS_META.length)
  })

  test('every world has at least one Pokémon', () => {
    const empty = WORLDS.filter(w => w.pokemon.length === 0)
    expect(empty).toHaveLength(0)
  })

  test('total Pokémon count across all worlds matches POKEMON array', () => {
    const total = WORLDS.reduce((sum, w) => sum + w.pokemon.length, 0)
    expect(total).toBe(POKEMON.length)
  })

  test('each world only contains Pokémon belonging to it', () => {
    for (const world of WORLDS) {
      const wrong = world.pokemon.filter(p => p.worldId !== world.id)
      expect(wrong, `${world.id}: contains Pokémon from another world`).toHaveLength(0)
    }
  })
})
